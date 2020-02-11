import { ApolloQueryResult } from 'apollo-client'
import {
  MutationFunctionOptions,
  ExecutionResult,
  QueryResult as LazyQueryHooksResult,
} from '@apollo/react-common'
import { QueryLazyOptions } from '@apollo/react-hooks'
import { ColumnProps } from 'antd/lib/table'
import { ValidationRule } from 'antd/lib/form'
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

export interface ColumnPropsEditable<T> extends ColumnProps<T> {
  editable?: boolean
  component?: React.ReactNode
  rules?: ValidationRule[]
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

export enum ControlPosition {
  /** Elements are positioned in the center of the bottom row. */
  BOTTOM_CENTER = 11,
  /**
   * Elements are positioned in the bottom left and flow towards the middle.
   * Elements are positioned to the right of the Google logo.
   */
  BOTTOM_LEFT = 10,
  /**
   * Elements are positioned in the bottom right and flow towards the middle.
   * Elements are positioned to the left of the copyrights.
   */
  BOTTOM_RIGHT = 12,
  /**
   * Elements are positioned on the left, above bottom-left elements, and flow
   * upwards.
   */
  LEFT_BOTTOM = 6,
  /** Elements are positioned in the center of the left side. */
  LEFT_CENTER = 4,
  /**
   * Elements are positioned on the left, below top-left elements, and flow
   * downwards.
   */
  LEFT_TOP = 5,
  /**
   * Elements are positioned on the right, above bottom-right elements, and
   * flow upwards.
   */
  RIGHT_BOTTOM = 9,
  /** Elements are positioned in the center of the right side. */
  RIGHT_CENTER = 8,
  /** Elements are positioned on the right, below top-right elements, and flow downwards. */
  RIGHT_TOP = 7,
  /** Elements are positioned in the center of the top row. */
  TOP_CENTER = 2,
  /** Elements are positioned in the top right and flow towards the middle. */
  TOP_LEFT = 1,
  /** Elements are positioned in the top right and flow towards the middle. */
  TOP_RIGHT = 3,
}

export enum OverlayType {
  /**
   * Specifies that the DrawingManager creates circles, and that the overlay
   * given in the overlaycomplete event is a circle.
   */
  CIRCLE = 'circle',
  /**
   * Specifies that the DrawingManager creates markers, and that the overlay
   * given in the overlaycomplete event is a marker.
   */
  MARKER = 'marker',
  /**
   * Specifies that the DrawingManager creates polygons, and that the
   * overlay given in the overlaycomplete event is a polygon.
   */
  POLYGON = 'polygon',
  /**
   * Specifies that the DrawingManager creates polylines, and that the
   * overlay given in the overlaycomplete event is a polyline.
   */
  POLYLINE = 'polyline',
  /**
   * Specifies that the DrawingManager creates rectangles, and that the
   * overlay given in the overlaycomplete event is a rectangle.
   */
  RECTANGLE = 'rectangle',
}

export type Mutation = [boolean, (values: unknown) => any]

export type PickerProps = Partial<PickerPropsType> & {
  initialValue?: any
  children?: React.ReactNode
  render?: (values: any[]) => any
}
