// Libraries
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Components
import Search from '.'

test('Check initial render is correct', () => {
  const eventHandler = jest.fn()
  render(<Search applyFilter={eventHandler} />)

  // Should exist with specific placeholder.
  expect(screen.getByPlaceholderText(/^Type your query and press Enter\.\.\.$/)).toBeInTheDocument()

  // Should have filter button.
  expect(screen.getByLabelText(/^Apply Filter$/)).toBeInTheDocument()

  // Should not have filter button.
  expect(screen.queryByLabelText(/^Clear Filter$/)).not.toBeInTheDocument()
})

test('Check callback function is called on enter key', () => {
  const eventHandler = jest.fn()
  render(<Search applyFilter={eventHandler} />)

  const inputEl = screen.getByPlaceholderText(/^Type your query and press Enter\.\.\.$/)

  // Should not be called on mount.
  expect(eventHandler).toHaveBeenCalledTimes(0)

  // Should not be called when no enter key is pressed.
  userEvent.type(inputEl, 'testing')
  expect(eventHandler).toHaveBeenCalledTimes(0)

  // Clicking the input shouldn't trigger the callback.
  userEvent.click(inputEl)
  expect(eventHandler).toHaveBeenCalledTimes(0)

  // Should be called when enter key is pressed.
  userEvent.type(inputEl, ' and enter{enter}')
  expect(eventHandler).toHaveBeenCalledTimes(1)

  // Should have been called with 'testing and enter' as parameter.
  expect(eventHandler).toHaveBeenCalledWith('testing and enter')
})

test('Check callback function is called on escape key', () => {
  const eventHandler = jest.fn()
  render(<Search applyFilter={eventHandler} />)

  const inputEl = screen.getByPlaceholderText(/^Type your query and press Enter\.\.\.$/)

  // Should not be called on mount.
  expect(eventHandler).toHaveBeenCalledTimes(0)

  // Should not be called when no escape key is pressed.
  userEvent.type(inputEl, 'testing')
  expect(eventHandler).toHaveBeenCalledTimes(0)

  // Should be called when escape key is pressed.
  userEvent.type(inputEl, ' and escape{escape}')
  expect(eventHandler).toHaveBeenCalledTimes(1)

  // Should have been called with '' as parameter.
  expect(eventHandler).toHaveBeenCalledWith('')
})

test('Check callback function is called on filter button click', () => {
  const eventHandler = jest.fn()
  render(<Search applyFilter={eventHandler} />)

  const inputEl = screen.getByPlaceholderText(/^Type your query and press Enter\.\.\.$/)
  const buttonEl = screen.getByLabelText(/^Apply Filter$/)

  // Should not be called on mount.
  expect(eventHandler).toHaveBeenCalledTimes(0)

  // Should not be called when no button is pressed.
  userEvent.type(inputEl, 'testing')
  expect(eventHandler).toHaveBeenCalledTimes(0)

  // Should be called when enter key is pressed.
  userEvent.type(inputEl, ' and click')
  userEvent.click(buttonEl)
  expect(eventHandler).toHaveBeenCalledTimes(1)

  // Should have been called with 'testing and click' as parameter.
  expect(eventHandler).toHaveBeenCalledWith('testing and click')
})

test('Check callback function is called on clear button click', () => {
  const eventHandler = jest.fn()
  render(<Search applyFilter={eventHandler} />)
  const inputEl = screen.getByPlaceholderText(/^Type your query and press Enter\.\.\.$/)

  // Should not have filter button.
  expect(screen.queryByLabelText(/^Clear Filter$/)).not.toBeInTheDocument()

  // Should not be called on mount.
  expect(eventHandler).toHaveBeenCalledTimes(0)

  // Type text event.
  userEvent.type(inputEl, 'testing')
  const buttonEl = screen.getByLabelText(/^Clear Filter$/)

  // Clear button should now be present.
  expect(buttonEl).toBeInTheDocument()

  // Should not be called when no button is pressed.
  expect(eventHandler).toHaveBeenCalledTimes(0)

  // Should be called when enter key is pressed.
  userEvent.click(buttonEl)
  expect(eventHandler).toHaveBeenCalledTimes(1)

  // Should have been called with '' as parameter.
  expect(eventHandler).toHaveBeenCalledWith('')
})