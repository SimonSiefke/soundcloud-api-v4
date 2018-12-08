import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { TrackState } from '@/store/modules/trackModule/types'
import { getters } from '@/store/modules/trackModule/getters'
import { actions } from '@/store/modules/trackModule/actions'
import { mutations } from '@/store/modules/trackModule/mutations'
import { state } from '@/store/modules/trackModule/state'

const trackModule: Module<TrackState, RootState> = {
  state,
  mutations,
  actions,
  namespaced: true,
  getters,
}

export default trackModule
