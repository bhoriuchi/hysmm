import hub from '../common/EventHub'

export default {
  install (Vue) {
    Vue.prototype.$hub = hub
  }
}
