/**
 * Accounts page.
 *
 * The difference between a page and a regular component is that it has business logic and API calls.
 * Allows for a clear separation of concerns, improved re-usability and code splitting based on routes.
 */

// Libraries
import React, { useEffect, useState } from 'react'
import { Column } from 'react-table'

// API
import { AccountsApi } from 'api'
import AccountModel from 'api/models/Account'

// Components
import Search from 'components/Search'
import Table from 'components/Table'
import Sidebar, { SidebarView } from 'components/Sidebar'
import Loading from 'components/Loading'
import ErrorMsg from 'components/ErrorMsg'

// Notifications
import { DangerNotification, InfoNotification, SuccessNotification, WarningNotification } from 'components/Notifications'

// Styles
import './Accounts.scss'

// Types
enum FetchingState {
  Loading,
  Done,
  Error,
}

// Table Columns
const columns: Column<AccountModel>[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Birthday',
    accessor: 'birthday',
  },
]

const hidden: string[] = ['birthday']

const AccountsPage = () => {
  // Page State
  const [fetching, setFetching] = useState<FetchingState>(FetchingState.Loading)

  // Actions State
  const [view, setView] = useState<SidebarView>(SidebarView.Closed)

  // Table State
  const [accounts, setAccounts] = useState<AccountModel[]>([])
  const [account, setAccount] = useState<AccountModel>()
  const [filter, setFilter] = useState('')

  // Fetch accounts on page load.
  useEffect(() => {
    setFetching(FetchingState.Loading)
    getAccounts().then((ok) => {
      if (ok) {
        setFetching(FetchingState.Done)
      } else {
        setFetching(FetchingState.Error)
      }
    }).catch(() => {
      setFetching(FetchingState.Error)
    })
  }, [])

  // Manage what view is open in the actions bar.
  const handleViewChange = (view: SidebarView): void => {
    setView(view)
  }

  // Manage user selection in the table.
  const handleSelectAccount = (accountSelected: AccountModel): void => {
    if (accountSelected.id === account?.id && view === SidebarView.Details) {
      setAccount(undefined)
    } else {
      setAccount(accountSelected)
      setView(SidebarView.Details)
    }
  }

  // Fetch accounts.
  const getAccounts = async (): Promise<boolean> => {
    try {
      const response = await AccountsApi.find()
      setAccounts(response)
      return Promise.resolve(true)
    } catch (err) {
      return Promise.reject(false)
    }
  }

  // Create a new account.
  const createAccount = async (accountForm: AccountModel): Promise<boolean> => {
    try {
      await AccountsApi.create(accountForm)
      await getAccounts()
      SuccessNotification('Account created successfully.')
      return Promise.resolve(true)
    } catch (err) {
      WarningNotification('Account couldn\'t be created. Try again.')
      return Promise.reject(false)
    }
  }

  // Edit an existent account.
  const editAccount = async (accountForm: AccountModel): Promise<boolean> => {
    try {
      await AccountsApi.update(accountForm.id, accountForm)
      await getAccounts()
      InfoNotification('Account updated successfully.')
      return Promise.resolve(true)
    } catch (err) {
      WarningNotification('Account couldn\'t be updated. Try again.')
      return Promise.reject(false)
    }
  }

  // Delete an account.
  const deleteAccount = async (accountForm: AccountModel): Promise<boolean> => {
    try {
      await AccountsApi.remove(accountForm.id, accountForm)
      await getAccounts()
      setAccount(undefined)
      DangerNotification('Account deleted successfully.')
      return Promise.resolve(true)
    } catch (err) {
      WarningNotification('Account couldn\'t be deleted. Try again.')
      return Promise.reject(false)
    }
  }

  return (
    <div className='AccountsPage'>
      {/* Fetching States */}
      {fetching === FetchingState.Loading && <Loading />}
      {fetching === FetchingState.Error && <ErrorMsg />}

      {/* Main Content */}
      {fetching === FetchingState.Done && (
        <>
          <Search applyFilter={(text) => setFilter(text)} />
          <div className='AccountsPage__content'>
            <Table
              data={accounts}
              columns={columns}
              hidden={hidden}
              filter={filter}
              setSelected={handleSelectAccount}
              selected={account}
            />
            <Sidebar
              account={account}
              view={view}
              setView={handleViewChange}
              onCreate={createAccount}
              onEdit={editAccount}
              onDelete={deleteAccount}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default AccountsPage
