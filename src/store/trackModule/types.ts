import { Track } from '@/types'

export interface TrackState {
  tracks: Track[]
  // recentlyPlayedTracks: (string | number)[]
  playingIndex: number | null
  nextTracksLink: string
}
