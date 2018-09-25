import { Track } from '@/types'

export interface TrackState {
  tracks: Track[]
  playingIndex: number | null
  nextTracksLink: string
}
