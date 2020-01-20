import Cookies from 'js-cookie'
import { merge } from 'ramda'
import { error } from '../utils/message'
import { apiBaseUrl } from '../env'

type RequestInit = {
  body?: any
  credentials?: RequestCredentials_
  headers?: HeadersInit_
  integrity?: string
  keepalive?: boolean
  method?: string
  mode?: RequestMode_
  referrer?: string
  window?: any
  errorMsg?: boolean
}

export default (
  endpoint: string,
  { body, headers, errorMsg = true, ...options }: RequestInit = {},
) => {
  const fullUrl =
    endpoint.indexOf('http') === -1 ? apiBaseUrl + endpoint : endpoint

  return fetch(fullUrl, {
    ...options,
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers: merge(
      {
        authorization: Cookies.get('token') as NonNullable<string>,
        'X-Auth-Nonce': Cookies.get('x-auth-nonce'),
        'X-Auth-Token': Cookies.get('x-auth-token'),
      },
      headers
        ? { ...headers }
        : { 'Content-Type': 'application/json', Accept: 'application/json' },
    ) as Record<string, string>,
  })
    .then((response: Response) => {
      const contentType = response.headers.get('content-type')

      if (contentType && contentType.indexOf('application/json') > -1) {
        return response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(json)
          }

          return json
        })
      }

      return response.text()
    })
    .catch((err: Error) => {
      if (errorMsg) {
        error(err)
      }

      return err
    })
}
