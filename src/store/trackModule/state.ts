import { TrackState } from '@/store/trackModule/types'

export const state: TrackState = {
  tracks: [...Array(8).fill(null)],
  playingIndex: null,
  nextTracksLink: '',
}
