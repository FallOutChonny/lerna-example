import React from 'react'
import { message } from 'antd'
import Cookie from 'js-cookie'
import { useLogin, User } from '../graphql/auth'
import { useAuth } from './useAuth'

type Props = {
  onCompleted?: () => any
}

export default ({ onCompleted }: Props = {}) => {
  const { loading, userLogin, data } = useLogin()

  const { setIsAuthenticated, setUser } = useAuth()

  React.useEffect(() => {
    if (data && data.response) {
      const { code, data: user, msg } = data.response

      if (code === 500) {
        message.error(msg)
      }

      if (code === 200) {
        Cookie.set('token', user.token)
        Cookie.set('user', user)

        setIsAuthenticated(true)
        setUser(user)

        if (onCompleted) {
          onCompleted()
        }
      }
    }
  }, [data]) // eslint-disable-line

  const login = React.useCallback(
    (user: User) => {
      userLogin(user)
    },
    [userLogin],
  )

  return {
    loading,
    login,
  }
}
