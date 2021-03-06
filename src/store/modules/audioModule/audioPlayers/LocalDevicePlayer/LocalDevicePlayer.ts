import { AudioPlayer } from '@/store/modules/audioModule/types'
import { Track } from '@/types'
// @ts-ignore
import * as Mitt from 'mitt/dist/mitt.umd'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

const SOUNDCLOUD_CLIENT_ID = process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID
let AudioFactory: typeof import('./AudioFactory').default | undefined

let controller = new AbortController()

export class LocalDevicePlayer implements AudioPlayer {
  private player: any
  private readonly store: any
  private track!: Track
  public readonly progressEventEmitter = new Mitt()

  constructor(store: any) {
    this.store = store
    this.onPlayerEnded = this.onPlayerEnded.bind(this)
    this.onPlayerTimeUpdate = this.onPlayerTimeUpdate.bind(this)
  }

  public play(track: Track = this.track) {
    this.track = track
    this.player.play()
    this.store.dispatch('audio/AUDIO_PLAYING', this.track)
  }
  public pause() {
    this.player.pause()
    this.store.dispatch('audio/AUDIO_PAUSED', this.track)
  }
  public stop() {
    this.player.pause()
    this.player.currentTime > 0 && (this.player.currentTime = 0)
    this.store.dispatch('audio/AUDIO_STOPPED', this.track)
  }
  setTime(time: number) {
    this.player.currentTime = time
  }
  public async updateTrack(newTrack: Track) {
    if (this.track) {
      this.pause()
    }
    try {
      if (AudioFactory && AudioFactory.getItem(newTrack.id)) {
        this.player = AudioFactory.getItem(newTrack.id)
      } else {
        controller.abort()
        controller = new AbortController()
        const audioUrl = `https://api.soundcloud.com/tracks/${
          newTrack.id
        }/stream?client_id=${SOUNDCLOUD_CLIENT_ID}`
        AudioFactory = (await import(/* webpackChunkName: 'AUDIO_PLAYER__audio-factory' */ './AudioFactory'))
          .default
        this.player = AudioFactory.createAudioElement(audioUrl, newTrack.id)
      }
      if (newTrack.audioShouldBeState === 'SHOULD_BE_PLAYING') {
        this.addEventListenersForPlayer()
        this.play(newTrack)
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.info('request was aborted')
      } else {
        // @ts-ignore
        console.warn(error)
        alert('something went wrong')
      }
    }
  }

  public beforeDelete() {
    if (this.player) {
      this.player.pause()
    }
    this.removeEventListenerForPlayer()
    this.player = null
  }

  private onPlayerEnded() {
    if (this.store.state.audio.loop) {
      this.setTime(0)
      this.play()
    }
  }

  private onPlayerTimeUpdate() {
    const progressInMilliseconds = this.player.currentTime
    this.progressEventEmitter.emit('progress', progressInMilliseconds)
  }

  private addEventListenersForPlayer() {
    this.player.addEventListener('ended', this.onPlayerEnded)
    this.player.addEventListener('timeupdate', this.onPlayerTimeUpdate)
  }
  private removeEventListenerForPlayer() {
    this.player.removeEventListener('ended', this.onPlayerEnded)
    this.player.removeEventListener('timeupdate', this.onPlayerTimeUpdate)
  }
}
