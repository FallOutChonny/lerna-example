import React from 'react'
import { isNil } from 'ramda'
import Cookie from 'js-cookie'
import { User } from '../graphql/auth'

export type LogoutFn = (params?: { onCompleted?: () => any }) => any

export type AuthContextType = {
  logout: LogoutFn
  isAuthenticated: boolean
  user: User
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  user: {} as User,
  logout: () => ({}),
  setUser: (value: React.SetStateAction<User | null>) => ({}),
  setIsAuthenticated: (value: React.SetStateAction<boolean>) => ({}),
})

export function AuthProvider(props: any) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [user, setUser] = React.useState<User>({} as User)

  React.useEffect(() => {
    const { user, token } = Cookie.getJSON()

    setIsAuthenticated(!isNil(token) && !isNil(user))
    setUser(user)
  }, [])

  const logout = React.useCallback(({ onCompleted } = {}) => {
    Cookie.remove('token')
    Cookie.remove('user')
    setIsAuthenticated(false)

    if (onCompleted) {
      onCompleted()
    }
  }, [])

  const value = React.useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      setUser,
      logout,
      user,
    }),
    [isAuthenticated, logout, user, setUser, setIsAuthenticated],
  )

  return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export default useAuth
