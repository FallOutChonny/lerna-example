export const isEmpty = (value: any) =>
  value === undefined || value === null || value === ''

export function number(value: any) {
  if (!isEmpty(value) && !Number.isInteger(Number(value))) {
    return '只允許數字'
  }
}

export function required(value: any) {
  if (isEmpty(value)) {
    return '此欄位必填'
  }
}

export function max(max: number) {
  return (value: number) => {
    if (!isEmpty(value) && value > max) {
      return `不可大於 ${max}`
    }
  }
}
