import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/style/global.styl'
import '@/assets/fonts/clear-sans.css'
import '@/plugins/index'
// import ExternalLink from 'vue-external-link'

// Vue.component('external-link', ExternalLink)

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.performance = true
Vue.config.ignoredElements = ['google-cast-button']

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
