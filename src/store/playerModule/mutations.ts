import { MutationTree } from 'vuex'
import { PlayerState } from '@/store/playerModule/types'
import { player } from './state'

export const mutations: MutationTree<PlayerState> = {
  play() {
    if (player.player !== null) {
      player.player.play()
    } else {
      throw new Error('player is null, cannot play')
    }
  },
  pause() {
    if (player!.player !== null) {
      player.player.pause()
    } else {
      throw new Error('player is null, cannot pause')
    }
  },
  stop() {
    if (player.player !== null) {
      player.player.pause()
      player.player.setTime(0)
      /* create a timeout so that the progress-bar
         can update its progress to 0, then the
         current player will be deleted */
      setTimeout(() => {
        player.player.unbindAll()
        player.player = null
      }, 0)
    } else {
      throw new Error('player is null, cannot stop')
    }
  },
  resetTimer() {
    if (player.player !== null) {
      player.player.setTime(0)
    } else {
      throw new Error('player is null, cannot set time')
    }
  },
  updateProgress(state, newProgress: number) {
    state.progress = newProgress
  },
}
