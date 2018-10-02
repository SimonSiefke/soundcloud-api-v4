<template >
  <div>
    <BasicSearchBar />
    <!-- using tabindex -1 to not focus the main element but the elements inside of it -->
    <main tabindex="-1">
      <BasicTrackList
        :tracks="tracks"
        :current-track="currentTrack"
      />
    </main>
    <footer>
      <chromecast-wrapper />
      <BasicNavigation :track="currentTrack" />
      <BasicToggleFullscreen :track="currentTrack" />
    </footer>
  </div>
</template>

<script lang="ts" >
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import BasicTrackList from '@/components/BasicTrackList.vue'
import BasicSearchBar from '@/components/BasicSearchBar.vue'
import SimpleBar from 'simplebar'

const loadFonts = () => import(/* webpackChunkName: 'loadFonts' */ '@/loadFonts')

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
    // setTimeout(() => {
    //   const el = new SimpleBar(document.querySelector('main'), {
    //     autoHide: false,
    //     minHeight: 150,
    //   })
    // }, 2500)
  },
  created() {
    this.getTracks()
    loadFonts()
  },
  methods: {
    ...mapActions('tracks', ['getTracks']),
    ...mapActions('player', ['togglePlay']),
  },

})
</script>

<style lang="stylus" scoped>
main
  overflow-y auto
  flex 1
</style>
