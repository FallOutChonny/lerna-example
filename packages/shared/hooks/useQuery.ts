import { DocumentNode } from 'graphql'
import {
  useQuery as useApolloQuery,
  useLazyQuery as useApolloLazyQuery,
  QueryHookOptions,
  LazyQueryHookOptions,
} from '@apollo/react-hooks'
import { QueryVariables, LazyQueryResult } from '../constants/types'
import { defaultPageSize } from '../env'

export type QueryOptions = {
  pageNum?: number
  pageSize?: number
  pathBuilder?: any
  onCompleted?: any
  [key: string]: any
}

/**
 * 當有很多query參數且會用到pathBuilder時，可以使用這個包裝好的useQuery
 * */
export function useQuery<TResult>(
  query: DocumentNode,
  {
    skip = false,
    notifyOnNetworkStatusChange = true,
    pathBuilder,
    pageNum = 1,
    pageSize = defaultPageSize(),
    fetchPolicy = 'network-only',
    ...params
  }: QueryHookOptions<any> & QueryOptions = {},
) {
  const { loading, networkStatus, ...others } = useApolloQuery<
    TResult,
    QueryVariables
  >(query, {
    notifyOnNetworkStatusChange,
    variables: {
      params: { ...params, pageNum, pageSize },
      pathBuilder,
    },
    skip,
    fetchPolicy,
  })

  return {
    loading: isLoading(loading, networkStatus),
    ...others,
  }
}

export function useLazyQuery<TResult>(
  query: DocumentNode,
  {
    notifyOnNetworkStatusChange = true,
    pathBuilder,
    pageNum = 1,
    pageSize = defaultPageSize(),
    onCompleted,
    ...params
  }: LazyQueryHookOptions<any> & QueryOptions = {},
) {
  const [
    lazyQuery,
    { loading, networkStatus, ...options },
  ] = useApolloLazyQuery<TResult, QueryVariables>(query, {
    notifyOnNetworkStatusChange,
    ...(pathBuilder
      ? {
          variables: {
            params: { ...params, pageNum, pageSize },
            pathBuilder,
          },
        }
      : {}),
    fetchPolicy: 'network-only',
    onCompleted: ({ orderDetail, ...data }: any = {}) => {
      if (onCompleted) {
        onCompleted(data)
      }
    },
  })

  return [
    lazyQuery,
    {
      loading: isLoading(loading, networkStatus),
      networkStatus,
      ...options,
    },
  ] as LazyQueryResult<TResult>
}

export const isLoading = (loading: boolean, networkStatus: NetworkStatus) =>
  loading ||
  networkStatus === NetworkStatus.refetch ||
  networkStatus === NetworkStatus.fetchMore

export enum NetworkStatus {
  /**
   * The query has never been run before and the query is now currently running. A query will still
   * have this network status even if a partial data result was returned from the cache, but a
   * query was dispatched anyway.
   */
  loading = 1,
  /**
   * If `setVariables` was called and a query was fired because of that then the network status
   * will be `setVariables` until the result of that query comes back.
   */
  setVariables = 2,
  /**
   * Indicates that `fetchMore` was called on this query and that the query created is currently in
   * flight.
   */
  fetchMore = 3,
  /**
   * Similar to the `setVariables` network status. It means that `refetch` was called on a query
   * and the refetch request is currently in flight.
   */
  refetch = 4,
  /**
   * Indicates that a polling query is currently in flight. So for example if you are polling a
   * query every 10 seconds then the network status will switch to `poll` every 10 seconds whenever
   * a poll request has been sent but not resolved.
   */
  poll = 6,
  /**
   * No request is in flight for this query, and no errors happened. Everything is OK.
   */
  ready = 7,
  /**
   * No request is in flight for this query, but one or more errors were detected.
   */
  error = 8,
}

export default useQuery
