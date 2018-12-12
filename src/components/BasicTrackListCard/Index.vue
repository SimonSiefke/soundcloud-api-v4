<!-- this component cannot be functional component yet because of https://github.com/vuejs/vue-loader/issues/1136 -->
<template>
  <!-- using tabindex 0 on the div to make it focusable via keyboard -->
  <div
    :class="{active: active}"
    class="track"
    tabindex="0"
    @click="togglePlay(track)"
    @keydown.enter="togglePlay(track)">
    <div class="image-container">
      <img
        v-if="track && track.cover"
        :src="track.cover"
        crossorigin="anonymous"
        alt="">
    </div>
    <div class="info-container">
      <span class="user-name">
        {{ track ? track.userName : '' }}
      </span>
      <p
        tabindex="-1"
        class="track-name">
        {{ track ? track.name : '' }}
      </p>
    </div>
    <div
      v-if="track && track.audioShouldBeState==='SHOULD_BE_PLAYING' && track.audioState!=='PLAYING'"
      class="loading"> loading </div>
    <div
      v-if="track && track.audioState==='PLAYING'"
      class="equalizer"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Track } from '@/types'

@Component({
  name: 'BasicTrackListCard',
})
export default class BasicTrackListCard extends Vue {
  /*********
   * Props *
   *********/
  @Prop({ default: null })
  private track!: Track

  @Prop({ required: true })
  private active!: boolean

  /***********
   * Mounted *
   ***********/
  mounted() {
    import(/* webpackChunkName: 'LAZY_STYLE__basic-track-list-card' */ './style.scoped.lazy.styl')
  }

  /***********
   * Methods *
   ***********/
  @Action('player/togglePlay') private togglePlay!: () => void
}
</script>

<style scoped lang="stylus" src="./style.scoped.styl">
</style>
