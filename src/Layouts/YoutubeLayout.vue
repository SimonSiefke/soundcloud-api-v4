<template>
  <div class="layout--youtube">
   <div v-for="video in videos" :key="video.id.videoId">
      <iframe :src="`https://www.youtube.com/embed/${video.id.videoId}?modestbranding=1&rel=0`" frameborder="0" allowfullscreen />
   </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { loadGAPIScript } from './gapi'

export default Vue.extend({
  data() {
    return {
      videos: [],
    }
  },
  async mounted() {
    const YOUTUBE_API_KEY = 'AIzaSyDSF3LmIZdMr2sWLnHThQ3cYvhoZN7_MJk'
    await loadGAPIScript()
    // @ts-ignore
    const request = gapi.client.youtube.search.list({
      part: 'snippet',
      type: 'video',
      q: encodeURIComponent('odesza').replace(/%20/g, '+'),
      maxResults: 3,
      order: 'viewCount',
      publishedAfter: '2015-01-01T00:00:00Z',
      auth: YOUTUBE_API_KEY,
    })
    request.execute((response: any) => {
      this.videos = response.result.items
    })
  },
})
</script>
