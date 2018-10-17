import Vue from 'vue'
import Vuex from 'vuex'
import trackModule from '@/store/modules/trackModule'
import { lazyLoadModules } from '@/store/util'

const dynamicModules = {
  player: () =>
    import(/* webpackChunkName: 'store-module-player' */ '@/store/modules/playerModule'),
  audio: () =>
    import(/* webpackChunkName: 'store-module-audio' */ '@/store/modules/audioModule'),
}

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tracks: trackModule,
  },
  strict: process.env.NODE_ENV !== 'production',
})

// console.log(store.state)

lazyLoadModules(store, dynamicModules)

if (process.env === 'development' && module.hot !== undefined) {
  console.log('hot update')
  module.hot.accept(
    [
      './modules/playerModule',
      './modules/audioModule',
      './modules/trackModule',
    ],
    async () => {
      store.hotUpdate({
        modules: {
          player: (await dynamicModules.player()).default,
          audio: (await dynamicModules.audio()).default,
          tracks: require('@/store/modules/trackModule').default,
        },
      })
    },
  )
}

export default store
