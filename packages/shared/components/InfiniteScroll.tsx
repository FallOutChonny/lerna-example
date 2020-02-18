import React from 'react'
import InfiniteScroller from 'react-infinite-scroller'
import { length } from 'ramda'
import { BackTop, List } from 'antd'

type Props<T> = {
  title?: string | React.ReactNode
  loading?: boolean
  hasMore?: boolean
  called?: boolean
  loader?: React.ReactElement
  dataSource?: T[]
  renderItem(item: T): React.ReactNode
  onLoadMore?(): any
}

export default function InfiniteScroll<T extends { id: number }>({
  loader = <div>Loading...</div>,
  loading,
  hasMore,
  title,
  onLoadMore,
  dataSource = [],
  renderItem,
}: Props<T>) {
  const handleInfiniteOnLoad = () => {
    if (onLoadMore) {
      onLoadMore()
    }
  }

  const renderListItem = (item: T) => {
    return <List.Item key={item.id}>{renderItem(item)}</List.Item>
  }

  return (
    <>
      <BackTop key="back-top" style={{ zIndex: 1100 }} />
      {title ? title : ''}
      {length(dataSource) === 0 && loading && loader}
      {length(dataSource) > 0 && (
        <InfiniteScroller
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          threshold={150}>
          <List
            grid={{ column: 1 }}
            dataSource={dataSource}
            renderItem={renderListItem}>
            {loading && hasMore && loader}
          </List>
        </InfiniteScroller>
      )}
    </>
  )
}
