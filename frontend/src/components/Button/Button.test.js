// Libraries
import { render, screen } from '@testing-library/react'

// Components
import Button from '.'

test('Check button is rendered with text', () => {
  render(<Button>Testing Text</Button>)
  expect(screen.queryByText(/^Testing Text$/)).toBeInTheDocument()
})