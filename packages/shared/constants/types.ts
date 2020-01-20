import { ApolloQueryResult } from 'apollo-client'
import { Aria, Classes, Styles } from 'react-modal'
import {
  MutationFunctionOptions,
  ExecutionResult,
  QueryResult as LazyQueryHooksResult,
} from '@apollo/react-common'
import { QueryLazyOptions } from '@apollo/react-hooks'
import {
  ColumnProps,
  TableRowSelection,
  TableSize,
  TableComponents,
  TableEventListeners,
  TableLocale,
  SortOrder,
  TableCurrentDataSource,
  SorterResult,
  ExpandIconProps,
} from 'antd/lib/table'
import { PaginationConfig } from 'antd/lib/pagination'
import { SpinProps } from 'antd/lib/spin'
import { ValidationRule } from 'antd/lib/form'
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form'
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType'

export type MutationFunction = (
  options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
) => Promise<void | ExecutionResult<any>>

export type refetchFunction = (
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

export type ApolloQueryVariables = {
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

export type ModalProps = {
  visible?: boolean
  confirmLoading?: boolean
  title?: React.ReactNode | string
  closable?: boolean
  afterClose?: () => void
  centered?: boolean
  width?: string | number
  footer?: React.ReactNode
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  maskClosable?: boolean
  forceRender?: boolean
  destroyOnClose?: boolean
  style?: React.CSSProperties
  wrapClassName?: string
  maskTransitionName?: string
  transitionName?: string
  className?: string
  zIndex?: number
  bodyStyle?: React.CSSProperties
  maskStyle?: React.CSSProperties
  mask?: boolean
  keyboard?: boolean
  wrapProps?: any
  prefixCls?: string
  closeIcon?: React.ReactNode
  onCancel?: () => any
}

export type TableProps<T> = {
  prefixCls?: string
  dropdownPrefixCls?: string
  rowSelection?: TableRowSelection<T>
  pagination?: PaginationConfig | false
  size?: TableSize
  dataSource?: T[]
  components?: TableComponents
  columns?: ColumnProps<T>[]
  rowKey?: string | ((record: T, index: number) => string)
  rowClassName?: (record: T, index: number) => string
  expandedRowRender?: (
    record: T,
    index: number,
    indent: number,
    expanded: boolean,
  ) => React.ReactNode
  defaultExpandAllRows?: boolean
  defaultExpandedRowKeys?: string[] | number[]
  expandedRowKeys?: string[] | number[]
  expandIcon?: (props: ExpandIconProps<T>) => React.ReactNode
  expandIconAsCell?: boolean
  expandIconColumnIndex?: number
  expandRowByClick?: boolean
  onExpandedRowsChange?: (expandedRowKeys: string[] | number[]) => void
  onExpand?: (expanded: boolean, record: T) => void
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
    extra: TableCurrentDataSource<T>,
  ) => void
  loading?: boolean | SpinProps
  locale?: TableLocale
  indentSize?: number
  onRowClick?: (record: T, index: number, event: Event) => void
  onRow?: (record: T, index: number) => TableEventListeners
  onHeaderRow?: (columns: ColumnProps<T>[]) => TableEventListeners
  useFixedHeader?: boolean
  bordered?: boolean
  showHeader?: boolean
  footer?: (currentPageData: T[]) => React.ReactNode
  title?: (currentPageData: T[]) => React.ReactNode
  scroll?: {
    x?: boolean | number | string
    y?: boolean | number | string
    scrollToFirstRowOnChange?: boolean
  }
  childrenColumnName?: string
  bodyStyle?: React.CSSProperties
  className?: string
  style?: React.CSSProperties
  tableLayout?: React.CSSProperties['tableLayout']
  children?: React.ReactNode
  sortDirections?: SortOrder[]
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
}

export type ReactModalProps = {
  /* Boolean describing if the modal should be shown or not. Defaults to false. */
  isOpen: boolean

  /* Object indicating styles to be used for the modal, divided into overlay and content styles. */
  style?: Styles

  /* String className to be applied to the portal. Defaults to "ReactModalPortal". */
  portalClassName?: string

  /* String className to be applied to the document.body (must be a constant string). When set to null it doesn't add any class to document.body. */
  bodyOpenClassName?: string | null

  /* String className to be applied to the document.html (must be a constant string). Defaults to null. */
  htmlOpenClassName?: string | null

  /* String or object className to be applied to the modal content. */
  className?: string | Classes

  /* String or object className to be applied to the overlay. */
  overlayClassName?: string | Classes

  /* Set this to properly hide your application from assistive screenreaders and other assistive technologies while the modal is open. */
  appElement?: HTMLElement | {}

  /* Function that will be run after the modal has opened. */
  onAfterOpen?(): void

  /* Function that will be run after the modal has closed. */
  onAfterClose?(): void

  /* Function that will be run when the modal is requested to be closed, prior to actually closing. */
  onRequestClose?(event: React.MouseEvent | React.KeyboardEvent): void

  /* Number indicating the milliseconds to wait before closing the modal. Defaults to zero (no timeout). */
  closeTimeoutMS?: number

  /* Boolean indicating if the appElement should be hidden. Defaults to true. */
  ariaHideApp?: boolean

  /* Boolean indicating if the modal should be focused after render */
  shouldFocusAfterRender?: boolean

  /* Boolean indicating if the overlay should close the modal. Defaults to true. */
  shouldCloseOnOverlayClick?: boolean

  /* Boolean indicating if pressing the esc key should close the modal */
  shouldCloseOnEsc?: boolean

  /* Boolean indicating if the modal should restore focus to the element that had focus prior to its display. */
  shouldReturnFocusAfterClose?: boolean

  /* Function that will be called to get the parent element that the modal will be attached to. */
  parentSelector?(): HTMLElement

  /* Additional aria attributes. */
  aria?: Aria

  /* Additional data attributes to be applied to to the modal content in the form of "data-*" */
  data?: any

  /* String indicating the role of the modal, allowing the 'dialog' role to be applied if desired. Defaults to "dialog". */
  role?: string | null

  /* String indicating how the content container should be announced to screenreaders. */
  contentLabel?: string

  /* Function accepting the ref for the content */
  contentRef?: (instance: HTMLDivElement) => void

  /* Function accepting the ref for the overlay */
  overlayRef?: (instance: HTMLDivElement) => void

  /* String value of data-test-id attibute to be applied to to the modal content. */
  testId?: string
}

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

export type GetFieldDecorator = (
  id: string,
  options?: GetFieldDecoratorOptions,
) => (node: React.ReactNode) => React.ReactNode

export type Mutation = [boolean, (values: unknown) => any]

export type PickerProps = Partial<PickerPropsType> & {
  getFieldDecorator?: GetFieldDecorator
  initialValue?: any
  children?: React.ReactNode
  render?: (values: any[]) => any
}
