//
// NOTE: Here we can implement adding, editing and deleting accounts, which is the same tests from the individual components.
//       With the same mock server library can be tested the models. For the purpose of this test it seems unnecessary.
//

// Libraries
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// Components
import AccountsPage from './'

// Mock Data
import { data } from '../../api/mock-data'

// Config
import Config from '../../config'

//Setup server
const server = setupServer(
  // Fetch all accounts endpoint.
  rest.get(Config.Api.root + '/accounts', (req, res, ctx) => {
    return res(ctx.json(data))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Should fetch accounts and render page', async () => {
  render(<AccountsPage />)

  // Check loading screen is present.
  expect(screen.getByRole('alert')).toBeInTheDocument()

  // Wait for api call to finish.
  await waitForElementToBeRemoved(screen.getByRole('alert'))

  // Check search bar is on screen
  expect(screen.getByPlaceholderText(/^Type your query and press Enter\.\.\.$/)).toBeInTheDocument()
  expect(screen.getByLabelText(/^Apply Filter$/)).toBeInTheDocument()
  expect(screen.queryByLabelText(/^Clear Filter$/)).not.toBeInTheDocument()

  // Check sidebar is on screen
  expect(screen.queryByLabelText(/^Create account$/)).toBeInTheDocument()
  expect(screen.queryByLabelText(/^Save new account$/)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/^Delete account$/)).not.toBeInTheDocument()

  // Check table headers are correct
  expect(screen.queryByText(/^ID$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Name$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Email$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Birthday$/i)).not.toBeInTheDocument()

  // Check first record on table is on screen with data fetched
  expect(screen.queryByText(/^1$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Tester One$/)).toBeInTheDocument()
  expect(screen.queryByText(/^test1@domain.com$/)).toBeInTheDocument()
  expect(screen.queryByText(/1980/)).not.toBeInTheDocument()

  // Check last record on table is on screen with data fetched
  expect(screen.queryByText(/^8$/)).toBeInTheDocument()
  expect(screen.queryByText(/^Tester Eight$/)).toBeInTheDocument()
  expect(screen.queryByText(/^test8@domain.com$/)).toBeInTheDocument()
  expect(screen.queryByText(/1995/)).not.toBeInTheDocument()
})

