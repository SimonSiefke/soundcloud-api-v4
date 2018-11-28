<template>
  <!-- <Layout/> -->
  <router-view/>
</template>

<script lang="ts">
import Layout from '@/Layouts/Layout.vue'
import { applyTheme } from '@/styleUtils/loadTheme'
const loadFonts = () =>
  import(/* webpackChunkName: 'UTIL__loadFonts' */ '@/styleUtils/loadFonts')

export default {
  name: 'App',
  components: {
    Layout,
  },
  created() {
    loadFonts()
    applyTheme('blue')
  },
}
</script>

<style lang="stylus" scoped>
</style>
