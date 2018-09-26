<template>
  <nav>
    <basic-progress-bar />
  </nav>
</template>

<script>
import BasicProgressBar from '@/components/BasicProgressBar.vue'

export default {
  name: 'BasicNavigation',
  components: {
    BasicProgressBar,
  },
}
</script>

<style lang="stylus" scoped>
nav
  box-sizing border-box
  display flex
  width 100%
  height var(--navigation-height)
  background black
</style>
