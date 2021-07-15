import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'

import authReducer from './auth'
import studyReducers from './study.reducers'
import dashboardReducer from './dashboard.reducers'
import patientReducers from './patient.reducers'
import stepperReducers from './stepper.reducers'

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  study: studyReducers,
  dashboard: dashboardReducer,
  patient: patientReducers,
  stepper: stepperReducers,
})

export default createRootReducer
