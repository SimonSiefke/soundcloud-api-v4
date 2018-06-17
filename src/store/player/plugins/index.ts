import { Track } from '@/types'

export const hooks = {
  beforePause() {
    console.log('before pause')
  },
  afterPause() {
    console.log('after pause')
  },
  beforePlay() {},
  afterPlay() {},
  beforeNext() {},
  afterNext({ dispatch }: { dispatch: Function }, nextTrack: Track) {
    console.log('after next')
    if ('mediaSession' in navigator) {
      console.log('upadte media session')
      dispatch('updateMediaSession', nextTrack)
    }
  },
}
