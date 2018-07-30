<template>
  <section>
    <div v-html="castButton">
      </div>
      <button id="pause2">play / pause</button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
  mounted() {
    // initialize chromecast
    console.log('cast is isAvailable')
    cast.framework.CastContext.getInstance().setOptions({
      receiverApplicationId: '4F8B3483',
    })

    const remotePlayer = new cast.framework.RemotePlayer()
    const remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer)

    pause2.addEventListener('click', () => {
      console.log('click')
      if (remotePlayer.canPause) {
        console.log('pause')
        remotePlayerController.playOrPause()
      }
      console.log(remotePlayer)
    })

    remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
      () => {
        if (!remotePlayer.isConnected) {
          alert('disconnected')
          return
        }
        console.log('connection changed')
        const castSession = cast.framework.CastContext.getInstance().getCurrentSession()

        console.log(castSession)

        // setInterval(() => console.log(cast.framework.CastContext.getInstance().getCurrentSession()), 1000)

        // when connected to remote device
        if (castSession) {
          // play the audio
          const mediaInfo = new chrome.cast.media.MediaInfo(
            'http://www.jamesreams.com/wp-content/uploads/2013/01/Born-to-Roll-clip.mp3',
            'audio/mp3',
          )

          const request = new chrome.cast.media.LoadRequest(mediaInfo)

          castSession.loadMedia(request).then(
            () => {
              remotePlayer.volumeLevel = 0.1
              remotePlayerController.setVolumeLevel()
              // console.log('noclick')
              // remotePlayerController.playOrPause()
              // console.log(remotePlayer)
              // setInterval(() => {
              //   remotePlayerController.playOrPause()

              // }, 1000);

              console.log('loading succeeded')
            },
            (errorCode) => {
              this.playerState = PLAYER_STATE.ERROR
              console.log('Remote media load error: ')
            },
          )
        }
      },
    )

    // remotePlayerController.addEventListener(
    //   cast.framework.RemotePlayerEventType.ANY_CHANGE,
    //   (event) => {
    //     if (event.field !== 'currentTime') {
    //       console.log('any change', event.field)
    //     }
    //   },
    // )
  },
  data() {
    return {
      castButton: '<button is="google-cast-button"></button>',
    }
  },
})
</script>

<style lang="stylus" scoped>
div
  position fixed
  z-index 4
  display flex
  justify-content center
  width 55px
  bottom 22.5px
  left 22.5px
  height 55px
  border-radius 50%
  background dodgerblue
</style>
