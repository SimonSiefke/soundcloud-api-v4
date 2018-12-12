<template>
  <HomeLayout />
</template>

<script lang="ts">
import HomeLayout from '@/Layouts/HomeLayout/Index.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  components: {
    HomeLayout,
  },
})
</script>
