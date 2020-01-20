import {
  find,
  propEq,
  forEach,
  addIndex,
  has,
  map,
  isEmpty,
  ifElse,
  identity,
  either,
  compose,
  not,
  is,
  isNil as RisNil,
  path as Rpath,
  head,
} from 'ramda'
import moment from 'moment'
import Cookies from 'js-cookie'
import { appUrl, isMobile, apiBaseUrl } from '../env'

export const shouldRedirect = () => {
  if (window.location.pathname === '/') {
    window.location.href = appUrl
    return
  }
}

export function queryString(search: string): { [key: string]: any } {
  if (!search) {
    search = window.location.search
  }

  const params = new URLSearchParams(search)

  let result: object | any = {}

  params.forEach((value: string, key: string) => (result[key] = value))

  return result
}

export function uuid() {
  let d = Date.now()
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function isUUID(uuid: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    uuid,
  )
}

export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => resolve(fileReader.result))
    fileReader.onerror = reject
    fileReader.readAsDataURL(file)
  })
}

export function selectFile({
  accept = '*',
  callback,
}: {
  accept?: string
  callback: (evt: Event) => any
}) {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('class', 'hidden')
  input.setAttribute('accept', accept)
  input.addEventListener('change', callback)
  input.click()
}

export const findValue = (value?: number | string, field = 'pid') =>
  find(propEq(field, value))

export const forEachIndexed = addIndex(forEach)
export const mapIndexed: any = addIndex(map)

export const isNil = either(isEmpty, RisNil)

export const hasValue = ifElse(isNil, identity, has('value'))

export const hasToken = ifElse(isNil, identity, has('token'))

export const hasPath = (path: Array<string | number>) =>
  compose(not, isNil, Rpath(path))

export const getPickerValue = ifElse(is(Array), head, identity)

export const toMoment = (str: moment.Moment | string | undefined) => {
  const format = 'YYYY-MM-DDTHH:mm:ssZ'

  const converter = isMobile() ? () => moment(str, format) : () => moment(str)

  if (!str) {
    return undefined
  }

  if (!converter().isValid()) {
    return undefined
  }

  if (moment.isMoment(str)) {
    return str
  }

  return converter()
}

export const momentToString = (
  date: moment.Moment | undefined | string,
  format: string = 'YYYY/MM/DD HH:mm:ss',
) => {
  return moment.isMoment(date)
    ? date.format(format)
    : is(String, date) || is(Date, date)
    ? toMoment(date)
      ? (toMoment(date) as moment.Moment).format(format)
      : ''
    : ''
}

export const momentToISOString = (date: moment.Moment | undefined | string) => {
  return moment.isMoment(date)
    ? date.toISOString()
    : is(String, date)
    ? toMoment(date)
      ? (toMoment(date) as moment.Moment).toISOString()
      : ''
    : ''
}

export const getRangeDate = (
  date: [moment.Moment, moment.Moment],
  dateFormat?: string,
) => {
  const [startDate, stopDate] = date

  return [
    startDate
      ? dateFormat
        ? startDate.format(dateFormat)
        : startDate.toISOString()
      : undefined,
    stopDate
      ? dateFormat
        ? stopDate.format(dateFormat)
        : stopDate.toISOString()
      : undefined,
  ]
}

export const toThousandSeparator = (number: number | string) => {
  if (number && (typeof number === 'number' || isNaN(number as any))) {
    return number.toLocaleString()
  }
  return number
}

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const downloadFile = ({
  blob,
  filename,
}: {
  blob: Blob
  filename?: string
}) => {
  const a = document.createElement('a')
  let objectUrl = window.URL.createObjectURL(blob)

  a.href = objectUrl
  a.download = `${moment().format('YYYYMMDDHHMMss')}_${filename}.xlsx`
  a.click()
}

export function downloadAsJson({
  json,
  filename,
}: {
  json: object
  filename: string
}) {
  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', filename + '.json')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

export function loadImage(value: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.responseType = 'blob'
    xhr.open('GET', `${apiBaseUrl}/maintain/images/${value}`)
    xhr.setRequestHeader(
      'authorization',
      Cookies.get('token') as NonNullable<string>,
    )
    xhr.send()

    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const objectURL = URL.createObjectURL(xhr.response)
        if (objectURL) {
          return resolve(objectURL)
        }
      }
    }

    xhr.onerror = error => reject(error)
  })
}
