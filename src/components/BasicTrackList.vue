<script lang="ts">
import Vue from 'vue'
import BasicTrackListCard from '@/components/BasicTrackListCard.vue'

export default Vue.extend({
  name: 'BasicTrackList',
  functional: true,
  props: {
    tracks: {
      type: Array,
      required: true,
    },
    playingIndex: {
      type: Number,
      required: true,
    },
  },
  render(h: any, { props }) {
    return props.tracks.map((track: any, index: number) => h(BasicTrackListCard, {
      props: {
        track,
        active: index === props.playingIndex,
      },
    }))
  },
})
</script>

<style scoped>
section {
  overflow: hidden;
}
</style>
