<template>
  <div
    id="play"
    @click="togglePlay(track)">
    <template v-if="track && track.audioState==='PLAYING'">
      <img
        src="@/assets/icons/pause.svg"
        alt="pause">
    </template>
    <template v-else-if="track && track.audioState==='PAUSED'">
      <img
        src="@/assets/icons/play.svg"
        alt="play">
    </template>
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
  @Prop()
  private track!: Track

  /***********
   * Methods *
   ***********/
  @Action('player/togglePlay')
  private togglePlay!: () => void
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
  background dodgerblue

  img
    width 44%
</style>
