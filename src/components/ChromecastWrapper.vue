<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="chromeCastAvailable"
    id="chromecast" v-html="castButton"
    >
  </div>
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
    '<button is="google-cast-button" aria-label="Chromecast" style="border:none;border-radius:50%;padding:10px;background:transparent;--disconnected-color:var(--controlbar-icon-disabled-color);--connected-color:var(--controlbar-icon-enabled-color);"></button>'

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
    ;(document.head as HTMLHeadElement).appendChild(chromecastSdkScript)
  }
}
</script>


<style lang="stylus">
html[data-audio-player='chromecast'] #chromecast
  background var(--controlbar-icon-enabled-background)

#chromecast
  background var(--controlbar-icon-disabled-background)
  border-radius 50%
  bottom 22.5px
  display flex
  height 55px
  justify-content center
  left 22.5px
  position fixed
  width 55px
  z-index 4
</style>
