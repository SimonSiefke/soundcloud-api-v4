<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="chromeCastAvailable"
    id="chromecast" v-html="castButton"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IdleComponent from 'vue-idle-component'

@Component({
  name: 'ChromecastWrapper',
})
export default class ChromecastWrapper extends Vue {
  /*********
   * Data *
   *********/
  chromeCastAvailable: boolean | null = null
  castButton =
    '<button is="google-cast-button" aria-label="Chromecast" style="border:none;border-radius:50%;padding:10px;background:transparent;--disconnected-color:var(--controlbar-icon-disabled-color);--connected-color:var(--controlbar-icon-enabled-color);"></button>'

  /***********
   * Mounted *
   ***********/
  async mounted() {
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


<style lang="stylus" src="./style.global.styl">
</style>
