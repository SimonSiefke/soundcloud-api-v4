import { State } from '@/types'

export function getCurrentTrack(state: State) {
  return state.tracks[state.playingIndex]
}
