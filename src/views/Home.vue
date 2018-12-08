<template>
  <home-layout />
</template>

<script lang="ts">
import HomeLayout from '@/Layouts/HomeLayout.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  components: {
    HomeLayout,
  },
})
</script>
