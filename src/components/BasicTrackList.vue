<!--// <template functional >
  //   <div>
    //     <template v-for="(track, index) in props.tracks">
      //       <basic-track-list-card
//         :track="track"
//         :active="index === (props.currentTrack && props.currentTrack.index)"
//         :key="track.id" />
      //     </template>
    //   </div>
  // </template>-->


<script lang="ts">
import Vue, { CreateElement } from 'vue'
import BasicTrackListCard from '@/components/BasicTrackListCard.vue'

export default Vue.extend({
  name: 'BasicTrackList',
  functional: true,
  props: ['tracks', 'currentTrack'],
  render(h: CreateElement, { props }) {
    return props.tracks.map((track: any, index: number) =>
      h(BasicTrackListCard, {
        props: {
          track,
          active: index === (props.currentTrack && props.currentTrack.index),
        },
      }),
    )
  },
})
</script>

<style scoped>
div {
  /* height: 90vh; */
  /* overflow-y: scroll; */
  /* overscroll-behavior: contain; */
}
</style>
