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
import store from '@/store'

export const actions: ActionTree<AudioModuleState, RootState> = {
  SET_AUDIO_PLAYER({ rootGetters, dispatch }, newPlayer: AudioPlayer) {
    console.log('set audio player')
    const currentTrack = rootGetters['tracks/currentTrack']
    const oldPlayer = player.player
    if (oldPlayer.beforeDelete) {
      oldPlayer.beforeDelete()
    }
    console.log('deleted old')
    Vue.set(player, 'player', newPlayer)
    if (currentTrack !== null) {
      console.log('update new player with new track')
      dispatch('updateTrack', currentTrack)
    }
  },
  async updateTrack({ dispatch }, newTrack: Track) {
    console.log('NEW')
    console.log(newTrack.audioShouldBeState)
    if (player.player === NoPlayer.instance) {
      console.warn(
        'cannot update player, because player is null, switching to local',
      )
      console.log('before')
      const {
        LocalDevicePlayer,
      } = await import(/* webpackChunkName: 'AUDIO_PLAYER__local-device' */ '@/store/modules/audioModule/audioPlayers/LocalDevicePlayer/LocalDevicePlayer')
      console.log('finalyy switched')
      player.player = new LocalDevicePlayer(store)
    }
    if (newTrack.audioShouldBeState === 'SHOULD_BE_PLAYING') {
      await player.player.updateTrack(newTrack)
    }
  },
  play() {
    if (player.player !== NoPlayer.instance) {
      player.player.play()
    } else {
      throw new Error('player is null, cannot play')
    }
  },
  AUDIO_PLAYING({ commit }, track: Track) {
    commit('tracks/AUDIO_PLAYING', track, { root: true })
  },
  pause() {
    if (player.player !== NoPlayer.instance) {
      player.player.pause()
    } else {
      throw new Error('player is null, cannot pause')
    }
  },
  AUDIO_PAUSED({ commit }, track: Track) {
    commit('tracks/AUDIO_PAUSED', track, { root: true })
  },
  stop({ commit }, track: Track) {
    if (player.player !== NoPlayer.instance) {
      player.player.stop()
    } else {
      throw new Error('player is null, cannot stop')
    }
  },
  AUDIO_STOPPED({ commit }, track: Track) {
    if (track !== null) {
      commit('tracks/AUDIO_STOPPED', track, { root: true })
    }
  },
}
