<template>
<div >
  <BasicTogglePlay :track="'l'"/>
    <button @click="playing=!playing" @keydown.enter="playing=!playing">{{playing?'pause':'play'}}</button>
</div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import BasicTogglePlay from '@/components/basic/BasicTogglePlay/BasicTogglePlay.vue'

@Component({
  name: 'RadioHamburg',
  components: {
    BasicTogglePlay,
  },
})
export default class RadioHamburg extends Vue {
  /********
   * Data *
   ********/
  playing = false
  audio = document.createElement('audio')

  /************
   * Watchers *
   ************/
  @Watch('playing')
  async togglePlay(value) {
    if (value && this.audio.paused) {
      await this.audio.play()
    } else if (!value && !this.audio.paused) {
      await this.audio.pause()
    }
  }

  /***********
   * Mounted *
   ***********/
  async mounted() {
    this.audio.setAttribute('preload', 'none')
    this.audio.setAttribute('autoplay', '')
    this.audio.setAttribute('controls', '')
    this.audio.setAttribute(
      'src',
      `https://sec-radiohamburg.hoerradar.de/radiohamburg-live-mp3-192?nocache=${Math.random()}`,
    )
    this.audio.addEventListener('playing', () => (this.playing = true))
    this.audio.addEventListener('paused', () => (this.playing = false))
    ;(document.querySelector('div') as HTMLDivElement).insertBefore(
      this.audio,
      null,
    )
  }
}
</script>
