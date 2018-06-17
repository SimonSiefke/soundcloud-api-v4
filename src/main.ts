import Vue from 'vue'
import '@/registerServiceWorker'
import '@/assets/style/global.css'
import '@/assets/fonts/clear-sans.css'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.performance = true

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
