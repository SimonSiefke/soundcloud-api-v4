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
  name: 'BasicTogglePlay',
})
export default class BasicToggleFullscreen extends Vue {
  /********
   * Props *
   *********/
  @Prop({ required: true, type: Object })
  track!: Track

  /***********
   * Methods *
   ***********/
  @Action('player/togglePlay') togglePlay!: () => void
}
</script>

<style lang="stylus" scoped src="./style.scoped.styl">
</style>
