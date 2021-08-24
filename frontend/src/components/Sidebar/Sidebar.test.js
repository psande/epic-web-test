// Libraries
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Components
import Sidebar, { SidebarView } from '.'

// Mock Data
import { data, newAccount } from '../../api/mock-data'

test('Check it renders without crashing', () => {
  const handleViewChange = jest.fn()
  const onCreate = jest.fn()
  const onEdit = jest.fn()
  const onDelete = jest.fn()

  render(<Sidebar account={null} view={SidebarView.Closed} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)

  // Button to add account visible
  expect(screen.queryByLabelText(/^Create account$/)).toBeInTheDocument()

  // Button to save new account not visible
  expect(screen.queryByLabelText(/^Save new account$/)).not.toBeInTheDocument()

  // Button to delete account not visible
  expect(screen.queryByLabelText(/^Delete account$/)).not.toBeInTheDocument()
})

test('Check new account panel opens', () => {
  const handleViewChange = jest.fn()
  const onCreate = jest.fn()
  const onEdit = jest.fn()
  const onDelete = jest.fn()

  const renderHandler = render(<Sidebar account={null} view={SidebarView.Closed} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)
  expect(screen.queryByLabelText(/^Save new account$/)).not.toBeInTheDocument()

  const newButton = screen.queryByLabelText(/^Create account$/)
  userEvent.click(newButton)
  expect(handleViewChange).toHaveBeenCalledTimes(1)
  expect(handleViewChange).toHaveBeenCalledWith(SidebarView.New)

  renderHandler.rerender(<Sidebar account={null} view={SidebarView.New} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)
  expect(screen.queryByLabelText(/^Save new account$/)).toBeInTheDocument()
})

test('Check panel collapses with collapse button', () => {
  const handleViewChange = jest.fn()
  const onCreate = jest.fn()
  const onEdit = jest.fn()
  const onDelete = jest.fn()

  const renderHandler = render(<Sidebar account={null} view={SidebarView.New} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)
  expect(screen.queryByLabelText(/^Save new account$/)).toBeInTheDocument()

  const collapseButton = screen.queryByLabelText(/^Collapse sidebar$/)
  userEvent.click(collapseButton)
  expect(handleViewChange).toHaveBeenCalledTimes(1)
  expect(handleViewChange).toHaveBeenCalledWith(SidebarView.Closed)

  renderHandler.rerender(<Sidebar account={null} view={SidebarView.Closed} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)
  expect(screen.queryByLabelText(/^Save new account$/)).not.toBeInTheDocument()
})

test('Check edit account panel opens when account selected', () => {
  const handleViewChange = jest.fn()
  const onCreate = jest.fn()
  const onEdit = jest.fn()
  const onDelete = jest.fn()

  const renderHandler = render(<Sidebar account={null} view={SidebarView.Closed} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)
  expect(screen.queryByLabelText(/^Save edited account$/)).not.toBeInTheDocument()

  renderHandler.rerender(<Sidebar account={null} view={SidebarView.Details} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)
  expect(screen.queryByLabelText(/^Save edited account$/)).not.toBeInTheDocument()

  renderHandler.rerender(<Sidebar account={data[7]} view={SidebarView.Details} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)
  expect(screen.queryByLabelText(/^Save edited account$/)).toBeInTheDocument()
  expect(screen.queryByLabelText(/^Delete account$/)).toBeInTheDocument()
  expect(screen.queryByDisplayValue(/^Tester Eight$/)).toBeInTheDocument()
})

test('Check update and delete callbacks are working', () => {
  const handleViewChange = jest.fn()
  const onCreate = jest.fn()
  const onEdit = jest.fn()
  const onDelete = jest.fn()

  render(<Sidebar account={data[3]} view={SidebarView.Details} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)

  // Click Save Edit Button
  const saveEditButton = screen.queryByLabelText(/^Save edited account$/)
  userEvent.click(saveEditButton)
  expect(onEdit).toHaveBeenCalledTimes(1)
  expect(onEdit).toHaveBeenCalledWith({ ...data[3], birthday: '1990-11-25T00:00:00+00:00' })

  // Click Delete Button
  const deleteButton = screen.queryByLabelText(/^Delete account$/)
  userEvent.click(deleteButton)
  expect(onDelete).toHaveBeenCalledTimes(1)
  expect(onDelete).toHaveBeenCalledWith({ ...data[3], birthday: '1990-11-25T00:00:00+00:00' })
})

test('Check save callback is working', () => {
  const handleViewChange = jest.fn()
  const onCreate = jest.fn().mockResolvedValue(false)
  const onEdit = jest.fn()
  const onDelete = jest.fn()

  render(<Sidebar account={null} view={SidebarView.New} setView={handleViewChange} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />)

  // Click Save New Button with form errors just to check the return
  const saveNewButton = screen.queryByLabelText(/^Save new account$/)
  userEvent.click(saveNewButton)
  expect(onCreate).toHaveBeenCalledTimes(1)
  expect(onCreate).toHaveBeenCalledWith({ ...newAccount, 'birthday': 'Invalid date' })
})
