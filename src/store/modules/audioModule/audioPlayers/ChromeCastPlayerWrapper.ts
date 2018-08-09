import store from '@/store'

cast.framework.CastContext.getInstance().setOptions({
  receiverApplicationId: '4F8B3483',
})

export const remotePlayer = new cast.framework.RemotePlayer()
export const remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer)

remotePlayerController.addEventListener(
  cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
  async () => {
    // TODO: update store and player if true or false
    if (!remotePlayer.isConnected) {
      console.log('chromecast connection lost')
      const {
        LocalDevicePlayer,
      } = await import(/* webpackChunkName: 'audio-player-local-device' */ '@/store/modules/audioModule/audioPlayers/LocalDevicePlayer')

      store.dispatch('audio/SET_AUDIO_PLAYER', new LocalDevicePlayer(store))
    } else {
      const castSession = cast.framework.CastContext.getInstance().getCurrentSession()
      console.log('chromecast now ready 2 play')
      // const {
      //   ChromeCastPlayer,
      // } = await import(/* webpackChunkName: 'audio-player-chromecast' */ '@/store/modules/audioModule/audioPlayers/ChromeCastPlayer')
      // store.dispatch('audio/SET_AUDIO_PLAYER', new ChromeCastPlayer())

      console.log('connection changed')

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
