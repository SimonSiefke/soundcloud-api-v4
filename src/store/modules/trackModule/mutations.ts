import Vue from 'vue'
import { MutationTree } from 'vuex'
import { Track } from '@/types'
import { TrackState } from '@/store/modules/trackModule/types'

export const mutations: MutationTree<TrackState> = {
  AUDIO_SHOULD_BE_STOPPED(state, track) {
    Vue.set(track, 'audioShouldBeState', 'SHOULD_BE_STOPPED')
  },
  AUDIO_STOPPED(state, track) {
    Vue.set(track, 'audioState', 'STOPPED')
  },
  AUDIO_SHOULD_BE_PLAYING(state, track) {
    Vue.set(track, 'audioShouldBeState', 'SHOULD_BE_PLAYING')
  },
  AUDIO_PLAYING(state, track) {
    Vue.set(track, 'audioState', 'PLAYING')
  },
  AUDIO_SHOULD_BE_PAUSED(state, track) {
    Vue.set(track, 'audioShouldBeState', 'SHOULD_BE_PAUSED')
  },
  AUDIO_PAUSED(state, track) {
    Vue.set(track, 'audioState', 'PAUSED')
  },
  setPlayingIndex(state, newPlayingIndex: number | null) {
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
  // loadingTrack(state, trackIndex: number) {
  //   Vue.set(state.tracks[trackIndex], 'state', 'LOADING')
  // },
  // doneLoadingTrack(state, trackIndex: number) {
  //   Vue.set(state.tracks[trackIndex], 'state', 'LOADED')
  // },
  setNextTracksLink(state, nextTrackLink: string) {
    state.nextTracksLink = nextTrackLink
  },
  setTracks(state, tracks: Track[]) {
    state.tracks = tracks
  },
}
