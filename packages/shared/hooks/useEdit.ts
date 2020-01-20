import React from 'react'
import { isNil, equals } from 'ramda'
import usePrevious from './usePrevious'

export function useEdit<T>({ item }: { item?: T | null } = {}) {
  const isCreate = React.useMemo(() => isNil(item), [item])

  let isInit = React.useRef(false)

  React.useEffect(() => {
    if (item && !isInit.current) {
      setIsEdit(false)
      isInit.current = true
    }
  }, [item])

  const [isEdit, setIsEdit] = React.useState(isCreate)

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

/**
 * 針對有明細資料的表單不要用 useEdit 改用這個，因為 item 會帶有一個 orderDetail 屬性而不會是 undefined 或 null
 * @param item 包含表單資料和明細，例如 { id: 1, code: 'YYYY', orderDetail [...] }
 */
export function useOrderEdit<T>({ item }: { item: T & { code: string } }) {
  const isCreate = React.useMemo(() => !item || (item && isNil(item.code)), [
    item,
  ])

  const [isEdit, setIsEdit] = React.useState(isCreate)

  const prev = usePrevious(item)

  React.useEffect(() => {
    if (!equals(prev, item)) {
      setIsEdit(!item || (item && isNil(item.code)))
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

export default useEdit
