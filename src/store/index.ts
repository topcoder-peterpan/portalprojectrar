import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { isActionTypeFail } from '../utils/api'
import createRootReducer from './reducers'

export const history = createBrowserHistory()

const crashReporter = () => (next: any) => (action: any) => {
  if (isActionTypeFail(action.type)) {
    console.error(action.type)
  }
  return next(action)
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export default (preloadedState = {}) => {
  const middlewares = [thunk, routerMiddleware(history), crashReporter]
  const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
            typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
          : compose

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  return store
}
