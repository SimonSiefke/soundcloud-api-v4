import { AudioPlayer } from '@/store/modules/audioModule/types'
import { Track } from '@/types'
import SoundCloudAudio from 'soundcloud-audio'
import rootStore from '@/store'
// @ts-ignore
import * as Mitt from 'mitt/dist/mitt.umd'

const SOUNDCLOUD_CLIENT_ID = process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID

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
    this.player.setTime(0)
    this.store.dispatch('audio/AUDIO_STOPPED', track)
  }
  setTime(time: number) {
    this.player.setTime(time)
  }
  public async updateTrack(oldTrack: Track | null, newTrack: Track) {
    // console.log('local')
    if (oldTrack) {
      this.pause(oldTrack)
    }
    try {
      // @ts-ignore
      const newPlayer = new SoundCloudAudio(SOUNDCLOUD_CLIENT_ID)
      const audioUrl = `https://api.soundcloud.com/tracks/${newTrack.id}`
      await new Promise((resolve, reject) => {
        console.log(audioUrl, SOUNDCLOUD_CLIENT_ID)
        newPlayer.resolve(audioUrl, resolve)
      })
      this.player = newPlayer
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
    if (oldTrack !== null) {
      this.player.pause()
    }
    this.player.unbindAll()
    this.player = null
  }

  private addEventListenersForPlayer(track: Track) {
    this.player.on('ended', () => {
      // @ts-ignore
      if (this.store.state.audio.loop) {
        this.setTime(0)
        this.play(track)
      }
    })
    this.player.on('timeupdate', () => {
      const progressInMilliseconds = this.player.audio.currentTime
      this.progressEventEmitter.emit('progress', progressInMilliseconds)
    })
  }
}
