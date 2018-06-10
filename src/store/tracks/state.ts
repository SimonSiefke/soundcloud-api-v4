import { State } from './types'

export const state: State = {
  tracks: [...Array(8).fill(null)],
  // recentlyPlayedTracks: [...Array(3).fill(null)],
  playingIndex: 0,
  nextTracksLink: '',
}
