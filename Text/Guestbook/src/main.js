import Vue from 'vue'
import App from './App.vue'

import 'normalize.css'
import './scss/main.scss'

import contextMenu from './modules/context-menu'

Vue.use(contextMenu)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
