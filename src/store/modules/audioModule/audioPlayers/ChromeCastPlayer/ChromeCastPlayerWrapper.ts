import store from '@/store'
import { player } from '@/store/modules/audioModule/state'

cast.framework.CastContext.getInstance().setOptions({
  receiverApplicationId: '4F8B3483',
})

export const remotePlayer = new cast.framework.RemotePlayer()
remotePlayer.volumeLevel = 0.2

export const remotePlayerController = new cast.framework.RemotePlayerController(
  remotePlayer,
)

console.log('chrome player wrapper initialized')
remotePlayerController.addEventListener(
  cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
  async () => {
    console.log('connection changed')

    // TODO: update store and player if true or false
    if (!remotePlayer.isConnected) {
      console.log('chromecast connection lost')
      const {
        LocalDevicePlayer,
      } = await import(/* webpackChunkName: 'audio-player-local-device' */ '@/store/modules/audioModule/audioPlayers/LocalDevicePlayer/LocalDevicePlayer')

      store.dispatch('audio/SET_AUDIO_PLAYER', new LocalDevicePlayer(store))
    } else {
      const castSession = cast.framework.CastContext.getInstance().getCurrentSession()
      console.log('chromecast now ready 2 play')

      const {
        ChromeCastPlayer,
      } = await import(/* webpackChunkName: 'audio-player-chromecast' */ '@/store/modules/audioModule/audioPlayers/ChromeCastPlayer/ChromeCastPlayer')
      if (player.player !== ChromeCastPlayer.instance) {
        console.log(
          'player is diffeerent',
          player.player,
          ChromeCastPlayer.instance,
        )
        const chromeCastPlayer = new ChromeCastPlayer(store)
        store.dispatch('audio/SET_AUDIO_PLAYER', chromeCastPlayer)

        window.addEventListener('beforeunload', () => {
          chromeCastPlayer.pause()
        })
      }

      console.log('ses', castSession)
    }

    // when connected to remote device
    // this.castSession = castSession
    // if (castSession) {
    //   console.log('make a cast session')
    // // play the audio

    // castSession.loadMedia(request).then(
    //   () => {
    //     remotePlayer.volumeLevel = 0.1
    //     remotePlayerController.setVolumeLevel()
    //     console.log('loading succeeded')
    //   },
    //   (errorCode: any) => {
    //     // this.playerState = PLAYER_STATE.ERROR
    //     console.log('Remote media load error: ')
    //   },
    // )
    // }
  },
)
