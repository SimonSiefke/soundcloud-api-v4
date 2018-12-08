export type IAudioState =
  | 'IDLE'
  | 'LOADING'
  | 'LOADED'
  | 'PLAYING'
  | 'PAUSED'
  | 'STOPPED'
  | 'ERROR'
  | 'ENDED'

export type IAudioShouldBeState =
  | 'SHOULD_BE_IDLE'
  | 'SHOULD_BE_PLAYING'
  | 'SHOULD_BE_PAUSED'
  | 'SHOULD_BE_STOPPED'
  | 'SHOULD_BE_ENDED'

export interface ITrack {
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
  audioState: IAudioState
  audioShouldBeState: IAudioShouldBeState
  index: number
}
