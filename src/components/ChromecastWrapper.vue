<template>
  <div
    v-if="chromeCastAvailable"
    v-html="castButton" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import IdleComponent from 'vue-idle-component'

interface Data {
  chromeCastAvailable: null | boolean
  castButton: string
}

@Component({
  name: 'ChromecastWrapper',
})
export default class ChromecastWrapper extends Vue {
  /*********
   * Data *
   *********/
  private chromeCastAvailable: boolean | null = null
  private castButton =
    '<button is="google-cast-button" aria-label="Chromecast"></button>'

  /***********
   * Mounted *
   ***********/
  private async mounted() {
    // @ts-ignore
    // eslint-disable-next-line
    window.__onGCastApiAvailable = async (isAvailable:boolean) => {
      this.chromeCastAvailable = isAvailable
      if (isAvailable) {
        console.log('cast is available')
        IdleComponent(
          import(/* webpackChunkName: 'AUDIO_PLAYER__chromecast-wrapper' */ '@/store/modules/audioModule/audioPlayers/ChromeCastPlayer/ChromeCastPlayerWrapper.ts'),
        )
      } else {
        console.log('cast not isAvailable')
      }
    }
    // lazyload the chromecast sdk script
    const chromecastSdkScript = document.createElement('script')
    chromecastSdkScript.src =
      'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'
    document.head.appendChild(chromecastSdkScript)
  }
}
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
  background var(--controlbar-icon-background)
</style>
