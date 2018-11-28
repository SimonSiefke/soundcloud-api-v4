<template>
  <div
    id="play"
    @click="togglePlay(track)"
    @keydown.enter="togglePlay(track)">

    <svg
      v-show="track && track.audioState==='PLAYING'"
      role="img"
      width="32"
      height="32"
      viewBox="0 0 32 32">
      <title>pause</title>
      <path d="M4 4h10v24h-10zM18 4h10v24h-10z"/>
    </svg>

    <svg
      v-show="track && track.audioState==='PAUSED'"
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
import { Action } from 'vuex-class'
import { Track } from '@/types'

@Component({
  name: 'BasicToggleFullscreen',
})
export default class BasicToggleFullscreen extends Vue {
  /********
   * Props *
   *********/
  @Prop() private track!: Track

  /***********
   * Methods *
   ***********/
  @Action('player/togglePlay') private togglePlay!: () => void
}
</script>

<style lang="stylus" scoped>
div
  position fixed
  z-index 4
  display flex
  justify-content center
  width 55px
  right 22.5px
  bottom 22.5px
  height 55px
  border-radius 50%
  background var(--controlbar-icon-background)
  align-items center

  svg
    fill var(--controlbar-icon-color)
</style>
