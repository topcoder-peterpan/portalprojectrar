import React from 'react'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { ThemeProvider } from '@material-ui/styles'

import { AuthProvider } from './contexts'
import Routes from './routes'
import theme from './theme'

import './App.css'

function App({ history }: { history: History }) {
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </ConnectedRouter>
  )
}

export default App
