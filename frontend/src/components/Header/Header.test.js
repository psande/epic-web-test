// Libraries
import { render, screen } from '@testing-library/react'

// Components
import Header from '.'

test('Check text is present', () => {
  render(<Header header={'Accounts'} />)
  expect(screen.queryByText(/^ACCOUNTS$/i)).toBeInTheDocument()
})

test('Check logo is present', () => {
  render(<Header header={'Accounts'} />)
  expect(screen.getByTitle(/^Logo$/i)).toBeInTheDocument()
})
