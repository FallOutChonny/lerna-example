import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

export type User = {
  authenticated: boolean
  authorities: any[]
  credentials: string
  details: {
    remoteAddress: string
    sessionId: string
  }
  name: string
  principal: string
  token: string
  unitId: number
}

export const loginQuery = gql`
  mutation login($input: Input!) {
    response(input: $input)
      @rest(type: "User", method: "POST", path: "/login") {
      code
      data @type(name: "User") {
        authenticated
        authorities
        credentials
        token
        principal
        name
        details
        __typename
      }
      msg
    }
  }
`

export const useLogin = () => {
  const [login, others] = useMutation(loginQuery)

  const userLogin = (values: User) => {
    login({ variables: { input: values } })
  }

  return {
    userLogin,
    ...others,
  }
}

export default useLogin
