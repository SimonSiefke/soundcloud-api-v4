<script lang="ts">
import Vue, { CreateElement } from 'vue'
import BasicTrackListCard from '@/components/basic/BasicTrackListCard/Index.vue'

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
