import { AudioPlayer, audioState } from '@/store/modules/audioModule/types'
import { Track } from '@/types'
// @ts-ignore
import * as Mitt from 'mitt/dist/mitt.umd'
import {
  remotePlayer,
  remotePlayerController,
} from '@/store/modules/audioModule/audioPlayers/ChromeCastPlayerWrapper'

const castSession = cast.framework.CastContext.getInstance().getCurrentSession()

const SOUNDCLOUD_CLIENT_ID = process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID

export class ChromeCastPlayer implements AudioPlayer {
  private castSession: any
  private incrementProgressTimer: any
  private store: any
  // @ts-ignore
  private lastTrack: Track | null
  public progressEventEmitter = new Mitt()

  constructor(store: any) {
    this.store = store
    this.lastTrack = null
    this.addEventListenersForPlayer()
  }

  public play(track: Track) {
    if (remotePlayer.isPaused) {
      remotePlayerController.playOrPause()
    } else {
      throw new Error('chromecast cannot play')
    }
    this.store.dispatch('audio/AUDIO_PLAYING', track)
    this.setUpProgressTimer()
  }
  public pause(track: Track) {
    if (!remotePlayer.isPaused && remotePlayer.canPause) {
      remotePlayerController.playOrPause()
    } else {
      throw new Error('chromecast cannot pause')
    }
    this.store.dispatch('audio/AUDIO_PAUSED', track)
    clearInterval(this.incrementProgressTimer)
  }
  public stop(track: Track) {
    remotePlayerController.stop()
    this.store.dispatch('audio/AUDIO_STOPPED', track)
    this.progressEventEmitter.emit('progress', 0)
    clearInterval(this.incrementProgressTimer)
  }
  // eslint-disable-next-line
  public setTime(time: number) {
    remotePlayer.currentTime = time
    remotePlayerController.seek()
  }
  public async updateTrack(oldTrack: Track | null, newTrack: Track) {
    if (!castSession) {
      console.warn('no castsession')
      return
    }
    console.log(oldTrack, newTrack)
    this.lastTrack = newTrack
    const audioUrl = `https://api.soundcloud.com/tracks/${
      newTrack.id
    }/stream?client_id=${SOUNDCLOUD_CLIENT_ID}`

    const mediaInfo = new chrome.cast.media.MediaInfo(audioUrl, 'audio/mp3')

    const request = new chrome.cast.media.LoadRequest(mediaInfo)

    await castSession.loadMedia(request)

    remotePlayer.volumeLevel = 0.1
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

  private onEnd() {
    console.log('end')
    // @ts-ignore
    if (this.store.state.audio.loop) {
      clearInterval(this.incrementProgressTimer)
      // @ts-ignore
      this.updateTrack(this.lastTrack, this.lastTrack)
    }
  }

  private addEventListenersForPlayer() {
    remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
      () => {
        if (remotePlayer.isPaused) {
          this.store.dispatch('audio/AUDIO_PAUSED', this.lastTrack)
        } else {
          this.store.dispatch('audio/AUDIO_PLAYING', this.lastTrack)
        }
      },
    )
  }
}
