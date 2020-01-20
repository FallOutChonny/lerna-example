import React from 'react'
import { canUseDOM } from '../env'

export default function useViewport() {
  const [viewport, setViewport] = React.useState(
    canUseDOM
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1366, height: 768 }, // Default size for server-side rendering)
  )

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, []) // eslint-disable-line

  const handleResize = () => {
    let currentViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    if (
      viewport.width !== currentViewport.width ||
      viewport.height !== currentViewport.height
    ) {
      setViewport(currentViewport)
    }
  }

  return viewport
}
