import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { actions } from '@/store/modules/playerModule/actions'

// this module acts as an controller between the audio module and the tracks module
const playerModule: Module<null, RootState> = {
  actions,
  namespaced: true,
}

export default playerModule
