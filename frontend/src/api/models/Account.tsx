/**
 * Interface/Model for a single Account.
 */

export default interface AccountModel {
  id?: string,
  name: string,
  birthday: string,
  email: string,
}

export const AccountsPath = 'accounts'

export const NewAccount = {
  id: '',
  name: '',
  birthday: '',
  email: '',
}