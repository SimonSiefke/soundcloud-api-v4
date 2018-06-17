import Vue from 'vue'
import { MutationTree } from 'vuex'
import { PlayerState } from '@/store/playerModule/types'

export const mutations: MutationTree<PlayerState> = {
  play(state) {
    if (state.player !== null) {
      state.player.play()
    } else {
      throw new Error('player is null, cannot play')
    }
  },
  pause(state) {
    if (state.player !== null) {
      state.player.pause()
    } else {
      throw new Error('player is null, cannot pause')
    }
  },
  stop(state) {
    if (state.player !== null) {
      state.player.pause()
      state.player.off('timeupdate')
      state.player.off('ended')
      Vue.set(state, 'player', null)
    } else {
      throw new Error('player is null, cannot stop')
    }
  },
  resetTimer(state) {
    if (state.player !== null) {
      state.player.setTime(0)
    } else {
      throw new Error('player is null, cannot set time')
    }
  },
  updateProgress(state, newProgress: number) {
    state.progress = newProgress
  },
}
