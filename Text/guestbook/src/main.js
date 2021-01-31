import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'

import 'normalize.css'
import './scss/main.scss'
import '@vueform/multiselect/themes/default.css'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
