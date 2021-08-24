// Libraries
import { render, screen } from '@testing-library/react'

// Components
import Footer from '.'

test('Check links are present', () => {
  render(<Footer />)
  expect(screen.queryByText(/^Real World$/i)).toBeInTheDocument()
  expect(screen.queryByText(/^Clockwise Matrix$/i)).toBeInTheDocument()
})

test('Check help icons are present', () => {
  render(<Footer />)
  expect(screen.getByLabelText(/^Help Real World$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^Help Clockwork Matrix$/i)).toBeInTheDocument()
})