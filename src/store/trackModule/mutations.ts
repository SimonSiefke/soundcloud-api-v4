import Vue from 'vue'
import { MutationTree } from 'vuex'
import { Track } from '@/types'
import { TrackState } from '@/store/trackModule/types'

export const mutations: MutationTree<TrackState> = {
  setPlayingIndex(state, newPlayingIndex: number) {
    if (state.playingIndex !== null) {
      // Vue.set(state.tracks[state.playingIndex], 'playing', false)
      // Vue.set(state.tracks[newPlayingIndex], 'playing', true)
    }
    state.playingIndex = newPlayingIndex
  },
  incrementPlayingIndex(state) {
    if (state.playingIndex !== null) {
      if (state.playingIndex <= state.tracks.length - 1) {
        state.playingIndex++
      }
    } else {
      throw new Error('playing index is null, cannot increment')
    }
  },
  decrementPlayingIndex(state) {
    if (state.playingIndex !== null) {
      if (state.playingIndex > 0) {
        state.playingIndex--
      }
    } else {
      throw new Error('playing index is null, cannot decrement')
    }
  },
  loadingTrack(state, trackIndex: number) {
    Vue.set(state.tracks[trackIndex], 'loading', true)
  },
  doneLoadingTrack(state, trackIndex: number) {
    Vue.set(state.tracks[trackIndex], 'loading', false)
  },
  setNextTracksLink(state, nextTrackLink: string) {
    state.nextTracksLink = nextTrackLink
  },
  setTracks(state, tracks: Track[]) {
    state.tracks = tracks
  },
}
