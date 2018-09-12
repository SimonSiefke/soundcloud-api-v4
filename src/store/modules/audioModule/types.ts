import { Track } from '@/types'
import rootStore from '@/store'

// the different states an audio player can have (e.g. for a local device or chromecast)
export type audioState =
  | 'IDLE'
  | 'LOADING'
  | 'LOADED'
  | 'PLAYING'
  | 'PAUSED'
  | 'STOPPED'
  | 'ERROR'
  | 'ENDED'

export type audioShouldBeState =
  | 'SHOULD_BE_IDLE'
  | 'SHOULD_BE_PLAYING'
  | 'SHOULD_BE_PAUSED'
  | 'SHOULD_BE_STOPPED'
  | 'SHOULD_BE_ENDED'

/**
 * interface for an audio player, (e.g. for a local device or chromecast)
 * when implemented, it must also call the corresponding mutations for setting the audio state so that the state will be in sync with the player. The player should be implemented as a Singleton
 */
export interface AudioPlayer {
  progressEventEmitter: any
  /**
   * the player should do stuff it needs to do before it can be used
   */
  initOnce?: () => Promise<void>
  /**
   * the player should play the current track and update the state
   */
  play: (track: Track) => void
  /**
   *  the player anyould pause the current track and update the state
   */
  pause: (track: Track) => void

  /**
   * the player should stop the current track and update the state
   */
  stop: (track: Track) => void
  /**
   *  the player should toggle the playing status and update the state
   */
  // togglePlay: () => void

  /**
   * the player should the timer to the given time on the current track
   */
  setTime: (time: number) => void

  /**
   * the player should play the new track and update the state
   */
  updateTrack: (oldTrack: Track | null, newTrack: Track) => Promise<void>

  /**
   * this function gets called before the player will be deleted so that it can unbind event listeners etc.
   */
  beforeDelete?: (oldTrack: Track | null) => void
}

export interface AudioModuleState {
  audioState: audioState
  shouldBeState: audioShouldBeState
  loop: boolean
}
