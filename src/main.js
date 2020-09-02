import Vue from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import './plugins/toastify'
import './plugins/socket'

Vue.config.productionTip = false

Vue.prototype.$api = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
