import React from 'react'
import { QueryLazyOptions } from '@apollo/react-hooks'
import { pathOr, keys, head, compose } from 'ramda'
import { QueryVariables } from '../constants/types'
import useFormQueries, { Params } from '../hooks/useFormQueries'

export default function useSearch<T>({
  fetchMore,
  queryData,
  totalPages,
  ...params
}: Params & {
  fetchMore: any
  totalPages: number
  queryData?: (options?: QueryLazyOptions<QueryVariables> | undefined) => void
}) {
  const [pageNum, setPageNum] = React.useState(1)

  const getQueries = useFormQueries({ ...params, pageNum })

  const handleLoadMore = () => {
    const current = pageNum + 1

    setPageNum(current)
    fetchMore({
      variables: {
        ...getQueries({ page: current }),
        // NOTE: 經測試10筆有點太多了，5筆5筆慢慢載比較恰當
        pageSize: 5,
      },
      updateQuery: (prev: T, { fetchMoreResult }: { fetchMoreResult: T }) => {
        if (!fetchMoreResult) return prev

        /* eslint-disable-next-line */
        const { results: { total = 0, ...data } = {} } = prev as any
        const field = compose(head, keys)(data) as string

        return {
          results: {
            __typename: pathOr('', ['results', '__typename'], prev),
            [field]: [
              ...pathOr([], ['results', field], prev),
              ...pathOr([], ['results', field], fetchMoreResult),
            ],
            total: pathOr(0, ['results', 'total'], fetchMoreResult),
          },
        }
      },
    })
  }

  const handleSearch = () => {
    if (queryData) {
      queryData({ variables: getQueries() })
    }
  }

  const hasMore = React.useMemo(() => pageNum < totalPages, [
    pageNum,
    totalPages,
  ])

  return {
    handleLoadMore,
    handleSearch,
    pageNum,
    getQueries,
    hasMore,
  }
}
