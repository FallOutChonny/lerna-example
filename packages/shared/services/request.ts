import React from 'react'
import Cookies from 'js-cookie'
import { merge, reduce, toPairs, keys, map, mergeAll } from 'ramda'
import { apiBaseUrl } from '../env'
import camelCase from '../utils/camelcase'
const { compose } = require('ramda')

type RequestHeader = {
  [key: string]: string
}

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
  onCompleted?(data: any): any
  onError?(error: Error): any
}

function useMeta() {
  const [loading, setIsLoading] = React.useState(false)

  const withMeta = (handler: any) => {
    setIsLoading(true)

    return handler().then((response: any) => {
      setIsLoading(false)

      return response
    })
  }

  return [loading, withMeta] as [boolean, (handler: any) => any]
}

export function useRestApi<T = any>() {
  const [loading, withMeta] = useMeta()

  return [
    loading,
    (url: string, options: RequestInit) =>
      withMeta(async () => await request(url, options)),
  ] as [boolean, (url: string, options: RequestInit) => Promise<T>]
}

export default function request(
  endpoint: string,
  { body, headers, onCompleted, onError, ...options }: RequestInit = {},
) {
  const fullUrl =
    endpoint.indexOf('http') === -1 ? apiBaseUrl + endpoint : endpoint

  return fetch(fullUrl, {
    ...options,
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers: compose(
      reduce(
        (
          headers: RequestHeader,
          [key, value]: [string, string | undefined],
        ) => {
          if (value) {
            headers[key] = value
          }
          return headers
        },
        {},
      ),
      toPairs,
      merge({
        Authorization: `Bearer ${Cookies.get('iaef_token')}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      }),
    )(headers),
  })
    .then((response: Response) =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        let data = compose(
          mergeAll,
          map((key: string) => ({ [camelCase(key)]: json[key] })),
          keys,
        )(json)

        if (onCompleted) {
          onCompleted(data)
        }

        return data
      }),
    )
    .catch((error: Error) => {
      if (onError) {
        onError(error)
      }

      return error
    })
}
