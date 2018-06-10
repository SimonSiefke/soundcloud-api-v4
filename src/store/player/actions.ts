import Soundcloud from 'soundcloud'
import { getCurrentTrack } from '@/utils'
import { Track, State } from '@/types'

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
  if (track !== undefined) {
    commit('pauseTrack', track)
  }
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
