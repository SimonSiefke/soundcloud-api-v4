import Vue from 'vue'
import '@/registerServiceWorker'
import '@/assets/style/global.styl'
import '@/assets/style/simplebar.styl'
// import 'simplebar/dist/simplebar.css'
import '@/assets/fonts/clear-sans.css'
import '@/plugins/index'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.performance = true
Vue.config.ignoredElements = ['google-cast-button']

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app')
