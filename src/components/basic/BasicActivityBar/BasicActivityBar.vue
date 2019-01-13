<template>
 <ul role="toolbar" aria-label="Active View Switcher">
   <li v-for="item in items" :key="item.iconSrc" tabindex="0" :aria-label="item.title" :title="item.title" draggable="true">
     <!-- eslint-disable-next-line vue-a11y/anchor-has-content-->
     <!-- eslint-disable-next-line vue/no-v-html-->
     <a :title="item.title" :aria-label="item.title"  v-html="item.icon">
     </a>
   </li>
 </ul>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      items: [
        {
          icon: `<svg viewBox="0 0 16 16" style="transform:scale(0.75)" ><path fill="currentColor" d="M15.45,7L14,5.551V2c0-0.55-0.45-1-1-1h-1c-0.55,0-1,0.45-1,1v0.553L9,0.555C8.727,0.297,8.477,0,8,0S7.273,0.297,7,0.555  L0.55,7C0.238,7.325,0,7.562,0,8c0,0.563,0.432,1,1,1h1v6c0,0.55,0.45,1,1,1h3v-5c0-0.55,0.45-1,1-1h2c0.55,0,1,0.45,1,1v5h3  c0.55,0,1-0.45,1-1V9h1c0.568,0,1-0.437,1-1C16,7.562,15.762,7.325,15.45,7z"/></svg>`,
          title: 'Home',
        },
        {
          icon: `<svg  viewBox="0 0 32 32">
<path d='M19.23 4.095c-4.842 0-8.769 3.928-8.769 8.771 0 1.781.539 3.43 1.449 4.815 0 0-5.482 5.455-7.102 7.102-1.621 1.646 1.001 4.071 2.602 2.409 1.602-1.659 7.006-7.005 7.006-7.005a8.726 8.726 0 0 0 4.814 1.45 8.773 8.773 0 0 0 8.772-8.771c.001-4.844-3.927-8.771-8.772-8.771zm0 15.035a6.265 6.265 0 1 1 0-12.529 6.264 6.264 0 1 1 0 12.529z' fill='currentColor'/></svg>`,
          title: 'Search (Ctrl+Shift+F)',
        },
        {
          icon: `<svg viewBox='0 0 60 60' style="transform:scale(0.75)">
<path d='M12.9 47.1H30V60H0V0h25.7v12.9H12.9v34.2zm4.2-4.2h25.7V17.1H17.1v25.8zM30 0v12.9h8.6V8.6h12.9v12.9h-4.3V30H60V0H30zm17.1 47.1H34.3V60H60V34.3H47.1v12.8z' fill='currentColor'/>
</svg>
`,
          title: 'Extensions (Ctrl+Shift+X)',
        },
      ],
    }
  },
})
</script>

<style lang="stylus" scoped src="./style.global.styl" >
</style>
