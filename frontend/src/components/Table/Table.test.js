// Libraries
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Components
import Table from '.'

// Mock Data
import { columns, data, hidden } from '../../api/mock-data'

test('Check it renders without crashing', () => {
  const handleSelectAccount = jest.fn()
  render(<Table columns={columns} data={data} hidden={hidden} setSelected={handleSelectAccount} />)
})

test('Check it renders the right columns', () => {
  render(<Table columns={columns} data={data} hidden={hidden} />)
  expect(screen.queryByText(/^ID$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Name$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Email$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Birthday$/i)).not.toBeInTheDocument()
})

test('Check it renders the right rows', () => {
  render(<Table columns={columns} data={data} hidden={hidden} />)
  expect(screen.queryByText(/^8$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Tester Eight$/)).toBeInTheDocument()
  expect(screen.queryByText(/^test8@domain.com$/)).toBeInTheDocument()
  expect(screen.queryByText(/1986/)).not.toBeInTheDocument()
})

test('Check the pagination works', () => {
  render(<Table columns={columns} data={data} hidden={hidden} />)

  const nextButton = screen.queryByLabelText(/^Go to next page$/)
  const firstButton = screen.queryByLabelText(/^Go to first page$/)

  // Before Clicking Next
  expect(screen.queryByText(/^Tester Eight$/)).toBeInTheDocument()

  // After Clicking Next
  userEvent.click(nextButton)
  expect(screen.queryByText(/^Tester Eight$/)).not.toBeInTheDocument()
  expect(screen.queryByText(/^Tester Nine$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Tester Ten$/)).toBeInTheDocument()

  // After Clicking First
  userEvent.click(firstButton)
  expect(screen.queryByText(/^Tester Eight$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Tester Nine$/)).not.toBeInTheDocument()
  expect(screen.queryByText(/^Tester Ten$/)).not.toBeInTheDocument()
})

test('Check pagination info works', () => {
  render(<Table columns={columns} data={data} hidden={hidden} />)

  const nextButton = screen.queryByLabelText(/^Go to next page$/)
  const firstButton = screen.queryByLabelText(/^Go to first page$/)

  // Before Clicking Next
  expect(screen.queryByText(/^Page 1 of 2$/)).toBeInTheDocument()

  // After Clicking Next
  userEvent.click(nextButton)
  expect(screen.queryByText(/^Page 2 of 2$/)).toBeInTheDocument()

  // // After Clicking First
  userEvent.click(firstButton)
  expect(screen.queryByText(/^Page 1 of 2$/)).toBeInTheDocument()
})

test('Check empty table info works', () => {
  render(<Table columns={columns} data={[]} hidden={hidden} />)
  expect(screen.queryByText(/^No Records Found$/)).toBeInTheDocument()
})

test('Check select account handler', () => {
  const handleSelectAccount = jest.fn()
  render(<Table columns={columns} data={data} hidden={hidden} setSelected={handleSelectAccount} />)

  // Before clicking row 7
  expect(handleSelectAccount).toHaveBeenCalledTimes(0)
  const recordRow = screen.queryByText(/^Tester Seven$/)

  // After clicking row 7
  userEvent.click(recordRow)
  expect(handleSelectAccount).toHaveBeenCalledTimes(1)
  expect(handleSelectAccount).toHaveBeenCalledWith(data[6])
})
