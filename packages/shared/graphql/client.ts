import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError, ErrorResponse } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { RestLink } from 'apollo-link-rest'
import { RetryLink } from 'apollo-link-retry'
import logger from 'apollo-link-logger'
import { message as antMessage } from 'antd'
import Cookies from 'js-cookie'
import {
  path as Rpath,
  pathOr,
  ifElse,
  toLower,
  compose,
  isNil,
  not,
} from 'ramda'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import camelCase from '../utils/camelcase'
import * as env from '../env'
import { downloadFile } from '../utils/webHelper'

const createClient = () => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [], // no types provided
      },
    },
  })

  const restLink = new RestLink({
    uri: env.apiBaseUrl,
    endpoints: {
      geocoding: env.googleMapsGeocodingApiBaseUrl,
      fake: env.fakeApiBaseUrl,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    fieldNameNormalizer: (key: string) => camelCase(key),
    responseTransformer: async (response: Response, typeName) => {
      if (!response) {
        return response
      }

      if (!response.headers) {
        return response
      }

      const contentType = response.headers.get('content-type')

      const isBlob = contentType && contentType.includes('sheet')

      if (isBlob) {
        const blob = await response.blob()

        downloadFile({ blob, filename: typeName })

        return blob
      }

      try {
        const data = await response.json()
        return data
      } catch (error) {
        console.error(error)
        return {}
      }
    },
    bodySerializers: {
      form: (data: any, headers: Headers) => {
        const formData = new FormData()
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key])
          }
        }

        headers.delete('Content-Type')

        return { body: formData, headers }
      },
    },
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from cookies if it exists
    // return the headers to the context so httpLink can read them
    const authHeaders = compose(
      ifElse(
        (name: string) => name.includes('login'),
        () => ({}),
        ifElse(
          () => env.appBaseName.includes('/sso'),
          () => ({
            Authorization: `Bearer ${Cookies.get('sso-token')}`,
          }),
          () => ({
            authorization: Cookies.get('token'),
            'X-Auth-Nonce': Cookies.get('x-auth-nonce'),
            'X-Auth-Token': Cookies.get('x-auth-token'),
          }),
        ),
      ),
      toLower,
      pathOr('', ['operationName']),
    )(_)

    return {
      headers: {
        ...headers,
        ...authHeaders,
      },
    }
  })

  const retryLink = new RetryLink({
    attempts: (count, operation, error) => {
      console.log(operation)
      console.log(error)
      // return !!error && operation.operationName != 'specialCase';
      return false
    },
    delay: (count, operation, error) => {
      return count * 1000 * Math.random()
    },
  })

  const errorLink = onError(
    ({ graphQLErrors, networkError }: ErrorResponse) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.warn(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      if (networkError) {
        console.warn(`[Network error]: ${networkError}`)
      }
    },
  )

  return new ApolloClient({
    link: ApolloLink.from([
      ...(env.isEnvDev ? [logger] : []),
      authLink,
      errorLink,
      restLink,
    ]),
    cache: new InMemoryCache({ fragmentMatcher }),
    connectToDevTools: env.isEnvDev,
  })
}

export default createClient
