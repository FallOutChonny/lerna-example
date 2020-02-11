import { rgb } from 'polished'

export type Theme = {
  [key: string]: string
}

const theme: Theme = {
  blue: '#e5f2fe',
  danger: '#d74c4c',
  dark: '#222',
  grey: '#7f7f7f',
  info: '#105ea6',
  orange: '#ec8200',
  primary: '#5aa9ec',
  red: `${rgb(243, 76, 57)}`,
  crimson: '#ce2512',
  secondary: '#3080cb',
  warning: '#b68116',
  yellow: '#ffc247',
}

export default theme
