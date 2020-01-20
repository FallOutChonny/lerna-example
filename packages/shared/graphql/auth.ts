import React from 'react'
import gql from 'graphql-tag'
import { path } from 'ramda'
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

export type DashboardUser = {
  description: string
  loginId: string
  nonce: string
  rolesStr: string
  status: number
  token: string
  userId: string
  // custom fields
  authToken: string
}

export type UserInput = {
  account: string
  password: string
  captcha: string
}

export type QueryResult = {
  data: UserQueryResult
}

export type UserQueryResult = {
  response: {
    code: number
    msg: string
    data: User & Partial<DashboardUser>
  }
}

export const dashboardLoginQuery = gql`
  mutation dashboardLogin($input: Input!) {
    response(input: $input)
      @rest(
        type: "DashboardUser"
        method: "POST"
        endpoint: "dashboard"
        path: "/api/v1/identity/login"
      ) {
      code
      data @type(name: "DashboardUser") {
        description
        loginId
        nonce
        rolesStr
        status
        token
        userId
      }
      message
    }
  }
`

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
  const [loading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState<UserQueryResult | null>(null)

  const [userlogin] = useMutation(loginQuery)
  const [dashboardUserLogin] = useMutation(dashboardLoginQuery)

  const login = async (values: User) => {
    setIsLoading(true)

    const [{ data: lightUser }, { data: dashboardUser }] = await Promise.all<
      QueryResult,
      QueryResult
    >([
      userlogin({ variables: { input: values } }) as any,
      dashboardUserLogin({
        variables: {
          input: { loginId: 'normaluser@taichung', password: 'normal567' },
        },
      }) as any,
    ])

    setResponse({
      response: {
        ...lightUser.response,
        data: {
          ...(path(['response', 'data'], lightUser) as User),
          nonce: path(['response', 'data', 'nonce'], dashboardUser),
          authToken: path(['response', 'data', 'token'], dashboardUser),
        },
      },
    })

    setIsLoading(false)
  }

  return {
    login,
    loading,
    data: response,
    // ...others,
  }
}

export default useLogin
