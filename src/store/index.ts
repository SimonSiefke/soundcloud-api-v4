import Vue from 'vue'
import Vuex from 'vuex'
// import Soundcloud from 'soundcloud'
import moduleTracks from './tracks'

const dynamicModules = {
  player: () => import(/* webpackChunkName: 'player' */ './player'),
}

// eslint-disable-next-line no-shadow
async function lazyLoadModules(store: any, dynamicModules: object) {
  // @ts-ignore
  for (const [moduleName, moduleFunction] of Object.entries(dynamicModules)) {
    // eslint-disable-next-line no-await-in-loop
    const importedModule = (await moduleFunction()).default
    store.registerModule(moduleName as any, importedModule as any)
  }
}

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tracks: moduleTracks,
  },
})

lazyLoadModules(store, dynamicModules)

// <hotReloading>
// @ts-ignore
if (process.env === 'development' && module.hot !== undefined) {
  console.log('hot update')
  // @ts-ignore
  module.hot.accept(['./player', './tracks'], async () => {
    store.hotUpdate({
      modules: {
        player: (await dynamicModules.player()).default,
        tracks: require('./tracks').default,
      },
    })
  })
}
// </hotReloading>

export default store
