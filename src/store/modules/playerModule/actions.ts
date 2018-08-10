import { ActionTree } from 'vuex'
import { Track } from '@/types'
import { RootState } from '@/store/types'
import { hooks } from '@/store/modules/playerModule/plugins'
import { player } from '@/store/modules/audioModule/state'
import { NoPlayer } from '@/store/modules/audioModule/audioPlayers/NoPlayer'
import rootStore from '@/store'

export const actions: ActionTree<null, RootState> = {
  async updatePlayer({ rootGetters, dispatch }) {
    const currentTrack = rootGetters['tracks/currentTrack']
    await dispatch('audio/updateTrack', currentTrack, { root: true })
  },
  async play(
    {
      rootGetters, commit, dispatch, rootState,
    },
    track: Track = rootGetters['tracks/currentTrack'],
  ) {
    const oldTrack = rootGetters['tracks/currentTrack']

    commit('tracks/AUDIO_SHOULD_BE_PLAYING', track, { root: true })
    if (player.player === NoPlayer.instance) {
      console.warn('switch from null to local player before playing')
    }
    if (track !== null) {
      const isNewTrack = oldTrack === null || oldTrack.id !== track.id
      if (isNewTrack) {
        commit('tracks/setPlayingIndex', track.index, { root: true })
        if (oldTrack !== null && oldTrack.audioState === 'PLAYING') {
          commit('tracks/AUDIO_SHOULD_BE_STOPPED', oldTrack, { root: true })
          dispatch('audio/stop', oldTrack, { root: true })
        }
        await dispatch('updatePlayer')
        hooks.afterNext({ dispatch }, track)
      }
    } else {
      throw new Error('track is null, cannot play')
    }
  },
  togglePlay(
    { dispatch, rootGetters, commit },
    track: Track = rootGetters['tracks/currentTrack'],
  ) {
    const oldTrack = rootGetters['tracks/currentTrack']
    if (oldTrack === null || track.id !== oldTrack.id) {
      dispatch('play', track)
    } else if (track.audioState === 'PLAYING') {
      commit('tracks/AUDIO_SHOULD_BE_PAUSED', track, { root: true })
      dispatch('audio/pause', track, { root: true })
    } else if (track.audioState === 'PAUSED') {
      commit('tracks/AUDIO_SHOULD_BE_PLAYING', oldTrack, { root: true })
      dispatch('audio/play', track, { root: true })
    } else {
      throw new Error('cannot toggle play')
    }
  },
}
