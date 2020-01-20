import React from 'react'

type Props = {
  /**
   * 開關 Modal 時希望處理的事情
   */
  onRequestOpen?: () => any
}

export default function useModalVisible({ onRequestOpen }: Props = {}) {
  const [visible, setVisible] = React.useState(false)

  const handleVisible: any = (evt: React.MouseEvent<HTMLElement>) => {
    setVisible(prev => !prev)

    if (onRequestOpen) {
      onRequestOpen()
    }
  }

  const handleClose = () => {
    setVisible(false)
  }

  return [visible, handleVisible, handleClose]
}
