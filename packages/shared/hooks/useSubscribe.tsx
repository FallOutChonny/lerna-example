import React from 'react'
import io, { Socket } from 'socket.io-client'
import { socketUrl } from '../env'

export default function useSubscribe<T>(callback: (socket: Socket) => any) {
  const [socket, setSocket] = React.useState<typeof Socket | null>(null)

  React.useEffect(() => {
    const socket = io(socketUrl)

    setSocket(socket)

    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [])

  React.useEffect(() => {
    if (socket) {
      if (callback) {
        callback(socket)
      }

      socket.emit('subscribeToAlarms')

      socket.on('disconnection', () => {
        socket.close()
      })
    }
  }, [socket])

  return socket
}
