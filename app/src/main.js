import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './services/Filters'
import message from './plugins/messagePlugin'
import { genericErrPlugin } from './plugins/genericErrPlugin'

Vue.use(filters)
Vue.use(message)
Vue.use(genericErrPlugin)

import './sass/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
