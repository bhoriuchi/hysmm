import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT
} from '../mutation-types'

import hub from '../../common/EventHub'

export const state = {
  socketConnected: false
}

export const mutations = {
  [SOCKET_CONNECT]: state => {
    hub.emit('socket.connected')
    state.socketConnected = true
  },
  [SOCKET_DISCONNECT]: state => {
    hub.emit('socket.disconnected')
    state.socketConnected = false
  }
}
