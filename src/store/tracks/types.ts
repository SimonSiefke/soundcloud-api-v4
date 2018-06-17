import { Track } from '@/types'

export interface State {
  tracks: Track[]
  // recentlyPlayedTracks: (string | number)[]
  playingIndex: number | null
  nextTracksLink: string
}
