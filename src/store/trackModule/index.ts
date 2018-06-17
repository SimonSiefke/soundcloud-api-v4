import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { TrackState } from '@/store/trackModule/types'
import { getters } from '@/store/trackModule/getters'
import { actions } from '@/store/trackModule/actions'
import { mutations } from '@/store/trackModule/mutations'
import { state } from '@/store/trackModule/state'

const trackModule: Module<TrackState, RootState> = {
  state,
  mutations,
  actions,
  namespaced: true,
  getters,
}

export default trackModule
