import Vue from 'vue'
import Vuex from 'vuex'
// import Soundcloud from 'soundcloud'
import moduleTracks from './tracks'

const modulePlayerDynamic = () =>
  import(/* webpackChunkName: 'player' */ './player')

// Soundcloud.initialize({
//   client_id: process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID,
// })

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tracks: moduleTracks,
  },
})

async function lazyLoadModules(dynamicModules: object) {
  // @ts-ignore
  for (const [moduleName, moduleFunction] of Object.entries(dynamicModules)) {
    // eslint-disable-next-line no-await-in-loop
    const importedModule = (await moduleFunction()).default
    store.registerModule(moduleName as any, importedModule as any)
  }
}

lazyLoadModules({ player: modulePlayerDynamic })

// <hotReloading>
// @ts-ignore
if (process.env === 'development' && module.hot !== undefined) {
  console.log('hot update')
  // @ts-ignore
  module.hot.accept(['./player', './tracks'], async () => {
    store.hotUpdate({
      modules: {
        player: (await modulePlayerDynamic()).default,
        tracks: require('./tracks').default,
      },
    })
  })
}
// </hotReloading>

export default store
