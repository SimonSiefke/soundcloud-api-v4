import Vue from 'vue'
import { ActionTree } from 'vuex'
import SoundCloudAudio from 'soundcloud-audio'
import { Track, Player } from '@/types'
import { RootState } from '@/store/types'
import { PlayerState } from '@/store/playerModule/types'
import { hooks } from '@/store/playerModule/plugins'

const SOUNDCLOUD_CLIENT_ID = process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID

export const actions: ActionTree<PlayerState, RootState> = {
  async updatePlayer({ rootGetters, state, dispatch }) {
    const currentTrack = rootGetters['tracks/currentTrack']

    try {
      // @ts-ignore
      const newPlayer = new SoundCloudAudio(SOUNDCLOUD_CLIENT_ID)
      await new Promise((resolve, reject) => {
        newPlayer.resolve(
          `https://api.soundcloud.com/tracks/${currentTrack.id}`,
          resolve,
        )
      })

      state.player = newPlayer
    } catch (error) {
      if (error.status === 404) {
        // @ts-ignore
      }
      console.warn(error)
      alert('something went wrong')
    }
  },
  pauseCurrent({ rootGetters, commit }) {
    const currentTrack = rootGetters['tracks/currentTrack']
    Vue.set(currentTrack, 'playing', false)
    commit('pause')
  },
  playCurrent({ rootGetters, commit }) {
    const currentTrack = rootGetters['tracks/currentTrack']
    Vue.set(currentTrack, 'playing', true)
    commit('play')
  },
  stopCurrent({ rootGetters, commit }) {
    const currentTrack = rootGetters['tracks/currentTrack']
    Vue.set(currentTrack, 'playing', false)
    commit('stop')
  },
  async play(
    {
      state, rootGetters, rootState, commit, dispatch,
    },
    track: Track = rootGetters['tracks/currentTrack'],
  ) {
    const currentTrack = rootGetters['tracks/currentTrack']
    if (track !== null) {
      const isNewTrack = currentTrack === null || currentTrack.id !== track.id
      if (isNewTrack) {
        if (state.player !== null) {
          dispatch('stopCurrent')
        }
        commit('updateProgress', 0)
        commit('tracks/setPlayingIndex', track.index, { root: true })
        commit('tracks/loadingTrack', track.index, { root: true })
        await dispatch('updatePlayer')
        dispatch('addEventListenersForPlayer')
        commit('tracks/doneLoadingTrack', track.index, { root: true })
        hooks.afterNext({ dispatch }, track)
      }
      dispatch('playCurrent')
    } else {
      throw new Error('track is null, cannot play')
    }
  },
  togglePlay({ state, dispatch, rootGetters }, track: Track) {
    const currentTrack = rootGetters['tracks/currentTrack']
    if (currentTrack === null || track.id !== currentTrack.id) {
      dispatch('play', track)
    } else if (currentTrack.playing) {
      dispatch('pauseCurrent')
    } else {
      dispatch('playCurrent')
    }
  },
  addEventListenersForPlayer({ state, rootGetters, commit }) {
    const currentTrack = rootGetters['tracks/currentTrack']
    if (state.player !== null) {
      state.player.on('timeupdate', () => {
        if (state.player !== null) {
          const progressPercent =
            (state!.player!.audio.currentTime /
              (currentTrack.duration / 1000)) *
            100
          // @ts-ignore
          commit('updateProgress', progressPercent)
        }
      })
      state.player.on('ended', () => {
        if (state.loop) {
          commit('resetTimer')
          commit('playTrack')
        }
      })
    } else {
      throw new Error('player is null, cannot add EventListeners')
    }
  },
}
