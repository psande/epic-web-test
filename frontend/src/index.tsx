// Libraries
import React from 'react'
import ReactDOM from 'react-dom'

// Components
import App from './app/App'

const rootEl = document.getElementById('Root')
if (!rootEl) {
  document.write('<h1>App failed to start.</h1>')
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootEl,
  )
}



