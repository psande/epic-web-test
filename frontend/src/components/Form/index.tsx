// Libraries
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import moment from 'moment'

// Models
import AccountModel, { NewAccount } from 'api/models/Account'

// Components
import Button from 'components/Button'

// Styles
import './Form.scss'

// Assets
import { ReactComponent as UserPlus } from 'assets/icons/user-plus.svg'
import { ReactComponent as UserCheck } from 'assets/icons/user-check.svg'
import { ReactComponent as Delete } from 'assets/icons/delete.svg'

// Types
type Props = {
  account?: AccountModel
  onCreate?: (accountForm: any) => Promise<boolean>
  onEdit?: (accountForm: any) => Promise<boolean>
  onDelete?: (accountForm: any) => Promise<boolean>
}

const Form = ({ account, onCreate, onEdit, onDelete }: Props) => {
  const [accountForm, setAccountForm] = useState<AccountModel>(NewAccount)

  useEffect(() => {
    if (account) {
      setAccountForm({
        ...account,
        birthday: moment(account.birthday).format('yyyy-MM-DD'),
      })
    }
  }, [account])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()

    setAccountForm((current) => {
      return { ...current, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()

    if (onCreate) {
      onCreate({ ...accountForm, birthday: moment(accountForm.birthday).format() }).then((ok) => {
        if (ok) setAccountForm(NewAccount)
      })
    }

    if (onEdit) {
      onEdit({ ...accountForm, birthday: moment(accountForm.birthday).format() })
    }
  }

  const handleDelete = (event: SyntheticEvent): void => {
    event.preventDefault()
    if (onDelete) onDelete({ ...accountForm, birthday: moment(accountForm.birthday).format() })
  }

  return (
    <div className='Form'>
      <form onSubmit={handleSubmit}>
        <input
          type='hidden'
          name='id'
          id='form_id_id'
          value={accountForm.id}
        />

        <label htmlFor='form_id_name'>Name</label>
        <input
          type='text'
          name='name'
          id='form_id_name'
          autoComplete='name'
          placeholder='Full name...'
          required={true}
          value={accountForm.name}
          onChange={handleChange}
        />

        <label htmlFor='form_id_email'>Email</label>
        <input
          type='email'
          name='email'
          id='form_id_email'
          autoComplete='email'
          placeholder='Email address...'
          required={true}
          value={accountForm.email}
          onChange={handleChange}
        />

        <label htmlFor='form_id_birthday'>Birthday</label>
        <input
          type='date'
          name='birthday'
          id='form_id_birthday'
          autoComplete='bday'
          placeholder='Birthday date...'
          required={true}
          value={accountForm.birthday}
          onChange={handleChange}
          max={moment().format('yyyy-MM-DD')}
        />

        {!!onCreate && <Button type='submit' className='Form__create' aria-label='Save new account'><UserPlus /> Create</Button>}
        {!!onDelete && <Button type='button' className='Form__delete' aria-label='Delete account' onClick={handleDelete}><Delete /> Delete</Button>}
        {!!onEdit && <Button type='submit' className='Form__update' aria-label='Save edited account'><UserCheck /> Update</Button>}
      </form>
    </div>
  )
}

export default Form
