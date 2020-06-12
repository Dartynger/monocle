import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import VueLoading from 'vue-loading-template'
import VueNumeric from 'vue-numeric'
import App from './App.vue'
import router from '../router'
import store from '../store'
import '../day'
import '../components'

browser.runtime.onMessage.addListener(async (data) => {
  switch (data.type) {
    case 'notification':
      return showNotification(data.payload)
    default:
      return null
  }
})

function showNotification(payload) {
  console.log(payload)
}

Vue.use(vClickOutside)
Vue.use(VueLoading)
Vue.use(VueNumeric)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(App)
})
