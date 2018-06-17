import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import { State } from './types'

export const state: State = {
  tracks: [...Array(8).fill(null)],
  // recentlyPlayedTracks: [...Array(3).fill(null)],
  playingIndex: null,
  nextTracksLink: '',
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
  getters,
}
