<template>
  <div class="home">
    <!-- 固定导航栏 -->
    <nav class="navbar">
      <div class="nav-content">
        <div class="logo">
          <div class="logo-icon">🧠</div>
          <span>测评之家</span>
        </div>
        <div class="nav-links">
          <a href="#" class="active">首页</a>
          <a href="#">所有测评</a>
          <a href="#">用户评价</a>
          <a href="#">关于我们</a>
          <a href="#" class="nav-btn" @click.prevent="goToProfile">📋 我的测评</a>
        </div>
      </div>
    </nav>

    <!-- 英雄区 -->
    <section class="hero gradient-bg">
      <div class="hero-content">
        <div class="hero-badge">🎉 已有 12.8万 人测评</div>
        <h1 class="hero-title">发现你的<span>职业性格</span></h1>
        <p class="hero-subtitle">
          专业的MBTI性格测评，帮你深度了解自己<br>
          找到最适合的职业方向
        </p>

        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-num">12.8万+</div>
            <div class="stat-label">测评人数</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">98%</div>
            <div class="stat-label">好评率</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">3分钟</div>
            <div class="stat-label">快速测评</div>
          </div>
        </div>

        <div class="cta-group">
          <button class="cta-button primary" @click="goToTest('mbti')">
            立即开始 →
          </button>
          <button class="cta-button secondary">
            先看看介绍
          </button>
        </div>
      </div>
    </section>

    <!-- 内容区 -->
    <div class="container">
      <h2 class="section-title">热门测评推荐</h2>

      <div class="quiz-grid">
        <div
          v-for="(quiz, index) in hotQuizzes"
          :key="quiz.code"
          class="quiz-card"
          @click="goToTest(quiz.code)"
        >
          <div class="quiz-cover" :style="{ background: quiz.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }">
            {{ quiz.icon || '🧠' }}
            <div class="quiz-tags">
              <span class="quiz-tag hot" v-if="index === 0">热门</span>
            </div>
          </div>
          <div class="quiz-body">
            <div class="quiz-title">{{ quiz.name }}</div>
            <div class="quiz-meta">
              <span>{{ quiz.code.toUpperCase() }}</span>
              <span>{{ quiz.questionCount }}题</span>
            </div>
            <button class="quiz-action">
              开始测评
            </button>
          </div>
        </div>
      </div>

      <!-- 特色介绍 -->
      <div class="features">
        <div class="feature-item">
          <div class="feature-icon">⚡</div>
          <h4>快速测评</h4>
          <p>3-5分钟完成<br>无需注册</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📊</div>
          <h4>深度分析</h4>
          <p>多维度报告<br>个性化建议</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🔒</div>
          <h4>隐私保护</h4>
          <p>匿名测评<br>数据安全</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎁</div>
          <h4>基础免费</h4>
          <p>免费版够用<br>高级版付费</p>
        </div>
      </div>

      <!-- 用户评价 -->
      <h2 class="section-title">用户真实评价</h2>
      <div class="reviews">
        <div class="review-card">
          <div class="review-stars">★★★★★</div>
          <div class="review-header">
            <div class="review-avatar">小</div>
            <div class="review-info">
              <h4>小李</h4>
              <span>MBTI测评用户</span>
            </div>
          </div>
          <p class="review-text">测完才知道自己适合做技术型工作，现在转行做数据分析，工资翻倍！</p>
        </div>

        <div class="review-card">
          <div class="review-stars">★★★★★</div>
          <div class="review-header">
            <div class="review-avatar">M</div>
            <div class="review-info">
              <h4>Michael</h4>
              <span>职业规划用户</span>
            </div>
          </div>
          <p class="review-text">报告非常详细，还给出了具体的职业建议，对我帮助很大</p>
        </div>

        <div class="review-card">
          <div class="review-stars">★★★★★</div>
          <div class="review-header">
            <div class="review-avatar">阿</div>
            <div class="review-info">
              <h4>阿花</h4>
              <span>性格测评用户</span>
            </div>
          </div>
          <p class="review-text">做完测试更了解自己了，和同事相处也更融洽，推荐！</p>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-content">
        <div>
          <h4>测评之家</h4>
          <p style="color: #9CA3AF; font-size: 14px; line-height: 1.6;">
            让每个人都能发现更好的自己。专业的心理测评平台，提供MBTI、性格色彩、情商等测评服务。
          </p>
        </div>
        <div>
          <h4>快速入口</h4>
          <a href="#">所有测评</a>
          <a href="#">热门测评</a>
          <a href="#">新人专享</a>
        </div>
        <div>
          <h4>帮助中心</h4>
          <a href="#">常见问题</a>
          <a href="#">测评须知</a>
          <a href="#">商务合作</a>
        </div>
      </div>
      <div class="footer-bottom">
        © 2026 测评之家 · 让每个人都能发现更好的自己
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getQuizList } from '@/data/quizzes'

