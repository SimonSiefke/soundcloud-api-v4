import Vue from 'vue'
import { Track } from '@/types'
import { State } from './types'

// PlayingIndex Mutations
export function setPlayingIndex(state: State, newPlayingIndex: number) {
  Vue.set(state.tracks[state.playingIndex], 'playing', false)
  state.playingIndex = newPlayingIndex
}

export function incrementPlayingIndex(state: State) {
  if (state.playingIndex <= state.tracks.length - 1) {
    state.playingIndex++
  }
}

export function decrementPlayingIndex(state: State) {
  if (state.playingIndex > 0) {
    state.playingIndex--
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
