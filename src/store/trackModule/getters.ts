import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { TrackState } from '@/store/trackModule/types'

export const getters: GetterTree<TrackState, RootState> = {
  currentTrack(state: TrackState) {
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
