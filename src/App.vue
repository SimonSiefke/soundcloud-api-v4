<template>
  <Layout/>
</template>

<script lang="ts">
import Layout from '@/Layouts/Layout.vue'
import { applyTheme } from '@/styleUtils/loadTheme'

export default {
  name: 'App',
  components: {
    Layout,
  },
  created() {
    applyTheme('blue')
  },
}
</script>

<style lang="stylus" scoped>
</style>
