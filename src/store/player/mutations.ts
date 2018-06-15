import { Track, Player } from '@/types'
import { State } from './types'

export function playTrack(state: State, track: Track) {
  track.player!.play() // track.player will not be null
  track.playing = true
}

export function pauseTrack(state: State, track: Track) {
  track.player!.pause() // track.player will not be null
  track.playing = false
}

export function resetTimer(state: State, track: Track) {
  track.player!.setTime(0)
}

export function updateProgress(state: State, newProgress: number) {
  state.progress = newProgress
}
