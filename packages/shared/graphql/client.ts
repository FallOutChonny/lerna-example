import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError, ErrorResponse } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { RestLink } from 'apollo-link-rest'
import logger from 'apollo-link-logger'
import Cookies from 'js-cookie'
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
    return {
      headers: {
        ...headers,
        authorization: Cookies.get('token'),
      },
    }
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
