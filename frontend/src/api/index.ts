/**
 * Here we define all the REST services.
 */

// Libraries
import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'

// Models
import { AccountsPath } from './models/Account'

// Config
import Config from 'config'

// Configure App
const app = feathers()
const restClient = rest(Config.Api.root)
app.configure(restClient.fetch(window.fetch, {
  headers: {},
  mode: 'cors',
}))

// Define Services
export const AccountsApi = app.service(AccountsPath)
