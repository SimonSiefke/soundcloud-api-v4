import VueAnalytics from 'vue-analytics'
import Vue from 'vue'

Vue.use(VueAnalytics, {
  id: 'UA-126880932-1',
  autoTracking: {
    exception: true,
  },
  debug: {
    enabled: process.env.NODE_ENV !== 'production',
    sendHitTask: process.env.NODE_ENV === 'production',
  },
})
