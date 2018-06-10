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

// export function addRecentlyPlayedTrack (state: State, track: Track) {
//   // TODO: refactor
//   // @ts-ignore
//   if (state.recentlyPlayedTracks.includes(track.id)) {
//     console.log('includes', track.name, track.id)

//     const index = state.recentlyPlayedTracks.indexOf(track.id)

//     console.log('index', index)

//     state.recentlyPlayedTracks = [
//       track.id,
//       ...state.recentlyPlayedTracks.slice(0, index),
//       ...state.recentlyPlayedTracks.slice(index + 1)
//     ]
//   } else {
//     state.recentlyPlayedTracks = [
//       track.id,
//       ...state.recentlyPlayedTracks.slice(
//         0,
//         state.recentlyPlayedTracks.length - 1
//       )
//     ]
//   }
// }
// export function resetRecentlyPlayedTracks (state: State) {
//   console.log('reset')
//   Vue.set(state, 'recentlyPlayedTracks', [])
// }
