// Libraries
import React, { useEffect } from 'react'
import classNames from 'classnames'

// Models
import AccountModel from 'api/models/Account'

// Components
import Form from 'components/Form'
import Button from 'components/Button'

// Styles
import './Sidebar.scss'

// Assets
import { ReactComponent as UserPlus } from 'assets/icons/user-plus.svg'
import { ReactComponent as User } from 'assets/icons/user.svg'
import { ReactComponent as Minimize } from 'assets/icons/minimize-2.svg'

// View Types
export enum SidebarView {
  New,
  Details,
  Closed,
}

// Prop Types
type Props = {
  account?: AccountModel
  view: SidebarView
  setView: (view: SidebarView) => void
  onCreate?: (accountForm: any) => Promise<boolean>
  onEdit?: (accountForm: any) => Promise<boolean>
  onDelete?: (accountForm: any) => Promise<boolean>
}

const Sidebar = ({ account, view, setView, onCreate, onEdit, onDelete }: Props) => {

  useEffect(() => {
    if (account) {
      setView(SidebarView.Details)
    } else {
      if (view === SidebarView.Details)
        setView(SidebarView.Closed)
    }
    // eslint-disable-next-line
  }, [account])

  return (
    <div className={classNames(
      'Sidebar',
      {
        'Sidebar--editing': (view === SidebarView.Details && !!account),
        'Sidebar--new': view === SidebarView.New,
      },
    )}>
      {/*Add New User*/}
      {view === SidebarView.New && (
        <div className='Sidebar__content'>
          <Form onCreate={onCreate} />
        </div>
      )}

      {/* Edit User Details and Remove User */}
      {view === SidebarView.Details && !!account && (
        <div className='Sidebar__content'>
          <Form
            account={account}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      )}

      <div className='Sidebar__actions'>
        <Button onClick={() => { setView(SidebarView.New) }} aria-label='Create account'><UserPlus />{view === SidebarView.New && <span>Add User</span>}</Button>
        <Button onClick={() => { setView(SidebarView.Details) }} disabled={!account} aria-label='Edit account'>
          <User />{(view === SidebarView.Details && !!account) && <span>Edit User</span>}
        </Button>
        <Button onClick={() => { setView(SidebarView.Closed) }} disabled={view === SidebarView.Closed} aria-label='Collapse sidebar'><Minimize /></Button>
      </div>
    </div>
  )
}

export default Sidebar
