import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/fonts/clear-sans.css'
import '@/plugins/index'
import { FetchPolyfill } from '@/polyfills'
import '@/assets/style/global.styl'
const lazyGlobalStyles = () => {
  // @ts-ignore
  import(/* webpackChunkName: 'LAZY_STYLE__global' */ '@/assets/style/global.lazy.styl')
}

if (process.env.NODE_ENV === 'development') {
  localStorage.clear()
}

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.performance = true
Vue.config.ignoredElements = ['google-cast-button']
;(async () => {
  if (FetchPolyfill.needed()) {
    await FetchPolyfill.apply()
  }
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
  lazyGlobalStyles()
})()
