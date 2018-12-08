<template>
  <youtube-layout />
</template>

<script lang="ts">
import Vue from 'vue'
import YoutubeLayout from '@/Layouts/YoutubeLayout.vue'

export default Vue.extend({
  name: 'Youtube',
  components: {
    YoutubeLayout,
  },
})
</script>
