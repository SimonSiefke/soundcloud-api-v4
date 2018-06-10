<template >
  <div>
    <BasicSearchBar />
    <BasicTrackList :tracks="tracks" :playingIndex="playingIndex" />
    <BasicNavigation/>
    <BasicToggleFullscreen />
  </div>
</template>

<script lang="ts" >
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import BasicTrackList from '@/components/BasicTrackList.vue'
import BasicSearchBar from '@/components/BasicSearchBar.vue'

const BasicNavigation = () => import(/* webpackChunkName: 'navigation' */ '@/components/BasicNavigation.vue')
const BasicToggleFullscreen = () => import(/* webpackChunkName: 'navigation' */ '@/components/BasicToggleFullscreen.vue')

export default Vue.extend({
  name: 'Layout',
  components: {
    BasicTrackList,
    BasicSearchBar,
    BasicNavigation,
    BasicToggleFullscreen,
  },
  created() {
    this.getTracks()
  },
  methods: {
    ...mapActions('tracks', ['getTracks']),
    ...mapActions('player', ['togglePlay']),
  },
  computed: {
    ...mapState('tracks', ['tracks', 'playingIndex']),

  },
})
</script>
