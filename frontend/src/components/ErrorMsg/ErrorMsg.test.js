// Libraries
import { render, screen } from '@testing-library/react'

// Components
import ErrorMsg from '.'

test('Check text is present', () => {
  render(<ErrorMsg />)
  expect(screen.queryByText(/^Error while trying to access the server\.$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Please make sure the backend is running and try again\.$/)).toBeInTheDocument()
})
