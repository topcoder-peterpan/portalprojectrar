import React, { useCallback, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { AuthContextLogin, AuthContextLogout, AuthError, AuthProfile } from './AuthContextTypes'
import { history } from '../../store'
import authService from '../../services/authService'
import { setUserName } from 'store/actions/dashboard.actions'
import { useDispatch } from 'react-redux'

const AuthProvider: React.FC = ({ children }) => {

  let errorCount = 0

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)
  const [isAuthenticated, userHasAuthenticated] = useState<boolean>(false)
  const [profile, setProfile] = useState<AuthProfile | null>(null)
  const [error, setError] = useState<AuthError | null>(null)


  const dispatch = useDispatch()

  useEffect(() => {
    authService
      .isAuthenticated()
      .then((isLoggedin) => {
        userHasAuthenticated(isLoggedin)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsAuthenticating(false)
      })
  }, [])

  const login = useCallback<AuthContextLogin>(async (email, password) => {
    try {
      setError(null)
      setIsAuthenticating(true)
      const result = await authService.login(email, password)
      dispatch(setUserName(result.FirstName + '   ' + result.LastName))
      setProfile(result)
      userHasAuthenticated(true)
      localStorage.setItem('token', result.Token)
      localStorage.setItem('siteId', result.UserSites[0].siteID)
      setIsAuthenticating(false)
      history.push('/dashboard')
    } catch (err) {
      //setError({ message: "No user exist with your credential" });
      if (errorCount < 4) {
        setError({ message: 'Incorrect Password. Your password does not match our records. Please try again.' })
      }
      else if (errorCount === 4) {
        setError({ message: 'The password is invalid.  Another failed attempt will lock your account.' })
      }
      else {
        setError({ message: 'You have attempted to log in with an invalid password several times and your id has been locked.  Please contact SiteServices@clinicaltrialmedia.com' })
      }
      errorCount++
      setIsAuthenticating(false)
      userHasAuthenticated(false)
      throw new Error('No user exist with your credential')

    } finally {
      setIsAuthenticating(false)
      setIsAuthenticating(false)
    }
  }, [])

  const logout = useCallback<AuthContextLogout>(async () => {
    userHasAuthenticated(false)
    await authService.logout()
    history.push('/login')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        profile,
        error,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
