// Libraries
import { ChangeEvent, KeyboardEvent, SyntheticEvent, useState } from 'react'

// Components
import Button from 'components/Button'

// Styles
import './Search.scss'

// Assets
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
import { ReactComponent as CrossIcon } from 'assets/icons/x.svg'

// Types
type Props = {
  applyFilter: (filterTerm: string) => void
}

const Search = (props: Props) => {
  const [text, setText] = useState<string>('')

  const onChangeText = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setText(event.target.value)
  }

  const onKeyUpApply = (event: KeyboardEvent<HTMLElement>): void => {
    event.preventDefault()

    if (event.key === 'Enter') {
      props.applyFilter(text)
    }

    if (event.key === 'Escape') {
      setText('')
      props.applyFilter('')
    }
  }

  const onClickApply = (event: SyntheticEvent): void => {
    event.preventDefault()
    props.applyFilter(text)
  }

  const onKeyUpClear = (event: KeyboardEvent<HTMLElement>): void => {
    event.preventDefault()

    if (event.key === 'Enter' || event.key === 'Escape') {
      setText('')
      props.applyFilter('')
    }
  }

  const onClickClear = (event: SyntheticEvent): void => {
    event.preventDefault()
    setText('')
    props.applyFilter('')
  }

  return (
    <div className='Search'>
      <input
        type='text'
        name='filterTerm'
        placeholder='Type your query and press Enter...'
        tabIndex={0}
        value={text}
        onChange={onChangeText}
        onKeyUp={onKeyUpApply}
      />
      {!!text && <Button onClick={onClickClear} onKeyUp={onKeyUpClear} aria-label='Clear Filter'><CrossIcon /></Button>}
      <Button onClick={onClickApply} onKeyUp={onKeyUpApply} aria-label='Apply Filter'><SearchIcon /></Button>
    </div>
  )
}

export default Search
