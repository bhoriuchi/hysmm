// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import socket from './common/socket'
import { sync } from 'vuex-router-sync'
import * as VueDeepSet from 'vue-deepset'
import VueSocketIO from 'vue-socket.io'
import { EventHubPlugin } from './plugins'

Vue.config.productionTip = false

Vue.use(VueSocketIO, socket, store)
Vue.use(EventHubPlugin)
Vue.use(VueDeepSet)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
