/**
 * Here we declare app-wide settings and initializations.
 * It allows us to have different apps for different webpack entry points.
 *
 * Other things that could be declared are global states (redux/context), extra configurations, initial api calls, etc.
 */

// Libraries
import { BrowserRouter } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'

// Config
import Config from 'config'

// Routers
import AppRouter from 'routers/App'

// Styles
import './App.scss'

// Lock Config
Config.setConfig()

const App = () => {
  return (
    <>
      <ReactNotification />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App
