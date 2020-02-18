import { ApolloQueryResult } from 'apollo-client'
import {
  MutationFunctionOptions,
  ExecutionResult,
  QueryResult as LazyQueryHooksResult,
} from '@apollo/react-common'
import { QueryLazyOptions } from '@apollo/react-hooks'
import { ColumnType } from 'antd/lib/table'
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType'

export type MutationFunction = (
  options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
) => Promise<void | ExecutionResult<any>>

export type RefetchFunction = (
  variables?:
    | {
        pageNum: number
      }
    | undefined,
) => Promise<ApolloQueryResult<any>>

export type QueryVariables = {
  [key: string]: any
  id?: number | string
  params?: {
    [key: string]: any
    pageSize?: number
    pageNum?: number
    startDate?: number | string
    stopDate?: number | string
    startReportDate?: number | string
    endReportDate?: number | string
    no?: string
    unit?: number | string
    state?: number | string
    powerPosition?: string
    lightId?: string | number
    address?: string
  }
  pathBuilder?: (values: object) => string
}

export type ApolloHooksQueryVariables = {
  [key: string]: any
  pageSize?: number
  pageNum?: number
  startDate?: number | string
  stopDate?: number | string
  startReportDate?: number | string
  endReportDate?: number | string
  no?: string
  unit?: number | string
  state?: number | string
  powerPosition?: string
  lightId?: string
  address?: string
  storageId?: number
  device?: string
  pathBuilder?: (values: object) => string
  onCompleted?: (response: any) => any
  onError?: (error: Error) => any
}

export interface ColumnPropsEditable<T> extends ColumnType<T> {
  editable?: boolean
  component?: React.ReactNode
  rules?: { required?: boolean; pattern?: RegExp; message?: string }[]
}

export type DataSource<T> = {
  content: T[]
  total: number
  totalPages: number
}

export type LazyQueryResult<TResult> = [
  (options?: QueryLazyOptions<QueryVariables> | undefined) => void,
  LazyQueryHooksResult<TResult, QueryVariables> & { [key: string]: any },
]

export type Mutation = [boolean, (values: unknown) => any]

export type PickerProps = Partial<PickerPropsType> & {
  initialValue?: any
  children?: React.ReactNode
  render?: (values: any[]) => any
}
