import React from 'react'
import { find, path, isNil } from 'ramda'

/**
 * 判斷 item 是否有值 (是否為編輯資料)，是的話回傳 data；不是的話回傳 null，這可以解決點了編輯
 * Modal 後，再點新增 Modal 時資料會殘留的問題
 * @param item 從列表選來的資料
 * @param data 根據列表選的資料，打 API 取得的明細資料
 */
function useModalItem<T>(item: any, data: any) {
  // NOTE: give null is not a good way, but we need modal back to new from edit mode
  const result = React.useMemo(() => (!isNil(item) ? data : null), [item, data])

  return result as T
}

export default function useModal<T, TDetail = T>({
  content,
  key = 'id',
  onToggle,
  ownState,
  itemDetail,
}: {
  content: T[]
  key?: string
  ownState?: [T | null, React.Dispatch<React.SetStateAction<T | null>>]
  onToggle?: (item: T) => any
  itemDetail?: TDetail | any
}) {
  const [newModalVisible, setNewModalVisible] = React.useState(false)
  const [editModalVisible, setEditModalVisible] = React.useState(false)
  const [item, setItem] = ownState || React.useState<T | null>(null)

  const modalItem = useModalItem<TDetail>(
    item,
    Array.isArray(itemDetail)
      ? { ...item, orderDetail: itemDetail }
      : itemDetail,
  )

  const findItem = React.useCallback(
    (evt: React.MouseEvent<HTMLElement>) => {
      return find(
        x =>
          `${path([key], x)}` ===
          (evt.currentTarget as HTMLElement).dataset['id'],
      )(content)
    },
    [content, key],
  )

  const handleModalToggle = (evt?: React.MouseEvent<HTMLElement>) => {
    if (!evt) {
      return
    }

    const item = findItem(evt)

    if (!item) {
      setItem(null)
    }

    if (item) {
      setItem(item as T)
    }

    if (onToggle) {
      onToggle(item as T)
    }
  }

  const handleEditModalVisible = (evt?: React.MouseEvent<HTMLElement>) => {
    setEditModalVisible(prev => !prev)
    handleModalToggle(evt)
  }

  const handleNewModalVisible = () => {
    setNewModalVisible(prev => !prev)
    setItem(null)
  }

  return {
    handleNewModalVisible,
    handleEditModalVisible,
    newModalVisible,
    editModalVisible,
    handleModalToggle,
    setItem,
    item,
    itemDetail: modalItem,
  }
}
