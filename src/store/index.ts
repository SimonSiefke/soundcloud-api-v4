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

// @ts-ignore
if (process.env === 'development' && module.hot !== undefined) {
  console.log('hot update')
  // @ts-ignore
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

// keep the audio state in sync with the current track inside the tracks array
// store.subscribe((mutation, state) => {
//   // if (
//   //   mutation.type.startsWith('audio/') &&
//   //   !mutation.type.startsWith('audio/SHOULD')
//   // ) {
//   //   console.log('sub')
//   // const currentTrack = store.getters['tracks/currentTrack']
//   // if (currentTrack !== null) {
//   //   store.commit('tracks/setShouldBeState', {
//   //     track:currentTrack,
//   //     newShouldBeState: 'SHOULD_BE_IDLE',
//   //   })
//   // }
//   // }
// })

export default store
