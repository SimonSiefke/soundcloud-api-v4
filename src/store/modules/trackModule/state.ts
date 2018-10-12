import { TrackState } from '@/store/modules/trackModule/types'

export const state: TrackState = {
  tracks: [...Array(8).fill(null)],
  playingIndex: null,
  nextTracksLink: '',
}
