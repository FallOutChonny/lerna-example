import React from 'react'
import { isMobile } from '../env'
import useViewport from './useViewport'

export default function useMobile() {
  const [isMobileDevice, setIsMobileDevice] = React.useState(isMobile())

  const { width } = useViewport()

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, []) // eslint-disable-line

  const handleResize = () => {
    if (isMobile() !== isMobileDevice) {
      setIsMobileDevice(isMobile())
    }
  }

  return isMobileDevice || width < 700
}