const router = useRouter()

// 从本地题库加载
const quizzes = ref([])

// 从本地获取测试列表
function fetchQuizzes() {
  quizzes.value = getQuizList()
}

onMounted(() => {
  fetchQuizzes()
})

// 热门测试（显示所有状态为1的测试）
const hotQuizzes = computed(() => quizzes.value.filter(q => q.status === 1))

// 跳转到测试
function goToTest(code) {
  router.push(`/test/${code}`)
}

// 跳转到个人中心
function goToProfile() {
  router.push('/profile')
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: #F5F7FA;
  padding-bottom: 0;
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  z-index: 100;
  padding: 16px 24px;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
  display: flex;
  align-items: center;
  gap: 8px;

  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #3B82F6, #6366F1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
  }
}

.nav-links {
  display: flex;
  gap: 24px;
  align-items: center;

  a {
    text-decoration: none;
    color: #6B7280;
    font-size: 15px;
    transition: color 0.2s;

    &:hover {
      color: #3B82F6;
    }

    &.active {
      color: #3B82F6;
    }
  }

  .nav-btn {
    padding: 8px 16px;
    background: #F3F4F6;
    border-radius: 8px;
    font-size: 14px;
    color: #374151;
    transition: all 0.2s;

    &:hover {
      background: #E5E7EB;
    }
  }
}

/* 英雄区 */
.hero {
  padding: 140px 24px 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
    animation: pulse 4s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.hero-content {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
  color: white;
  font-size: 14px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
  line-height: 1.2;

  span {
    background: linear-gradient(120deg, #FDE68A, #FCD34D);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255,255,255,0.9);
  margin-bottom: 40px;
  line-height: 1.6;
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 40px;

  .stat-item {
    text-align: center;
  }

  .stat-num {
    font-size: 36px;
    font-weight: 700;
    color: white;
  }

  .stat-label {
    font-size: 14px;
    color: rgba(255,255,255,0.8);
  }
}

.cta-group {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;

  &:active {
    transform: scale(0.95);
  }

  &.primary {
    background: white;
    color: #3B82F6;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    }
  }

  &.secondary {
    background: rgba(255,255,255,0.2);
    color: white;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255,255,255,0.3);
    }
  }
}

/* 内容区 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1F2937;
  text-align: center;
  margin-bottom: 40px;
}

.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
}

.quiz-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
}

.quiz-cover {
  height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
}

.quiz-tags {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
}

.quiz-tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;

  &.free {
    background: #10B981;
    color: white;
  }

  &.pro {
    background: #F59E0B;
    color: white;
  }

  &.hot {
    background: #EF4444;
    color: white;
  }
}

.quiz-body {
  padding: 20px;
}

.quiz-title {
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 8px;
}

.quiz-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #9CA3AF;
  margin-bottom: 16px;
}

.quiz-action {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
}

/* 特色介绍 */
.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 60px;
}

.feature-item {
  text-align: center;
  padding: 24px;

  .feature-icon {
    width: 60px;
    height: 60px;
    background: #EFF6FF;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin: 0 auto 16px;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #6B7280;
  }
}

/* 用户评价 */
.reviews {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.review-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.review-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 600;
}

.review-info {
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1F2937;
  }

  span {
    font-size: 13px;
    color: #9CA3AF;
  }
}

.review-text {
  font-size: 15px;
  color: #4B5563;
  line-height: 1.6;
}

.review-stars {
  color: #FCD34D;
  margin-bottom: 12px;
}

/* 底部 */
.footer {
  background: #1F2937;
  color: white;
  padding: 40px 24px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;

  h4 {
    font-size: 16px;
    margin-bottom: 16px;
  }

  a {
    display: block;
    color: #9CA3AF;
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 8px;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
}

.footer-bottom {
  max-width: 1200px;
  margin: 30px auto 0;
  padding-top: 20px;
  border-top: 1px solid #374151;
  text-align: center;
  font-size: 14px;
  color: #9CA3AF;
}

/* 移动端 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .stats-bar {
    gap: 30px;
  }

  .stat-num {
    font-size: 28px;
  }

  .nav-links {
    display: none;
  }

  .features {
    grid-template-columns: repeat(2, 1fr);
  }

  .reviews {
    grid-template-columns: 1fr;
  }

  .cta-group {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
