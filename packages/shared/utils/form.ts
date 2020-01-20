import { ReactText } from 'react'

export const createFormItemLayout = (
  label: number = 3,
  wrapper: number = 21,
) => ({
  labelCol: {
    xs: { span: label },
    sm: { span: label },
  },
  wrapperCol: {
    xs: { span: wrapper },
    sm: { span: wrapper },
  },
})

export const thosandSeprartor = {
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string
    }
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  parser: (value: string | undefined) =>
    (value ? value.replace(/\$\s?|(,*)/g, '') : value) as ReactText,
}

export const currency = {
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string
    }
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  parser: (value: string | undefined) =>
    (value ? value.replace(/\$\s?|(,*)/g, '') : value) as ReactText,
}

export const percent = {
  // min: 0,
  max: 100,
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string
    }
    return `${value}%`
  },
  parser: (value: string | undefined) =>
    (value ? value.replace('%', '') : value) as ReactText,
}

export const rules = {
  required: { required: true, message: '此欄位必填' },
  number: {
    type: 'number',
    message: '請填寫數字',
    transform(value: any) {
      if (!value) {
        return value
      }
      return Number(value)
    },
  },
  account: {
    required: true,
    message: '欄位長度為8~128字元,特殊符號-,_',
    pattern: new RegExp(/^.{8,128}$/),
  },
  password: {
    required: true,
    message: '密碼長度為6~128字元',
    pattern: new RegExp(/^.{6,128}$/),
  },
}
