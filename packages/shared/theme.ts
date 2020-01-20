import { rgba, rgb } from 'polished'

// NOTE: 用 [key: string]: string 好像比較好？
export type Theme = {
  blue100: string
  blue200: string
  blue300: string
  blue500: string
  blue600: string
  blue700: string
  blue900: string
  blue: string
  danger: string
  dark: string
  dark100: string
  dark300: string
  dark500: string
  darkGrey: string
  grey700: string
  grey: string
  info: string
  info200: string
  info500: string
  info900: string
  lightDark: string
  lightGrey: string
  lightPink: string
  orange: string
  primary: string
  red100: string
  red500: string
  red: string
  crimson: string
  secondary: string
  warning: string
  yellow500: string
  yellow300: string
  yellow: string
  modal: {
    mask: string
    maskDarken: string
  }
}

const theme: Theme = {
  blue100: '#e7f2fd',
  blue200: `${rgba(183, 220, 255, 0.15)}`,
  blue300: `${rgba(183, 220, 255, 0.3)}`, // b7dcff
  blue500: `${rgba(183, 220, 255, 0.5)}`,
  blue600: `${rgba(183, 220, 255, 0.6)}`,
  blue700: '#b7dcff',
  blue900: '#00284d', // (0,40,77)
  blue: '#e5f2fe',
  danger: '#d74c4c',
  dark: '#222',
  dark100: `${rgba(0, 0, 0, 0.1)}`,
  dark300: `${rgba(0, 0, 0, 0.3)}`,
  dark500: `${rgba(0, 0, 0, 0.5)}`,
  darkGrey: '#4a4a4a',
  grey: '#7f7f7f',
  grey700: `${rgba(74, 74, 74, 0.7)}`,
  info: '#105ea6', // (16, 94, 166)
  info200: `${rgba(16, 94, 166, 0.2)}`,
  info500: `${rgba(16, 94, 166, 0.5)}`,
  info900: '#4098ef',
  lightDark: '#333',
  lightGrey: '#d8d8d8',
  lightPink: '#ffeaea',
  orange: '#ec8200',
  primary: '#5aa9ec',
  red100: '#ffdad6',
  red500: `${rgba(243, 76, 57, 0.5)}`,
  red: `${rgb(243, 76, 57)}`,
  crimson: '#ce2512',
  secondary: '#3080cb',
  warning: '#b68116',
  yellow500: `${rgba(255, 194, 71, 0.5)}`,
  yellow300: '#fff1b8',
  yellow: '#ffc247',
  modal: {
    mask: `${rgba(0, 44, 86, 0.7)}`,
    maskDarken: `${rgba(0, 44, 86, 0.9)}`,
  },
}

export default theme
