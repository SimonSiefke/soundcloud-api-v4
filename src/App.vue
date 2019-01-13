<template>
  <RouterView/>
</template>

<script lang="ts">
import { applyTheme } from '@/styleUtils/loadTheme'
import loadFonts from '@/styleUtils/loadFonts'

export default {
  name: 'App',
  async created() {
    loadFonts()
    applyTheme('blue')
    window.addEventListener('beforeinstallprompt', () => {
      console.log('before install prompt')
    })
  },
}
</script>
