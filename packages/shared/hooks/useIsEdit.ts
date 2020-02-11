import React from 'react'
import { isNil, equals } from 'ramda'
import usePrevious from './usePrevious'

/**
 * 針對空物件的資料做處理，如果資料帶有 `id` 屬性才表示是編輯
 * @param item Object { id, ...others }
 */
export default function useIsEdit<T>({ item }: { item: T & { id: string } }) {
  const isCreate = React.useMemo(() => !item || (item && isNil(item.id)), [
    item,
  ])

  const [isEdit, setIsEdit] = React.useState(isCreate)

  const prev = usePrevious(item)

  React.useEffect(() => {
    if (!equals(prev, item)) {
      setIsEdit(!item || (item && isNil(item.id)))
    }
  }, [prev, item])

  const handleEdit = React.useCallback(
    () => setIsEdit(prevIsEdit => !prevIsEdit),
    [],
  )

  return {
    isCreate,
    isEdit,
    handleEdit,
  }
}

