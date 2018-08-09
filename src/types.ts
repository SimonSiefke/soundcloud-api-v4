import {
  audioState,
  audioShouldBeState,
} from '@/store/modules/audioModule/types'

interface _Player {
  play: () => void
  pause: () => void
  isPlaying: () => void
  on: (event: string, callback: any) => void
  setTime: (time: number) => void
  audio: any
  off: (event: string) => void
}

export type Player = _Player | null

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
  audioState: audioState
  audioShouldBeState: audioShouldBeState
  index: number
}
