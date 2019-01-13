<template>
  <div class="layout--youtube">
    <div class="video-wrapper">
      <img src="//source.unsplash.com/random" alt="" style="max-width:100%">
    </div>
    <div class="tracks">
    <BasicTrackList :tracks="tracks"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BasicTrackList from '@/components/basic/BasicTrackList/BasicTrackList.vue'
import tracks from './tracks.json'
// const tracks = []

export default Vue.extend({
  components: {
    BasicTrackList,
  },
  data() {
    return {
      tracks,
    }
  },
})
</script>

<style lang="stylus" scoped>
.layout--youtube
  display grid
  // grid-template-columns repeat(auto-fit, minmax(200px, 1fr))
</style>
