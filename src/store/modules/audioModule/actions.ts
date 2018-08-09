import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import {
  AudioModuleState,
  AudioPlayer,
} from '@/store/modules/audioModule/types'
import { player } from '@/store/modules/audioModule/state'
import { NoPlayer } from '@/store/modules/audioModule/audioPlayers/NoPlayer'
import { Track } from '@/types'
import Vue from 'vue'

const oldTrack: Track | null = null

export const actions: ActionTree<AudioModuleState, RootState> = {
  SET_AUDIO_PLAYER({ rootGetters, dispatch }, newPlayer: AudioPlayer) {
    const currentTrack = rootGetters['tracks/currentTrack']
    const oldPlayer = player.player
    if (oldPlayer.beforeDelete) {
      oldPlayer.beforeDelete(currentTrack)
    }
    Vue.set(player, 'player', newPlayer)
    if (currentTrack !== null) {
      console.log('update new player with new track')
      dispatch('updateTrack', currentTrack)
    }
  },

  async updateTrack({ dispatch }, newTrack) {
    if (player.player === NoPlayer.instance) {
      console.warn('cannot update player, because player is null')
      // const {
      //   LocalDevicePlayer,
      // } = await import(/* webpackChunkName: 'audio-player-local-device' */ '@/store/modules/audioModule/audioPlayers/LocalDevicePlayer')

      // player.player = new LocalDevicePlayer(store)
    }
    await player.player.updateTrack(oldTrack, newTrack)
  },
  play(state, track) {
    if (player.player !== NoPlayer.instance) {
      player.player.play(track)
    } else {
      throw new Error('player is null, cannot play')
    }
  },
  AUDIO_PLAYING({ commit }, track) {
    commit('tracks/AUDIO_PLAYING', track, { root: true })
  },
  pause(state, track) {
    if (player.player !== NoPlayer.instance) {
      player.player.pause(track)
    } else {
      throw new Error('player is null, cannot pause')
    }
  },
  AUDIO_PAUSED({ commit }, track) {
    console.log(track)
    if (track !== null) {
      commit('tracks/AUDIO_PAUSED', track, { root: true })
    }
  },
  stop({ commit }, track) {
    if (player.player !== NoPlayer.instance) {
      player.player.stop(track)
    } else {
      throw new Error('player is null, cannot stop')
    }
  },
  AUDIO_STOPPED({ commit }, track) {
    if (track !== null) {
      commit('tracks/AUDIO_STOPPED', track, { root: true })
    }
  },
}
