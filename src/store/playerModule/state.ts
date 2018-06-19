import { PlayerState } from '@/store/playerModule/types'
import Vue from 'vue'

export const state: PlayerState = {
  loop: true,
  progress: 0,
}

export const player = new Vue({
  data: {
    player: null as any,
  },
})

