/**
 * Here we match paths with its pages and their corresponding layouts.
 *
 * In here we could also have layouts that are protected, based on auth and rbac,
 * and layouts that are unprotected for pages such as login.
 *
 * Some of the paths have been simplified for this test, such as
 * the Not Found page and the root path.
 */

// Libraries
import { Redirect, Switch } from 'react-router-dom'

// Configurations
import config from 'config'

// Layouts
import AppLayout from 'layouts/App'

// Pages
import Task1 from 'pages/Assignments/Task1'
import MatrixPage from 'pages/Matrix'
import Task2 from 'pages/Assignments/Task2'
import AccountsPage from 'pages/Accounts'

export default function AppRouter () {
  return (
    <Switch>
      {/* Root */}
      <Redirect from='/' to='/real-world' exact />

      {/* Task 1 */}
      <AppLayout path='/clockwise-matrix/assignment' page={Task1} header='Task 1 Assigment' />
      <AppLayout path='/clockwise-matrix' page={MatrixPage} header='Matrix' />

      {/* Task 2 */}
      <AppLayout path='/real-world/assignment' page={Task2} header='Task 2 Assignment' />
      <AppLayout path='/real-world' page={AccountsPage} header='Accounts' />

      {/* Not Found */}
      <Redirect to={config.BasePath || '/'} />
    </Switch>
  )
}
