import React from 'react'

type ContextType = {
  map: google.maps.Map | null
  handleMapLoad: (map: google.maps.Map) => any
}

const MapContext = React.createContext<ContextType>({
  map: null,
  handleMapLoad: (map: google.maps.Map) => ({}),
})

export function GoogleMapProvider(props: any) {
  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const handleMapLoad = React.useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance)
  }, [])

  let value = React.useMemo(
    () => ({
      map,
      handleMapLoad,
    }),
    [map, handleMapLoad],
  )

  return <MapContext.Provider value={value} {...props} />
}

export default function useGoogleMap() {
  const context = React.useContext(MapContext)
  if (!context) {
    throw new Error('useGoogleMap must be within a MapProvider')
  }

  return context
}
