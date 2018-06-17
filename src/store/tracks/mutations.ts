import Vue from 'vue'
import { Track } from '@/types'
import { State } from './types'

export function setPlayingIndex(state: State, newPlayingIndex: number) {
  if (state.playingIndex !== null) {
    // Vue.set(state.tracks[state.playingIndex], 'playing', false)
    // Vue.set(state.tracks[newPlayingIndex], 'playing', true)
  }
  state.playingIndex = newPlayingIndex
}

export function incrementPlayingIndex(state: State) {
  if (state.playingIndex !== null) {
    if (state.playingIndex <= state.tracks.length - 1) {
      state.playingIndex++
    }
  } else {
    throw new Error('playing index is null, cannot increment')
  }
}

export function decrementPlayingIndex(state: State) {
  if (state.playingIndex !== null) {
    if (state.playingIndex > 0) {
      state.playingIndex--
    }
  } else {
    throw new Error('playing index is null, cannot decrement')
  }
}

// other
export function loadingTrack(state: State, trackIndex: number) {
  Vue.set(state.tracks[trackIndex], 'loading', true)
}

export function doneLoadingTrack(state: State, trackIndex: number) {
  Vue.set(state.tracks[trackIndex], 'loading', false)
}

export function setNextTracksLink(state: State, nextTrackLink: string) {
  state.nextTracksLink = nextTrackLink
}

export function setTracks(state: State, tracks: Track[]) {
  state.tracks = tracks
}
