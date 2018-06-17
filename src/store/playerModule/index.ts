import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { PlayerState } from '@/store/playerModule/types'
import { actions } from '@/store/playerModule/actions'
import { mutations } from '@/store/playerModule/mutations'

const state: PlayerState = {
  loop: true,
  progress: 0,
  player: null,
}

const playerModule: Module<PlayerState, RootState> = {
  state,
  mutations,
  actions,
  namespaced: true,
}

export default playerModule
