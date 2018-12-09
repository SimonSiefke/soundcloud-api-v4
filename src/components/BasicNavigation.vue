<template>
  <nav>
    <BasicProgressBar />
  </nav>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BasicProgressBar from '@/components/BasicProgressBar.vue'

@Component({
  name: 'BasicNavigation',
  components: {
    BasicProgressBar,
  },
})
export default class BasicNavigation extends Vue {}
</script>

<style lang="stylus" scoped>
nav
  background var(--controlbar-background)
  box-sizing border-box
  display flex
  height var(--navigation-height)
  width 100%
</style>
