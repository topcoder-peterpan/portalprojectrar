import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LoginPage from '../pages/auth/login'
import DashboardPage from '../pages/dashboard'
import Profile from '../pages/profile'
import DashboardLayout from 'layout/dashboard'
import PrivateRoute from './privateRoute'
import StudyRoute from './studyRoute'

function Routes() {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/">
          <DashboardLayout>
            <Switch>
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/study/:studyId" component={StudyRoute} />

              <Route path="/profile" component={Profile} />
              <Redirect to="/dashboard" />
            </Switch>
          </DashboardLayout>
        </PrivateRoute>
      </Switch>
    </>
  )
}

export default Routes
