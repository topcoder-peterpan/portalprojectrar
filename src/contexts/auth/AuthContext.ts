import { createContext } from 'react'
import { AuthContextState } from './AuthContextTypes'

const initialState: AuthContextState = {
  isAuthenticated: false,
  isAuthenticating: true,
  profile: null,
  error: null,
  login: () => { 
    return Promise.resolve() 
  },
  logout: () => { return Promise.resolve() }
}
export const AuthContext = createContext<AuthContextState>(initialState)
