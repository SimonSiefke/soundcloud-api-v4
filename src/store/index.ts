import Vue from 'vue'
import Vuex from 'vuex'
import trackModule from '@/store/modules/trackModule'
import { lazyLoadModules } from '@/store/util'
import IdleComponent from 'vue-idle-component'

const playerModule = () =>
  import(/* webpackChunkName: 'STORE_MODULE__player' */ '@/store/modules/playerModule')

const audioModule = () =>
  import(/* webpackChunkName: 'STORE_MODULE__audio' */ '@/store/modules/audioModule')

const dynamicModules = {
  player: IdleComponent(playerModule),
  audio: IdleComponent(audioModule),
}

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tracks: trackModule,
  },
  strict: process.env.NODE_ENV !== 'production',
})

lazyLoadModules(store, dynamicModules)

if (process.env === 'development' && module.hot !== undefined) {
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
