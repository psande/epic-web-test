// Libraries
import { render, screen } from '@testing-library/react'

// Components
import App from './App'

test('Check it renders without crashing', () => {
  render(<App />)
  expect(screen.getByTitle(/^Logo$/i)).toBeInTheDocument()
})
