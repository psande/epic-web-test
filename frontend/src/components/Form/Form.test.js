// Libraries
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Components
import Form from './'

// Mock Data
import { newAccount } from '../../api/mock-data'

test('Check it renders without crashing', () => {
  render(<Form />)
})
test('Should return an account with invalid date', () => {
  const onCreate = jest.fn().mockResolvedValue(false)

  render(<Form onCreate={onCreate} />)
  expect(onCreate).toHaveBeenCalledTimes(0)

  const nameInput = screen.queryByLabelText('Name', { selector: 'input' })
  const emailInput = screen.queryByLabelText('Email', { selector: 'input' })
  const birthdayInput = screen.queryByLabelText('Birthday', { selector: 'input' })
  const saveNewButton = screen.queryByLabelText(/^Save new account$/)

  // Initial values
  expect(nameInput).toHaveValue('')
  expect(emailInput).toHaveValue('')
  expect(birthdayInput).toHaveValue('')
  expect(saveNewButton).toBeInTheDocument()

  // Initial click
  userEvent.click(saveNewButton)
  expect(onCreate).toHaveBeenCalledTimes(1)
  expect(onCreate).toHaveBeenCalledWith({ ...newAccount, 'birthday': 'Invalid date' })
})
