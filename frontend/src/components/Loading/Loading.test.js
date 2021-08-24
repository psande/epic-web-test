// Libraries
import { render, screen } from '@testing-library/react'

// Components
import Loading from '.'

test('Check is rendered by using aria attribute', () => {
  render(<Loading />)
  expect(screen.getByRole('alert')).toBeInTheDocument()
})