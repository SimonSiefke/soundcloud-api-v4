import { Track } from '@/types'

export function updateMediaSession(
  { dispatch }: { dispatch: Function },
  track: Track,
) {
  if ('mediaSession' in navigator) {
    console.log('set up media session')

    // @ts-ignore
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.name,
      artist: track.userName,
      artwork: [
        {
          src: track.cover || 'https://dummyimage.com/300x300',
          sizes: '300x300',
          type: 'image/jpg',
        },
      ],
    })

    // @ts-ignore
    navigator.mediaSession.setActionHandler('play', () => {
      console.log('media session play')
      dispatch('togglePlay')
    })
    // @ts-ignore
    navigator.mediaSession.setActionHandler('pause', () => {
      console.log('media session pause')
      dispatch('togglePlay')
    })
    // @ts-ignore
    navigator.mediaSession.setActionHandler('previoustrack', () => {})

    // @ts-ignore
    navigator.mediaSession.setActionHandler('nexttrack', () => {})
  }
}
