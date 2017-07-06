import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SOCKET_BACKEND_STATE
} from '../mutation-types'

import socket from '../../common/socket'
import hub from '../../common/EventHub'

export const state = {
  socketConnected: false
}

export const mutations = {
  [SOCKET_CONNECT]: state => {
    hub.emit('socket.connected')
    socket.emit('BACKEND_STATE')
    state.socketConnected = true
  },
  [SOCKET_DISCONNECT]: state => {
    hub.emit('socket.disconnected')
    state.socketConnected = false
  },
  [SOCKET_BACKEND_STATE]: (state, message) => {
    console.log('backendstate', message)
    hub.emit('backend.state', message)
    state.backendState = message
  }
}
