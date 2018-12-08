<template>
  <div class="layout--youtube">
    ok
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { google } from 'googleapis'

export default Vue.extend({
  async mounted() {
    const google = require('googleapis')
    console.log(google)
    // import('googleapis').then(x => {
    //   console.log(x)
    // })
    // const service = google.youtube('v3')
    // const YOUTUBE_API_KEY = 'AIzaSyDSF3LmIZdMr2sWLnHThQ3cYvhoZN7_MJk'
    // const response = await service.search.list({
    //   part: 'snippet',
    //   type: 'video',
    //   q: encodeURIComponent('odesza').replace(/%20/g, '+'),
    //   maxResults: 3,
    //   order: 'viewCount',
    //   publishedAfter: '2015-01-01T00:00:00Z',
    //   auth: YOUTUBE_API_KEY,
    // })
    // console.log(response.data)
  },
})
</script>
