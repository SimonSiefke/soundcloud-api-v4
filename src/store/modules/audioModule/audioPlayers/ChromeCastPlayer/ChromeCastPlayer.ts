import { AudioPlayer, audioState } from '@/store/modules/audioModule/types'
import { Track } from '@/types'
// @ts-ignore
import * as Mitt from 'mitt/dist/mitt.umd'
import {
  remotePlayer,
  remotePlayerController,
} from '@/store/modules/audioModule/audioPlayers/ChromeCastPlayer/ChromeCastPlayerWrapper'

const SOUNDCLOUD_CLIENT_ID = process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID

export class ChromeCastPlayer implements AudioPlayer {
  private castSession: any
  private incrementProgressTimer: any
  private store: any
  private track!: Track
  public progressEventEmitter = new Mitt()
  public static instance: ChromeCastPlayer

  constructor(store: any) {
    if (!ChromeCastPlayer.instance) {
      this.store = store
      this.addEventListenersForPlayer()
      ChromeCastPlayer.instance = this
    }
    ChromeCastPlayer.instance.castSession = cast.framework.CastContext.getInstance().getCurrentSession()

    return ChromeCastPlayer.instance
  }

  public play() {
    if (remotePlayer.isPaused) {
      remotePlayerController.playOrPause()
    } else {
      throw new Error('chromecast cannot play')
    }
    this.setUpProgressTimer()
  }

  public pause() {
    if (!remotePlayer.isPaused && remotePlayer.canPause) {
      remotePlayerController.playOrPause()
    } else {
      throw new Error('chromecast cannot pause')
    }
    this.store.dispatch('audio/AUDIO_PAUSED', this.track)
    clearInterval(this.incrementProgressTimer)
  }
  public stop() {
    remotePlayerController.stop()
    this.store.dispatch('audio/AUDIO_STOPPED', this.track)
    this.progressEventEmitter.emit('progress', 0)
    clearInterval(this.incrementProgressTimer)
  }

  public setTime(time: number) {
    remotePlayer.currentTime = time
    remotePlayerController.seek()
  }
  public async updateTrack(newTrack: Track) {
    if (!this.castSession) {
      console.warn('no castsession')
      return
    }
    this.track = newTrack
    const audioUrl = `https://api.soundcloud.com/tracks/${
      newTrack.id
    }/stream?client_id=${SOUNDCLOUD_CLIENT_ID}`
    console.log('before request')
    const mediaInfo = new chrome.cast.media.MediaInfo(audioUrl, 'audio/mp3')
    // const queueItem = new chrome.cast.media.QueueItem(mediaInfo)
    // queueItem.preloadTime = 20
    // queueItem.queueId = 7
    const queueLoadRequest = new chrome.cast.media.QueueLoadRequest([])
    // queueLoadRequest.repeatMode = chrome.cast.media.SINGLE

    const request = new chrome.cast.media.LoadRequest(mediaInfo)
    // console.log('request done', request)

    try {
      // await this.castSession.queueLoad(
      //   queueLoadRequest,
      //   (e) => {
      //     console.log(e)
      //   },
      //   error => console.log(error),
      // )
      await this.castSession.loadMedia(request)
    } catch (error) {
      console.error(
        'chromecast failed to load media due to',
        JSON.stringify(error),
      )
      return
    }

    remotePlayerController.setVolumeLevel()
    this.store.dispatch('audio/AUDIO_PLAYING', newTrack)
    this.setUpProgressTimer()
  }

  private setUpProgressTimer() {
    let progressInMilliseconds
    this.incrementProgressTimer = setInterval(() => {
      progressInMilliseconds = remotePlayer.currentTime
      if (progressInMilliseconds < remotePlayer.duration) {
        this.progressEventEmitter.emit('progress', progressInMilliseconds)
      } else {
        this.onEnd()
      }
    }, 1000)
  }
  beforeDelete() {
    if (this.incrementProgressTimer) {
      clearInterval(this.incrementProgressTimer)
    }
    window.removeEventListener('beforeunload', this.pause)
  }

  private onEnd() {
    if (this.store.state.audio.loop) {
      clearInterval(this.incrementProgressTimer)
      this.updateTrack(this.track)
    }
  }

  private addEventListenersForPlayer() {
    window.addEventListener('beforeunload', this.pause)
    window.addEventListener('beforeunload', () => {
      console.log('unload')
    })
    remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
      () => {
        if (remotePlayer.isPaused) {
          this.store.dispatch('audio/AUDIO_PAUSED', this.track)
        } else {
          this.store.dispatch('audio/AUDIO_PLAYING', this.track)
        }
      },
    )

    remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED,
      (event: any) => {
        if (event.value === 'PLAYING') {
          this.store.dispatch('audio/AUDIO_PLAYING', this.track)
        }
      },
    )

    // For debugging
    remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.ANY_CHANGE,
      (event: any) => {
        if (event.field !== 'currentTime') {
          console.log('any change', event.field, event)
        }
      },
    )
  }
}
