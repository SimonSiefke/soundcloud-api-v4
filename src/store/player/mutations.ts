import Vue from 'vue'
import { State } from './types'

export function play(state: State) {
  if (state.player !== null) {
    state.player.play()
  } else {
    throw new Error('player is null, cannot play')
  }
}

export function pause(state: State) {
  if (state.player !== null) {
    state.player.pause()
  } else {
    throw new Error('player is null, cannot pause')
  }
}

export function stop(state: State) {
  if (state.player !== null) {
    state.player.pause()
    state.player.off('timeupdate')
    state.player.off('ended')
    Vue.set(state, 'player', null)
  } else {
    throw new Error('player is null, cannot stop')
  }
}

export function resetTimer(state: State) {
  if (state.player !== null) {
    state.player.setTime(0)
  } else {
    throw new Error('player is null, cannot set time')
  }
}

export function updateProgress(state: State, newProgress: number) {
  state.progress = newProgress
}
