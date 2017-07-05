import Vue from 'vue'

class EventHub {
  constructor () {
    this.hub = new Vue()
    this.registry = []
  }

  emit (event, message) {
    this.hub.$emit(event, message)
    return this
  }

  on (event, handler) {
    this.hub.$on(event, handler)
    return this
  }

  once (event, handler) {
    this.hub.$once(event, handler)
  }

  off (event, handler) {
    this.hub.$off(event, handler)
  }
}

export default new EventHub()
