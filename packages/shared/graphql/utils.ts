import {
  find,
  propEq,
  pathOr,
  length,
  map,
  compose,
  filter,
  join,
  keys,
  ifElse,
  isNil,
  head,
  is,
  concat,
  path as Rpath,
} from 'ramda'
import { defaultPageSize } from '../env'
import { DataSource } from '../constants/types'
import { mapIndexed, hasPath } from '../utils/webHelper'

export type PathBuilder = ({
  args,
}: {
  args?:
    | {
        params?:
          | {
              pageSize?: number | undefined
            }
          | undefined
      }
    | undefined
}) => string

/**
 * 替換Url中的變數，例如/v1/api/user/{id} 轉換成 /v1/api/user/5
 * @param url API Url
 * @param body Query Parameters
 */
function format(url: string, body: { [key: string]: any }) {
  const regex = /(\{.+?\})/gi
  return url.replace(regex, v => {
    const replacable = v[0] === '{'

    if (!replacable) {
      return v
    }

    const propName = v.slice(1, -1)
    const replacedValue = body[propName]

    body[propName] = undefined

    return replacedValue
  })
}

export function toQueryString(
  paramsObject: {
    [key: string]: any
  } = {},
) {
  if (!paramsObject) {
    return ''
  }

  return compose(
    join('&'),
    map((key: string) =>
      Array.isArray(paramsObject[key])
        ? // convert to key=val1,val2,val3 string
          `${key}=${paramsObject[key]
            .map((val: string | number) => `${encodeURIComponent(val)}`)
            .join(',')}`
        : // convert to key=val string
          `${key}=${encodeURIComponent(paramsObject[key])}`,
    ),
    filter(
      (key: string) =>
        paramsObject[key] !== '' &&
        paramsObject[key] !== null &&
        typeof paramsObject[key] !== 'undefined',
    ),
    keys,
  )(paramsObject)
}

export function pathBuilder(
  url: string,
  { pager = true }: { pager?: boolean } = {},
): PathBuilder {
  return function({
    args: { params: { pageSize = defaultPageSize(), ...params } = {} } = {
      params: {},
    },
  }: {
    args?: { params?: { pageSize?: number } }
  }) {
    let query = pathOr(params, ['params'], params)

    return `${format(url, params)}?${toQueryString({
      ...(pager ? { pageSize } : {}),
      ...query,
    })}`
  }
}

export function skipState<T = any>({
  value,
  field,
  name,
  filter,
}: {
  /**
   * 要被查找的值
   */
  value?: string | boolean | number | Array<string | number>
  /**
   * 輸出欄位
   */
  field: string
  /**
   * 查找欄位
   */
  name: string
  /**
   * 自訂輸出的filter
   */
  filter?: (enums: T[]) => string
}) {
  const _filter: any = filter
    ? filter
    : compose(pathOr(0, [field]), find(propEq(name, value)))

  return (enums: T[]) => ({
    skip: length(enums) === 0,
    state: _filter(enums),
  })
}

export function convertData<T>({
  data,
  field,
  converter,
}: {
  data: any
  field?: string | string[]
  converter: (x: T, idx: number) => any
}) {
  let path = ifElse(
    isNil,
    () => ['results'],
    () =>
      is(Array, field)
        ? concat(['results'], field as string[])
        : ['results', field],
  )(field)

  if (!data || !hasPath(path)(data)) {
    return { content: [], totalPages: 0, total: 0 }
  }

  const dataSource: DataSource<T> = {
    content: mapIndexed((x: T, idx: number) => {
      return {
        ...x,
        ...converter(x, idx),
      }
    }, Rpath(path, data)),
    total: pathOr(0, ['results', 'total'], data),
    totalPages:
      Math.floor(pathOr(0, ['results', 'total'], data) / defaultPageSize()) + 1,
  }

  return dataSource
}

export function wrapData<T = any>(data: { [key: string]: any }) {
  const field = compose(head, keys)(data) as string

  const wrappeData = compose(
    ifElse(
      isNil,
      () => [],
      (val: T) => (Array.isArray(val) ? val : [val]),
    ),
    Rpath<any>([field]),
  )(data)

  return {
    results: {
      [field]: wrappeData as T[],
      total: length(wrappeData),
    },
  } as any
}
