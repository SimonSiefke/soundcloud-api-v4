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
      v-show="track && (['IDLE', 'PAUSED'].includes(track.audioState))"
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
  @Prop() track!: Track

  /***********
   * Methods *
   ***********/
  @Action('player/togglePlay') togglePlay!: () => void
}
</script>

<style lang="stylus" scoped>
div
  align-items center
  background var(--controlbar-icon-enabled-background)
  border-radius 50%
  bottom 22.5px
  display flex
  height 55px
  justify-content center
  position fixed
  right 22.5px
  width 55px
  z-index 4

  svg
    fill var(--controlbar-icon-enabled-color)
</style>
