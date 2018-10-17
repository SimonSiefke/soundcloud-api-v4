import { AudioPlayer } from '@/store/modules/audioModule/types'
import { Track } from '@/types'
// @ts-ignore
import * as Mitt from 'mitt/dist/mitt.umd'

const SOUNDCLOUD_CLIENT_ID = process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID
let AudioFactory: typeof import('./AudioFactory').default | undefined

export class LocalDevicePlayer implements AudioPlayer {
  private player: any
  private store: any
  public progressEventEmitter = new Mitt()

  constructor(store: any) {
    this.store = store
  }

  public play(track: Track) {
    console.log('play')
    console.log(this.store.dispatch)
    this.player.play()
    this.store.dispatch('audio/AUDIO_PLAYING', track)
  }
  public pause(track: Track) {
    this.player.pause()
    this.store.dispatch('audio/AUDIO_PAUSED', track)
  }
  public stop(track: Track) {
    this.player.pause()
    this.player.currentTime = 0
    this.store.dispatch('audio/AUDIO_STOPPED', track)
  }
  setTime(time: number) {
    this.player.currentTime = time
  }
  public async updateTrack(oldTrack: Track | null, newTrack: Track) {
    if (oldTrack) {
      this.pause(oldTrack)
    }
    try {
      if (AudioFactory && AudioFactory.getItem(newTrack.id)) {
        this.player = AudioFactory.getItem(newTrack.id)
      } else {
        // @ts-ignore
        const audioUrl = `https://api.soundcloud.com/tracks/${
          newTrack.id
        }/stream?client_id=${SOUNDCLOUD_CLIENT_ID}`

        const urlPromise = fetch(audioUrl).then(res => res.url)
        const AudioFactoryPromise = import(/* webpackChunkName: 'audioPlayers__localDevicePlayer__AudioFactory' */ './AudioFactory')
        const [url, { default: _AudioFactory }] = await Promise.all([
          urlPromise,
          AudioFactoryPromise,
        ])
        AudioFactory = _AudioFactory
        this.player = AudioFactory.createAudioElement(url, newTrack.id)
      }

      this.addEventListenersForPlayer(newTrack)
      this.play(newTrack)
    } catch (error) {
      if (error.status === 404) {
        // @ts-ignore
      }
      console.warn(error)
      alert('something went wrong')
    }
  }

  public beforeDelete(oldTrack: Track | null) {
    console.log('local before delete', oldTrack)
    if (this.player) {
      this.player.pause()
    }
    this.player.unbindAll()
    this.player = null
  }

  private addEventListenersForPlayer(track: Track) {
    this.player.addEventListener('ended', () => {
      // @ts-ignore
      if (this.store.state.audio.loop) {
        this.setTime(0)
        this.play(track)
      }
    })
    this.player.addEventListener('timeupdate', () => {
      const progressInMilliseconds = this.player.currentTime
      this.progressEventEmitter.emit('progress', progressInMilliseconds)
    })
  }
}
