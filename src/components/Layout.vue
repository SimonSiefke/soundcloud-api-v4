<template >
  <div>
    <chromecast-wrapper />
    <BasicSearchBar />
    <BasicTrackList
      :tracks="tracks"
      :current-track="currentTrack"
    />
    <BasicNavigation :track="currentTrack" />
    <BasicToggleFullscreen :track="currentTrack" />
  </div>
</template>

<script lang="ts" >
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import BasicTrackList from '@/components/BasicTrackList.vue'
import BasicSearchBar from '@/components/BasicSearchBar.vue'

const BasicNavigation = () => import(/* webpackChunkName: 'component-navigation' */ '@/components/BasicNavigation.vue')
const BasicToggleFullscreen = () => import(/* webpackChunkName: 'component-navigation' */ '@/components/BasicToggleFullscreen.vue')

const ChromecastWrapper = () => import(/* webpackChunkName: 'component-chromecast-wrapper' */ '@/components/ChromecastWrapper.vue')


export default Vue.extend({
  name: 'Layout',
  components: {
    BasicTrackList,
    BasicSearchBar,
    BasicNavigation,
    BasicToggleFullscreen,
    ChromecastWrapper,
  },
  data() {
    return {
      chromeCastAvailable: null,
    }
  },
  computed: {
    ...mapState('tracks', ['tracks', 'playingIndex']),
    ...mapState('player', ['progress']),
    ...mapGetters('tracks', ['currentTrack']),

  },
  mounted() {
    // @ts-ignore
    // eslint-disable-next-line
    window.__onGCastApiAvailable = (isAvailable:boolean) => {
      // @ts-ignore
      this.chromeCastAvailable = isAvailable
      console.log('init chrome cast')
      if (!isAvailable) {
        console.log('cast not isAvailable')
      }
    }
  },
  created() {
    this.getTracks()
  },
  methods: {
    ...mapActions('tracks', ['getTracks']),
    ...mapActions('player', ['togglePlay']),
  },

})
</script>
