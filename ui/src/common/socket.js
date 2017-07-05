import io from 'socket.io-client'

const socket = io('localhost:8085', {
  path: '/api/socket.io/'
})

export default socket
