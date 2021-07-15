import React from 'react'

import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../contexts'
// import routes from 'constants/routes.json';

interface PrivateRouteProps extends RouteProps {
  componentProps?: Record<string, unknown>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  children,
  componentProps,
  ...rest
}) => {
  const auth = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticating) {
          return (
            <div>Auth Loading...</div>
          )
        }
        if (auth.isAuthenticated) {
          if (Component) {
            const customComponentProps = {
              ...componentProps,
              authProfile: auth.profile
            }
            return (
              <Component {...props} {...customComponentProps} />
            )
          }
          return children
        }
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }}
    />
  )
}

export default PrivateRoute
