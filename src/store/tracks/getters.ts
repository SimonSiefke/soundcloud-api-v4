import { State } from './types'

export function currentTrack(state: State) {
  if (
    state.tracks.length > 0 &&
    state.playingIndex !== null &&
    state.playingIndex >= 0
  ) {
    return state.tracks[state.playingIndex]
  }
  return null
}
