<template>
  <div
    id="play"
    tabindex="0"
    @click="togglePlay()"
    @keydown.enter="togglePlay()"
    >

    <svg
      v-show="state==='playing'"
      role="img"
      width="32"
      height="32"
      viewBox="0 0 32 32">
      <title>pause</title>
      <path d="M4 4h10v24h-10zM18 4h10v24h-10z"/>
    </svg>

    <svg
      v-show="state==='paused'"
      role="img"
      alt="play"
      width="32"
      height="32"
      viewBox="0 0 32 32">
      <title>play</title>
      <path d="M6 4l20 12-20 12z"/>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'BasicTogglePlay',
})
export default class BasicToggleFullscreen extends Vue {
  hasCalledPlay = false
  hasCalledPause = false
  /********
   * Props *
   *********/
  @Prop({ required: true, type: String })
  state!: 'playing' | 'paused' | 'loading'
  @Prop({ required: true, type: Function })
  play!: () => void
  @Prop({ required: true, type: Function })
  pause!: () => void

  async playTrack() {
    if (!this.hasCalledPlay) {
      this.hasCalledPlay = true
      await this.play()
      this.hasCalledPlay = false
    }
  }

  async pauseTrack() {
    if (!this.hasCalledPause) {
      this.hasCalledPause = true
      await this.pause()
      this.hasCalledPause = false
    }
  }

  togglePlay() {
    if (this.state === 'playing') {
      this.pauseTrack()
    } else if (this.state === 'paused') {
      this.playTrack()
    }
  }
}
</script>

<style lang="stylus" scoped src="./style.scoped.styl">
</style>
