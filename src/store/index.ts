import Vue from 'vue'
import Vuex from 'vuex'
import trackModule from '@/store/trackModule'
import { lazyLoadModules } from '@/store/util'

const dynamicModules = {
  player: () => import(/* webpackChunkName: 'store-module-player' */ './playerModule'),
}

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tracks: trackModule,
  },
  strict: process.env.NODE_ENV !== 'production',
})

lazyLoadModules(store, dynamicModules)

// @ts-ignore
if (process.env === 'development' && module.hot !== undefined) {
  console.log('hot update')
  // @ts-ignore
  module.hot.accept(['./playerModule', './trackModule'], async () => {
    store.hotUpdate({
      modules: {
        player: (await dynamicModules.player()).default,
        tracks: require('./trackModule').default,
      },
    })
  })
}

export default store
