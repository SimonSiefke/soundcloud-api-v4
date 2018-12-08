<template>
  <!-- we need a wrapper that has the full width, inside is the actual progress bar -->
  <div class="progress-wrapper">
    <div
      :style="{width: `${progressPercent}%`}"
      class="progress"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { player } from '@/store/modules/audioModule/state'
import { AudioPlayer } from '@/store/modules/audioModule/types'
import { Track } from '@/types'

@Component({
  name: 'BasicProgressBar',
})
export default class BasicProgressBar extends Vue {
  /*********
   * Data *
   ********/
  private progressPercent = 0

  /************
   * Computed *
   ************/
  @Getter('tracks/currentTrack') private currentTrack!: Track

  private get player() {
    return player.player
  }

  /************
   * Watchers *
   ************/
  @Watch('player', { immediate: true })
  private onPlayerChanged(newPlayer: AudioPlayer) {
    newPlayer.progressEventEmitter.on('progress', this.updateProgressPercent)
  }

  /***********
   * Methods *
   ***********/
  private beforeDestroy() {
    if (
      this.player &&
      this.player.progressEventEmitter &&
      this.player.progressEventEmitter.removeListener
    ) {
      this.player.progressEventEmitter.removeListener(
        this.updateProgressPercent,
      )
    }
  }

  private updateProgressPercent(progressInMilliseconds: number) {
    const trackDurationInMilliseconds = this.currentTrack.duration
    this.progressPercent =
      (progressInMilliseconds * 100000) / trackDurationInMilliseconds
  }
}
</script>

<style lang="stylus" scoped>
.progress-wrapper
  position absolute
  width 100%
  bottom 0
  height 2px

.progress
  height 100%
  background var(--progressbar-background)
</style>
