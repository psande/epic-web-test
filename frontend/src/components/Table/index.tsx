//@ts-nocheck

/**
 * Table component.
 *
 * In this component I had to disable TS due to the types provided not being set correctly.
 * Version 8 of react-table is coming with types included that should fix this problem.
 * See: https://stackoverflow.com/questions/62758670/something-went-wrong-with-react-table-using-typescript
 */

// Libraries
import { useEffect, useMemo } from 'react'
import { Column, useGlobalFilter, usePagination, useTable } from 'react-table'

// Config
import Config from 'config'

// Components
import Button from 'components/Button'

// Styles
import './Table.scss'

// Assets
import { ReactComponent as ChevronsLeft } from 'assets/icons/chevrons-left.svg'
import { ReactComponent as ChevronLeft } from 'assets/icons/chevron-left.svg'
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg'
import { ReactComponent as ChevronsRight } from 'assets/icons/chevrons-right.svg'

// Prop Types
type Props = {
  data: any[],
  columns: Column<any>[],
  hidden?: string[],
  filter?: string,
  selected?: any
  setSelected?: (item: any) => void
}

// Create empty rows to fill in the table when not enough data.
const DummyRows = ({ rows, columns }) => {
  let dummyCols = []
  for (let i = 0; i < columns; i++) {
    dummyCols.push(<td key={i} />)
  }

  let dummyRows = []
  for (let r = 0; r < rows; r++) {
    dummyRows.push(<tr key={r}>{dummyCols}</tr>)
  }

  return dummyRows
}

const Table = ({ data, columns, hidden, filter, selected, setSelected }: Props) => {

  // Memoized Props
  const memoColumns: Column<any>[] = useMemo(() => columns, [columns])
  const memoData: any[] = useMemo(() => data, [data])

  // Table Hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
  } = useTable({
    columns: memoColumns,
    data: memoData,
    initialState: {
      pageSize: Config.Api.pageSize,
      hiddenColumns: hidden ?? [],
    },
  }, useGlobalFilter, usePagination)

  // Update filter with text from parent component.
  useEffect(() => {
    setGlobalFilter(filter)
    // eslint-disable-next-line
  }, [filter])

  return (
    <div className='Table'>
      <div className='Table__container'>
        <table {...getTableProps()}>
          {/* Header */}
          <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
          </thead>

          {/* Rows */}
          <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                className={selected?.id === row.original.id ? 'Table__selected' : ''}
                onClick={() => { setSelected(row.original)}}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )
                })}
              </tr>
            )
          })}

          {/* Dummy Rows */}
          {page.length < Config.Api.pageSize && (
            <DummyRows rows={Config.Api.pageSize - page.length} columns={memoColumns.length - (hidden?.length ?? 0)} />
          )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='Table__pagination'>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} aria-label='Go to first page'><ChevronsLeft /></Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage} aria-label='Go to previous page'><ChevronLeft /></Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage} aria-label='Go to next page'><ChevronRight /></Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} aria-label='Go to last page'><ChevronsRight /></Button>
      </div>

      {/* Information */}
      {!pageOptions.length && <div className='Table__footer'>No Records Found</div>}
      {!!pageOptions.length && <div className='Table__footer'>Page {state.pageIndex + 1} of {pageOptions.length}</div>}
    </div>
  )
}

export default Table
