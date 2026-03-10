<template>
  <div class="home">
    <!-- 头部 -->
    <div class="home-header gradient-bg">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo-icon">🧠</div>
          <div class="title-group">
            <h1 class="title">心理测试大全</h1>
            <p class="subtitle">发现最真实的自己</p>
          </div>
        </div>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-num">50万+</span>
            <span class="stat-label">用户测试</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">10+</span>
            <span class="stat-label">专业测试</span>
          </div>
        </div>
      </div>
      <!-- 装饰 -->
      <div class="header-decoration">
        <span class="deco-circle"></span>
        <span class="deco-circle"></span>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">热门推荐</h2>
        <span class="section-tag">HOT</span>
      </div>
      <div class="hot-list">
        <div
          v-for="quiz in hotQuizzes"
          :key="quiz.code"
          class="hot-card"
          @click="goToTest(quiz.code)"
        >
          <div class="hot-icon" :style="{ background: quiz.color }">
            {{ quiz.icon }}
          </div>
          <div class="hot-info">
            <h3>{{ quiz.name }}</h3>
            <p>{{ quiz.description }}</p>
          </div>
          <div class="hot-arrow">›</div>
        </div>
      </div>
    </div>

    <!-- 心理测试 -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">🧠 心理测试</h2>
      </div>
      <div class="test-grid">
        <div
          v-for="quiz in psychologyQuizzes"
          :key="quiz.code"
          class="test-card-v2"
          @click="goToTest(quiz.code)"
        >
          <div class="card-icon" :style="{ background: quiz.color }">
            {{ quiz.icon }}
          </div>
          <div class="card-info">
            <h3>{{ quiz.name }}</h3>
            <p>{{ quiz.description }}</p>
            <div class="card-price">
              <span class="free-tag">免费测</span>
              <span class="pay-tag">¥{{ quiz.price }}解锁</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 职业测试 -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">💼 职业发展</h2>
      </div>
      <div class="test-grid">
        <div
          v-for="quiz in careerQuizzes"
          :key="quiz.code"
          class="test-card-v2"
          @click="goToTest(quiz.code)"
        >
          <div class="card-icon" :style="{ background: quiz.color }">
            {{ quiz.icon }}
          </div>
          <div class="card-info">
            <h3>{{ quiz.name }}</h3>
            <p>{{ quiz.description }}</p>
            <div class="card-price">
              <span class="pay-tag">¥{{ quiz.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 玄学测试 -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">🔮 命理玄学</h2>
      </div>
      <div class="test-grid">
        <div
          v-for="quiz in fengshuiQuizzes"
          :key="quiz.code"
          class="test-card-v2"
          @click="goToTest(quiz.code)"
        >
          <div class="card-icon" :style="{ background: quiz.color }">
            {{ quiz.icon }}
          </div>
          <div class="card-info">
            <h3>{{ quiz.name }}</h3>
            <p>{{ quiz.description }}</p>
            <div class="card-price">
              <span class="pay-tag">¥{{ quiz.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部Tab -->
    <div class="tab-bar">
      <div class="tab-item active">
        <div class="tab-icon">🏠</div>
        <div>首页</div>
      </div>
      <div class="tab-item" @click="goToProfile">
        <div class="tab-icon">📊</div>
        <div>我的测试</div>
      </div>
      <div class="tab-item" @click="goToProfile">
        <div class="tab-icon">👤</div>
        <div>我的</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getQuizList } from '@/data/quizzes'

const router = useRouter()
const quizList = ref([])

onMounted(async () => {
  quizList.value = await getQuizList()
})

// 热门测试（前三）
const hotQuizzes = computed(() => quizList.value.slice(0, 3))

// 心理测试
const psychologyQuizzes = computed(() =>
  quizList.value.filter(q => q.category === 'psychology')
)

// 职业测试
const careerQuizzes = computed(() =>
  quizList.value.filter(q => q.category === 'career')
)

// 玄学测试
const fengshuiQuizzes = computed(() =>
  quizList.value.filter(q => q.category === 'fengshui')
)

function goToTest(code) {
  router.push(`/test/${code}`)
}

function goToProfile() {
  router.push('/profile')
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.home-header {
  padding: 30px 20px 50px;
  color: white;
  position: relative;
  overflow: hidden;

  .header-content {
    position: relative;
    z-index: 1;
  }

  .logo-section {
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    .logo-icon {
      width: 56px;
      height: 56px;
      background: rgba(255,255,255,0.2);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin-right: 16px;
    }

    .title-group {
      .title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 4px;
      }

      .subtitle {
        font-size: 14px;
        opacity: 0.9;
      }
    }
  }

  .header-stats {
    display: flex;
    gap: 32px;

    .stat-item {
      display: flex;
      flex-direction: column;

      .stat-num {
        font-size: 22px;
        font-weight: 700;
      }

      .stat-label {
        font-size: 12px;
        opacity: 0.8;
      }
    }
  }

  .header-decoration {
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;

    .deco-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);

      &:first-child {
        width: 100px;
        height: 100px;
        top: 20px;
        right: 20px;
      }

      &:last-child {
        width: 60px;
        height: 60px;
        bottom: 10px;
        right: 80px;
      }
    }
  }
}

.section {
  padding: 20px;
  margin-top: -30px;
  position: relative;
  z-index: 2;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .section-tag {
      margin-left: 8px;
      padding: 2px 8px;
      background: linear-gradient(135deg, #ff6b6b, #ff8e53);
      color: white;
      font-size: 10px;
      font-weight: 700;
      border-radius: 4px;
    }
  }
}

.hot-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hot-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }

  .hot-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-right: 14px;
    flex-shrink: 0;
  }

  .hot-info {
    flex: 1;

    h3 {
      font-size: 15px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    p {
      font-size: 12px;
      color: #999;
    }
  }

  .hot-arrow {
    font-size: 22px;
    color: #ccc;
  }
}

.test-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.test-card-v2 {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }

  .card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-right: 14px;
    flex-shrink: 0;
  }

  .card-info {
    flex: 1;

    h3 {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 2px;
    }

    p {
      font-size: 11px;
      color: #999;
      margin-bottom: 6px;
    }

    .card-price {
      display: flex;
      gap: 8px;
      align-items: center;

      .free-tag {
        font-size: 11px;
        color: #52c41a;
        font-weight: 600;
      }

      .pay-tag {
        font-size: 11px;
        color: #ff6b6b;
        font-weight: 500;
      }
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
  padding: 10px 0 24px;
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

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
