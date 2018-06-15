import { getCurrentTrack } from '@/utils'
import { Track, State, Player } from '@/types'
import SoundCloudAudio from 'soundcloud-audio'

export { updateMediaSession } from './plugins/mediaSession'

const SOUNDCLOUD_CLIENT_ID = process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID

const hooks = {
  beforePause() {
    console.log('before pause')
    // if ('mediaSession' in navigator) {
    //   // @ts-ignore
    //   navigator.mediaSession.playbackState = 'paused'
    // }
  },
  afterPause() {
    console.log('after pause')
  },
  beforePlay({ dispatch }: { dispatch: Function }, track: Track) {},
  afterPlay({ dispatch }: { dispatch: Function }, track: Track) {
    console.log('after play')
    if ('mediaSession' in navigator) {
      console.log('upadte media session')
      dispatch('updateMediaSession', track)
      // @ts-ignore
    }
  },
}

export async function updatePlayer(
  { state, dispatch }: { state: State; dispatch: any },
  track: Track,
) {
  try {
    // @ts-ignore
    const newPlayer = new SoundCloudAudio(process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID)
    await new Promise((resolve, reject) => {
      newPlayer.resolve(
        `https://api.soundcloud.com/tracks/${track.id}`,
        resolve,
      )
    })
    console.log('new plyer is')

    console.log(newPlayer)
    // const newPlayer = await Soundcloud.stream(`/tracks/${track.id}`)
    dispatch('setPlayer', { track, newPlayer })
  } catch (error) {
    if (error.status === 404) {
      // @ts-ignore
    }
    console.warn(error)
    alert('something went wrong')
  }
}
export function pause(
  { state, commit }: { state: State; commit: any },
  track: Track = getCurrentTrack(state),
) {
  hooks.beforePause()
  if (track !== undefined) {
    commit('pauseTrack', track)
  }
  hooks.afterPause()
}

export async function play(
  {
    state,
    rootState,
    commit,
    dispatch,
  }: {
  state: State
  rootState: any
  commit: any
  dispatch: any
  },
  track: Track = getCurrentTrack(state),
) {
  hooks.beforePlay({ dispatch }, track)
  if (track !== undefined) {
    if (
      rootState.tracks.playingIndex !== track.index &&
      rootState.tracks.tracks[rootState.tracks.playingIndex].player !== null
    ) {
      commit(
        'pauseTrack',
        rootState.tracks.tracks[rootState.tracks.playingIndex],
      )
      commit('tracks/setPlayingIndex', track.index, { root: true })
      commit('tracks/loadingTrack', track.index, { root: true })
    }
    // create a new soundcloud player if it doesn't already exist
    if (track.player === null) {
      await dispatch('updatePlayer', track)
      dispatch('addEventListenersForPlayer', track)
    }
    commit('tracks/doneLoadingTrack', track.index, { root: true })
    commit('playTrack', track)
    hooks.afterPlay({ dispatch }, track)
  }
}

/**
 * toggles between play and pause
 */
export function togglePlay(
  { state, dispatch }: { state: State; dispatch: any },
  track: Track = getCurrentTrack(state),
) {
  if (track !== undefined) {
    if (track.playing) {
      dispatch('pause', track)
    } else {
      dispatch('play', track)
    }
  }
}

/** if a song ends, we need to update our state */
export function addEventListenersForPlayer(
  { state, commit }: { state: State; commit: any },
  track: Track,
) {
  track.player!.on('ended', () => {
    if (state.loop) {
      commit('resetTimer', track)
      commit('playTrack', track)
    }
  })
}

export function setPlayer(
  { state, commit }: { state: State; commit: Function },
  { track, newPlayer }: { track: Track; newPlayer: Player },
) {
  track.player = newPlayer
  track.player.on('timeupdate', (x: any) => {
    const progressPercent =
      (track!.player!.audio.currentTime / (track.duration / 1000)) * 100
    // @ts-ignore
    commit('updateProgress', progressPercent)
  })
}
