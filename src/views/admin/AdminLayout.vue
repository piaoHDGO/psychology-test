<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="admin-logo">
        <span class="logo-icon">🧠</span>
        <span class="logo-text">后台管理</span>
      </div>
      <nav class="admin-nav">
        <router-link to="/admin" class="nav-item" exact>
          <span class="nav-icon">📊</span>
          <span>仪表盘</span>
        </router-link>
        <router-link to="/admin/quizzes" class="nav-item">
          <span class="nav-icon">📝</span>
          <span>题库管理</span>
        </router-link>
        <router-link to="/admin/settings" class="nav-item">
          <span class="nav-icon">⚙️</span>
          <span>系统配置</span>
        </router-link>
      </nav>
    </div>

    <!-- 顶部栏 -->
    <div class="topbar">
      <div class="breadcrumb">
        <span class="current-page">{{ currentPageTitle }}</span>
      </div>
      <div class="topbar-right">
        <div class="user-info" @click="showUserMenu = !showUserMenu">
          <div class="user-avatar">{{ userInfo?.nickname?.[0] || '管' }}</div>
          <span class="user-name">{{ userInfo?.nickname || '管理员' }}</span>
          <span class="dropdown-icon">▼</span>
        </div>
        <div v-if="showUserMenu" class="user-menu">
          <div class="menu-item" @click="goHome">
            <span>🏠</span> 返回前台
          </div>
          <div class="menu-item" @click="handleLogout">
            <span>🚪</span> 退出登录
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const showUserMenu = ref(false)
const userInfo = ref(null)

const pageTitles = {
  '/admin': '仪表盘',
  '/admin/quizzes': '题库管理',
  '/admin/settings': '系统配置'
}

const currentPageTitle = computed(() => {
  return pageTitles[route.path] || '仪表盘'
})

onMounted(() => {
  const userStr = localStorage.getItem('admin_user')
  if (userStr) {
    try {
      userInfo.value = JSON.parse(userStr)
    } catch (e) {
      userInfo.value = { nickname: '管理员' }
    }
  }
})

function goHome() {
  router.push('/')
}

function handleLogout() {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  router.push('/admin/login')
}
</script>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;

  .admin-logo {
    padding: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.1);

    .logo-icon {
      font-size: 24px;
      margin-right: 10px;
    }

    .logo-text {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .admin-nav {
    padding: 20px 0;

    .nav-item {
      display: flex;
      align-items: center;
      padding: 14px 20px;
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      transition: all 0.2s;
      border-left: 3px solid transparent;

      .nav-icon {
        margin-right: 12px;
        font-size: 18px;
      }

      &:hover {
        background: rgba(255,255,255,0.05);
        color: white;
      }

      &.router-link-active {
        background: rgba(102, 126, 234, 0.2);
        color: white;
        border-left-color: #667eea;
      }
    }
  }
}

.topbar {
  position: fixed;
  top: 0;
  left: 220px;
  right: 0;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  z-index: 99;

  .breadcrumb {
    .current-page {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }

  .topbar-right {
    position: relative;

    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 8px;
      transition: background 0.2s;

      &:hover {
        background: #f5f5f5;
      }

      .user-avatar {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        font-weight: 600;
        margin-right: 8px;
      }

      .user-name {
        font-size: 14px;
        color: #333;
        margin-right: 6px;
      }

      .dropdown-icon {
        font-size: 10px;
        color: #999;
      }
    }

    .user-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 8px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      min-width: 150px;
      overflow: hidden;

      .menu-item {
        padding: 12px 16px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background 0.2s;

        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
}

.main-content {
  flex: 1;
  margin-left: 220px;
  margin-top: 60px;
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 60px);
}
</style>
