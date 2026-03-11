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
import { useUserStore } from './stores/user'

const userStore = useUserStore()

onMounted(() => {
  // 隐藏Vercel/Netlify等平台的水印
  document.body.classList.add('no-footer')
  // 初始化用户数据（从localStorage恢复）
  userStore.init()
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
