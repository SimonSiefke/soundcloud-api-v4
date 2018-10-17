import { AudioPlayer } from '@/store/modules/audioModule/types'
/* eslint-disable class-methods-use-this, no-empty-function */
// @ts-ignore
import * as Mitt from 'mitt/dist/mitt.umd'
import { Track } from '@/types'

export class NoPlayer implements AudioPlayer {
  public static instance: NoPlayer
  public progressEventEmitter = new Mitt()

  constructor() {
    if (NoPlayer.instance) {
      return NoPlayer.instance
    }
    NoPlayer.instance = this
  }
  public play() {
    console.error('null player cannot play track')
  }
  public pause() {
    console.error('null player cannot pause track')
  }
  public stop() {
    console.error('null player cannot stop track')
  }
  public setTime(time: number) {
    console.error('null player cannot set track')
  }
  public async updateTrack(newTrack: Track) {
    console.error('null player cannot update track')
  }
}
