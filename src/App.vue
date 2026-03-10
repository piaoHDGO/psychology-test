<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 隐藏Vercel/Netlify等平台的水印
  document.body.classList.add('no-footer')
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
