import SoundCloudAudio from 'soundcloud-audio'
import Soundcloud from 'soundcloud'
import { getCurrentTrack } from '@/utils'
import { Track, State } from '@/types'

// @ts-ignore
const scPlayer = new SoundCloudAudio(process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID)

const hooks = {
  beforePause() {
    console.log('pause')
    // if ('mediaSession' in navigator) {
    //   // @ts-ignore
    //   navigator.mediaSession.playbackState = 'paused'
    // }
  },
  afterPause() {
    if ('mediaSession' in navigator) {
      // @ts-ignore
      navigator.mediaSession.playbackState = 'paused'
    }
  },
  beforePlay({ dispatch }: { dispatch: Function }, track: Track) {
    console.log('play')
    // if ('mediaSession' in navigator) {
    //   dispatch('updateMediaSession', track)
    //   // @ts-ignore
    //   navigator.mediaSession.playbackState = 'playing'
    // }
  },
  afterPlay({ dispatch }: { dispatch: Function }, track: Track) {
    if ('mediaSession' in navigator) {
      dispatch('updateMediaSession', track)
      // @ts-ignore
      navigator.mediaSession.playbackState = 'playing'
    }
  },
}

export async function updatePlayer(
  { state, commit }: { state: State; commit: any },
  track: Track,
) {
  try {
    const newPlayer = await Soundcloud.stream(`/tracks/${track.id}`)
    commit('setPlayer', { track, newPlayer })
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
  track.player!.on('state-change', (newPlayerState: string) => {
    switch (newPlayerState) {
      case 'ended':
        if (state.loop) {
          commit('resetTimer', track)
          commit('playTrack', track)
        }
    }
  })
}

export function updateMediaSession(
  { state, commit, dispatch }: { state: State; commit: any; dispatch: any },
  track: Track,
) {
  console.log('set up media session')

  // @ts-ignore
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.name,
    artist: track.userName,
    artwork: [
      {
        src: 'https://dummyimage.com/96x96',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/128x128',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/192x192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/256x256',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/384x384',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/512x512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  })

  // @ts-ignore
  navigator.mediaSession.setActionHandler('play', () => {
    console.log('media session play')
    dispatch('play', track)
  })
  // @ts-ignore
  navigator.mediaSession.setActionHandler('pause', () => {
    console.log('media session pause')
    dispatch('pause', track)
  })
}
