import { State } from './types'

export function getCurrentTrack(state: State) {
  if (state.tracks.length > 0 && state.playingIndex >= 0) {
    return state.tracks[state.playingIndex]
  }
  return null
}
