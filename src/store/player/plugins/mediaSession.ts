import { Track } from '@/types'

export function updateMediaSession(
  { dispatch }: { dispatch: any },
  track: Track,
) {
  console.log('set up media session')

  // @ts-ignore
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.name,
    artist: track.userName,
    artwork: [
      {
        src: 'https://dummyimage.com/96x96',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/128x128',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/192x192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/256x256',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/384x384',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/512x512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  })

  // @ts-ignore
  navigator.mediaSession.setActionHandler('play', () => {
    console.log('media session play')
    dispatch('play', track)
  })
  // @ts-ignore
  navigator.mediaSession.setActionHandler('pause', () => {
    console.log('media session pause')
    dispatch('pause', track)
  })
}
