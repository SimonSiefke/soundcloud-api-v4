// export interface State {
//   tracks: Track[]
//   playingIndex: number
//   loop: boolean
//   nextTracksLink: string
// }
export interface Track {
  id: number
  cover: string
  name: string
  duration: any //
  love: number
  link: string
  genre: string
  userAvatar: string
  userLink: string
  userName: string
  playing: boolean
  loading: boolean
  index: number
  player: Player | null
}

export interface Player {
  play: () => void
  pause: () => void
  isPlaying: () => void
  on: (event: string, callback: any) => void
  setTime: (time: number) => void
  audio: any
}
