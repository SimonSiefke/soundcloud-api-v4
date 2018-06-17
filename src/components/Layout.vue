<template >
  <div>
    <BasicSearchBar />
    <BasicTrackList :tracks="tracks" :playingIndex="playingIndex" />
    <BasicNavigation :track="currentTrack" />
    <BasicToggleFullscreen :track="currentTrack" />
  </div>
</template>

<script lang="ts" >
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
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
  // provide() {
  //   const progress = {}

  //   Object.defineProperty(progress, 'value', {
  //     enumerable: true,
  //     get: () => this.progress,
  //   })

  //   return { progress }
  // },
  created() {
    this.getTracks()
  },
  methods: {
    ...mapActions('tracks', ['getTracks']),
    ...mapActions('player', ['togglePlay']),
  },
  computed: {
    ...mapState('tracks', ['tracks', 'playingIndex']),
    ...mapState('player', ['progress']),
    ...mapGetters('tracks', ['currentTrack']),

  },
})
</script>
