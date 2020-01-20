import { PathBuilder } from '../graphql/utils'
import { getRangeDate } from '../utils/webHelper'

export type Params = {
  pathBuilder?: PathBuilder
  getFieldsValue?: (
    fieldNames?: string[] | undefined,
  ) => {
    [field: string]: any
  }
  searchFields?: string[]
  pageNum?: number
  variables?: {
    [key: string]: any
  }
  dateRangeField?: [string, string]
  dateFormat?: string
  transform?: (data: {
    variables: { params: any; pathBuilder: PathBuilder | undefined }
    formValues: { [key: string]: any }
  }) => {
    params: any
    pathBuilder: PathBuilder | undefined
  }
}

export default function useFormQueries({
  searchFields = [],
  getFieldsValue,
  variables,
  pathBuilder,
  pageNum,
  dateRangeField = ['startDate', 'stopDate'],
  dateFormat,
  transform,
}: Params) {
  return ({ page = pageNum } = {}) => {
    if (!getFieldsValue) {
      return {
        params: {
          ...variables,
          pageNum: page,
        },
        pathBuilder,
      }
    }

    const { date = [], search, ...params } = getFieldsValue()
    const [startDate, stopDate] = getRangeDate(date, dateFormat)

    const [startDateField, stopDateField] = dateRangeField

    const values = {
      params: {
        ...variables,
        pageNum: page,
        [startDateField]: startDate,
        [stopDateField]: stopDate,
        ...(search
          ? Object.assign(
              {},
              ...searchFields.map(field => ({ [field]: search })),
            )
          : {}),
        ...params,
      },
      pathBuilder,
    }

    return transform
      ? transform({ variables: values, formValues: getFieldsValue() })
      : values
  }
}
