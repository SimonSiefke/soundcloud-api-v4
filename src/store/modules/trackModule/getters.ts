import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { TrackState } from '@/store/modules/trackModule/types'

export const getters: GetterTree<TrackState, RootState> = {
  // eslint-disable-next-line no-shadow
  currentTrack(state, getters, rootState) {
    if (
      state.tracks.length > 0 &&
      state.playingIndex !== null &&
      state.playingIndex >= 0
    ) {
      return state.tracks[state.playingIndex]
    }
    return null
  },
}
