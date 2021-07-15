import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'

import App from './App'
import configureStore, { history } from './store'
import reportWebVitals from './reportWebVitals'

import './i18n'
import './index.css'

const store = configureStore()

ReactDOM.render(
  <Suspense fallback="...is loading">
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </Suspense>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
