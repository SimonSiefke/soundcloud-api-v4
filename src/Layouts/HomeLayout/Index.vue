<template >
  <div class="layout--mobile">
    <header>
      <BasicSearchBar />
    </header>
    <main>
      <BasicScrollContainer>
        <BasicTrackList :tracks="tracks" :current-track="currentTrack" />
      </BasicScrollContainer>
    </main>
    <footer>
      <ChromecastWrapper />
      <BasicNavigation />
      <BasicTogglePlay :track="currentTrack" />
      <BasicAddToHomeScreen/>
    </footer>
  </div>
</template>

<script lang="ts" >
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import BasicTrackList from '@/components/basic/BasicTrackList/Index.vue'
import BasicSearchBar from '@/components/basic/BasicSearchBar/Index.vue'
import { Track } from '@/types'
import IdleComponent from 'vue-idle-component'

const BasicScrollContainer = () =>
  import(/* webpackChunkName: 'COMPONENT__scroll-container' */ '@/components/basic/BasicScrollContainer/Index.vue')

const BasicNavigation = () =>
  import(/* webpackChunkName: 'COMPONENT__navigation' */ '@/components/basic/BasicNavigation/Index.vue')
const BasicTogglePlay = () =>
  import(/* webpackChunkName: 'COMPONENT__navigation' */ '@/components/basic/BasicTogglePlay/Index.vue')

const ChromecastWrapper = () =>
  import(/* webpackChunkName: 'COMPONENT__chromecast-wrapper' */ '@/components/basic/ChromecastWrapper/Index.vue')

const BasicAddToHomeScreen = () =>
  import(/* webpackChunkName: 'COMPONENT__add-to-homescreen' */ '@/components/basic/BasicAddToHomeScreen/Index.vue')

@Component({
  name: 'Layout',
  components: {
    BasicTrackList,
    BasicSearchBar,
    BasicNavigation,
    BasicTogglePlay,
    BasicScrollContainer,
    BasicAddToHomeScreen: IdleComponent(BasicAddToHomeScreen),
    ChromecastWrapper: IdleComponent(ChromecastWrapper),
  },
})
export default class Layout extends Vue {
  // Data
  chromeCastAvailable = null

  // Computed
  @State('progress', {
    namespace: 'player',
  })
  private progress!: number
  @State('playingIndex', {
    namespace: 'tracks',
  })
  private playingIndex!: number
  @State('tracks', {
    namespace: 'tracks',
  })
  private tracks!: Track[]
  @Getter('tracks/currentTrack') private currentTrack!: Track

  /***********
   * Created *
   ***********/
  created() {
    // loadFonts()
    this.getTracks()
  }

  /***********
   * Mounted *
   ***********/
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
  }

  /***********
   * Methods *
   ***********/
  @Action('tracks/getTracks') getTracks!: () => void

  @Action('player/togglePlay') togglePlay!: () => void
}
</script>

<style lang="stylus" scoped src="./style.scoped.styl">
</style>
