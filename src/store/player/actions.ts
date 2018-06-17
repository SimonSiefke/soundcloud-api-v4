import Vue from 'vue'
import { Track, Player } from '@/types'
import SoundCloudAudio from 'soundcloud-audio'
import { hooks } from './plugins/index'
import { State } from './types'

const SOUNDCLOUD_CLIENT_ID = process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID

export async function updatePlayer({
  rootGetters,
  state,
  dispatch,
}: {
rootGetters: any
state: State
dispatch: any
}) {
  const currentTrack = rootGetters['tracks/currentTrack']

  try {
    // @ts-ignore
    const newPlayer = new SoundCloudAudio(process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID)
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
}

export function pauseCurrent({
  rootGetters,
  commit,
}: {
commit: any
rootGetters: any
}) {
  const currentTrack = rootGetters['tracks/currentTrack']
  Vue.set(currentTrack, 'playing', false)
  hooks.beforePause()
  commit('pause')
  hooks.afterPause()
}

export function playCurrent({
  rootGetters,
  commit,
}: {
commit: any
rootGetters: any
}) {
  const currentTrack = rootGetters['tracks/currentTrack']
  Vue.set(currentTrack, 'playing', true)
  hooks.beforePlay()
  commit('play')
  hooks.afterPlay()
}

export function stopCurrent({
  rootGetters,
  commit,
}: {
commit: any
rootGetters: any
}) {
  const currentTrack = rootGetters['tracks/currentTrack']
  Vue.set(currentTrack, 'playing', false)
  commit('stop')
}

export async function play(
  {
    state,
    rootGetters,
    rootState,
    commit,
    dispatch,
  }: {
  state: State
  rootGetters: any
  rootState: any
  commit: any
  dispatch: any
  },
  track: Track = rootGetters['tracks/currentTrack'],
) {
  if (track !== null) {
    if (rootState.tracks.playingIndex !== track.index) {
      if (state.player !== null) {
        dispatch('stopCurrent')
      }
      commit('tracks/setPlayingIndex', track.index, { root: true })
      commit('tracks/loadingTrack', track.index, { root: true })
    }

    // create a new soundcloud player if it doesn't already exist
    if (state.player === null) {
      await dispatch('updatePlayer')
      dispatch('addEventListenersForPlayer')
    }
    commit('tracks/doneLoadingTrack', track.index, { root: true })
    dispatch('playCurrent')
  }
}

// export function pause(
//   {
//     rootGetters,
//     dispatch,
//   }: {
//   rootGetters: any
//   dispatch: Function
//   },
//   track: Track = rootGetters['tracks/currentTrack'],
// ) {
//   dispatch('pauseCurrent')
// }
/**
 * toggles between play and pause
 */
export function togglePlay(
  {
    state,
    dispatch,
    rootGetters,
  }: { rootGetters: any; state: any; dispatch: any },
  track: Track,
) {
  const currentTrack = rootGetters['tracks/currentTrack']
  if (currentTrack === null || track.id !== currentTrack.id) {
    dispatch('play', track)
  } else if (currentTrack.playing) {
    dispatch('pauseCurrent')
  } else {
    dispatch('playCurrent')
  }
}

/** if a song ends, we need to update our state */
export function addEventListenersForPlayer({
  state,
  rootGetters,
  commit,
}: {
state: State
rootGetters: any
commit: any
}) {
  const currentTrack = rootGetters['tracks/currentTrack']
  if (state.player !== null) {
    state.player.on('timeupdate', () => {
      if (state.player !== null) {
        const progressPercent =
          (state!.player!.audio.currentTime / (currentTrack.duration / 1000)) *
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
}
