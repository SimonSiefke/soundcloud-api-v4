import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { TrackState } from '@/store/trackModule/types'
import { getters } from '@/store/trackModule/getters'
import { actions } from '@/store/trackModule/actions'
import { mutations } from '@/store/trackModule/mutations'

export const state: TrackState = {
  tracks: [...Array(8).fill(null)],
  playingIndex: null,
  nextTracksLink: '',
}

const trackModule: Module<TrackState, RootState> = {
  state,
  mutations,
  actions,
  namespaced: true,
  getters,
}

export default trackModule
