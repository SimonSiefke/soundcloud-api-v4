import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { PlayerState } from '@/store/playerModule/types'
import { actions } from '@/store/playerModule/actions'
import { mutations } from '@/store/playerModule/mutations'
import { state } from '@/store/playerModule/state'

const playerModule: Module<PlayerState, RootState> = {
  state,
  mutations,
  actions,
  namespaced: true,
}

export default playerModule
