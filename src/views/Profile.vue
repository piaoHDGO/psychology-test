<template>
  <div class="profile-page">
    <!-- 用户信息 -->
    <div class="profile-header gradient-bg">
      <div class="user-info">
        <div class="avatar">{{ userInfo?.nickname?.[0] || '游' }}</div>
        <div class="nickname">{{ userInfo?.nickname || '游客' }}</div>
        <div class="user-id">ID: {{ userInfo?.id || '888888' }}</div>
      </div>
    </div>

    <!-- 统计 -->
    <div class="stats-card">
      <div class="stat-item">
        <div class="stat-value">{{ testHistory.length }}</div>
        <div class="stat-label">测试次数</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ paidCount }}</div>
        <div class="stat-label">已购报告</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ uniqueTests }}</div>
        <div class="stat-label">测试类型</div>
      </div>
    </div>

    <!-- 测试历史 -->
    <div class="history-section">
      <div class="section-title">测试历史</div>

      <div v-if="testHistory.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <div class="empty-text">还没有测试记录</div>
        <button class="btn btn-primary" @click="goHome">开始测试</button>
      </div>

      <div v-else class="history-list">
        <div
          v-for="item in testHistory"
          :key="item.id"
          class="history-item"
          @click="viewResult(item.id)"
        >
          <div class="history-icon">
            {{ getIcon(item.quizCode) }}
          </div>
          <div class="history-info">
            <div class="history-name">{{ item.quizName }}</div>
            <div class="history-result">
              {{ item.resultType }} · {{ item.resultName }}
            </div>
            <div class="history-time">{{ formatTime(item.createdAt) }}</div>
          </div>
          <div class="history-status">
            <span v-if="item.isPaid" class="status-paid">已购买</span>
            <span v-else class="status-unpaid">未购买</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部Tab -->
    <div class="tab-bar">
      <div class="tab-item" @click="goHome">
        <div class="tab-icon">🏠</div>
        <div>首页</div>
      </div>
      <div class="tab-item active">
        <div class="tab-icon">📊</div>
        <div>我的测试</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const userInfo = ref(null)
const testHistory = ref([])

const paidCount = computed(() => {
  return testHistory.value.filter(r => r.isPaid).length
})

const uniqueTests = computed(() => {
  const codes = new Set(testHistory.value.map(r => r.quizCode))
  return codes.size
})

onMounted(() => {
  // 初始化用户store
  userStore.init()

  // 获取用户信息
  userInfo.value = userStore.userInfo || {
    id: '888888',
    nickname: '游客'
  }

  // 获取测试历史
  testHistory.value = userStore.testHistory
})

function getIcon(code) {
  const icons = {
    mbti: '🎯',
    age: '🧠',
    color: '🎨',
    star: '⭐'
  }
  return icons[code] || '📝'
}

function formatTime(timeStr) {
  const date = new Date(timeStr)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
  if (diff < 604800000) return Math.floor(diff / 86400000) + '天前'

  return date.toLocaleDateString('zh-CN')
}

function goHome() {
  router.push('/')
}

function viewResult(id) {
  router.push(`/result/${id}`)
}
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 70px;
}

.profile-header {
  padding: 40px 20px 30px;
  color: white;
  text-align: center;

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .nickname {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .user-id {
      font-size: 12px;
      opacity: 0.8;
    }
  }
}

.stats-card {
  display: flex;
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin: -20px 16px 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;

  .stat-item {
    flex: 1;
    text-align: center;

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #333;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      color: #999;
    }
  }

  .stat-divider {
    width: 1px;
    background: #f0f0f0;
    margin: 0 10px;
  }
}

.history-section {
  padding: 20px 16px;

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
    padding-left: 8px;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .empty-text {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
  }
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.98);
  }

  .history-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-right: 12px;
  }

  .history-info {
    flex: 1;
    min-width: 0;

    .history-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .history-result {
      font-size: 13px;
      color: #666;
      margin-bottom: 4px;
    }

    .history-time {
      font-size: 12px;
      color: #999;
    }
  }

  .history-status {
    font-size: 12px;

    .status-paid {
      color: #52c41a;
      background: #f6ffed;
      padding: 4px 10px;
      border-radius: 4px;
    }

    .status-unpaid {
      color: #ff6b6b;
      background: #fff0f0;
      padding: 4px 10px;
      border-radius: 4px;
    }
  }
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: white;
  border-top: 1px solid #f0f0f0;
  padding: 10px 0 20px;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03);

  .tab-item {
    flex: 1;
    text-align: center;
    color: #999;
    font-size: 12px;
    cursor: pointer;

    &.active {
      color: #667eea;
    }

    .tab-icon {
      font-size: 20px;
      margin-bottom: 4px;
    }
  }
}
</style>
