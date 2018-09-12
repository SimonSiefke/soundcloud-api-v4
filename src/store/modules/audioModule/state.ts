import {
  AudioModuleState,
  AudioPlayer,
} from '@/store/modules/audioModule/types'
import Vue from 'vue'
import { NoPlayer } from '@/store/modules/audioModule/audioPlayers/NoPlayer'

export const state: AudioModuleState = {
  audioState: 'IDLE',
  shouldBeState: 'SHOULD_BE_IDLE',
  loop: true,
}

/** this is the actual AudioPlayer, it can be a player that plays on the local device or for example on chromecast
 */
export const player = new Vue({
  data: {
    player: new NoPlayer() as AudioPlayer,
  },
})

// @ts-ignore
window.player = player
