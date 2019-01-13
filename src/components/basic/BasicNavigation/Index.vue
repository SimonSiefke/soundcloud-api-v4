<template>
  <nav>
    <BasicProgressBar />
  </nav>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BasicProgressBar from '@/components/basic/BasicProgressBar/BasicProgressBar.vue'

@Component({
  name: 'BasicNavigation',
  components: {
    BasicProgressBar,
  },
})
export default class BasicNavigation extends Vue {}
</script>

<style lang="stylus" scoped src="./style.scoped.styl">
</style>
