<template>
  <div class="result-page" v-if="result.resultName">
    <!-- 结果头部 -->
    <div class="result-header gradient-bg">
      <div v-if="result.icon" class="result-icon">{{ result.icon }}</div>
      <div class="result-type">{{ result.resultType }}</div>
      <div class="result-name">{{ result.resultName }}</div>
      <div class="result-desc">{{ result.resultDesc }}</div>
    </div>

    <!-- MBTI 图表和详细报告 -->
    <div v-if="result.quizCode === 'mbti'" class="result-content">
      <MbtiChart
        :type="result.resultType"
        :functions="result.functions || {}"
        :scores="mbtiScores"
        :icon="result.icon || ''"
        :color="result.chartColor || '#667eea'"
      />

      <!-- MBTI 详细分析 -->
      <div class="result-section" :class="{ 'paid-section': result.paid === 1 && !isPaid }">
        <div class="section-header">
          <span class="section-icon">📖</span>
          <span class="section-title">详细分析</span>
          <span v-if="result.paid === 1 && !isPaid" class="lock-tag">付费</span>
        </div>
        <div class="section-body" :class="{ blur: result.paid === 1 && !isPaid }">
          <p>{{ result.detailReport }}</p>
        </div>
      </div>

      <!-- MBTI 职业建议 -->
      <div class="result-section" :class="{ 'paid-section': result.paid === 1 && !isPaid }">
        <div class="section-header">
          <span class="section-icon">💼</span>
          <span class="section-title">职业建议</span>
          <span v-if="result.paid === 1 && !isPaid" class="lock-tag">付费</span>
        </div>
        <div class="section-body" :class="{ blur: result.paid === 1 && !isPaid }">
          <div class="careers-list">
            <div v-for="c in result.careers" :key="c" class="career-item">
              {{ c }}
            </div>
          </div>
        </div>
      </div>

      <!-- MBTI 付费解锁卡片 -->
      <template v-if="result.paid === 1">
        <div v-if="!isPaid" class="pay-card">
          <div class="pay-header">
            <div class="pay-title">解锁完整MBTI报告</div>
            <div class="pay-price">¥{{ result.price }}</div>
          </div>
          <div class="pay-features">
            <div class="pay-feature">完整版结果分析</div>
            <div class="pay-feature">认知功能详解</div>
            <div class="pay-feature">职业发展建议</div>
            <div class="pay-feature">恋爱匹配分析</div>
          </div>
          <button class="btn-pay" @click="handlePay" :disabled="isPaying">
            {{ isPaying ? '处理中...' : '立即支付解锁' }}
          </button>
        </div>

        <!-- 已付费提示 -->
        <div v-else class="paid-tip">
          <span class="paid-icon">✓</span>
          <span>您已购买过此报告</span>
        </div>
      </template>
    </div>

    <!-- 结果内容 -->
    <div v-else class="result-content">
      <!-- 免费部分 -->
      <div class="result-section">
        <div class="section-header">
          <span class="section-icon">📊</span>
          <span class="section-title">结果分析</span>
        </div>
        <div class="section-body">
          <p>{{ result.resultDesc }}</p>
        </div>
      </div>

      <!-- 付费部分1 -->
      <div class="result-section" :class="{ 'paid-section': result.paid === 1 && !isPaid }">
        <div class="section-header">
          <span class="section-icon">📖</span>
          <span class="section-title">详细分析</span>
          <span v-if="result.paid === 1 && !isPaid" class="lock-tag">付费</span>
        </div>
        <div class="section-body" :class="{ blur: result.paid === 1 && !isPaid }">
          <p>{{ result.detailReport }}</p>
        </div>
      </div>

      <!-- 非MBTI测试的付费部分2 -->
      <div class="result-section" :class="{ 'paid-section': result.paid === 1 && !isPaid }">
        <div class="section-header">
          <span class="section-icon">💼</span>
          <span class="section-title">{{ result.quizCode === 'color' ? '性格优势' : '职业建议' }}</span>
          <span v-if="result.paid === 1 && !isPaid" class="lock-tag">付费</span>
        </div>
        <div class="section-body" :class="{ blur: result.paid === 1 && !isPaid }">
          <div v-if="result.quizCode === 'color'" class="strengths-list">
            <div v-for="s in result.careers" :key="s" class="strength-item">
              {{ s }}
            </div>
          </div>
          <div v-else class="careers-list">
            <div v-for="c in result.careers" :key="c" class="career-item">
              {{ c }}
            </div>
          </div>
        </div>
      </div>

      <!-- 非MBTI测试的付费解锁卡片 -->
      <div v-if="result.quizCode !== 'mbti' && result.paid === 1">
        <!-- 付费解锁卡片 -->
        <div v-if="!isPaid" class="pay-card">
          <div class="pay-header">
            <div class="pay-title">解锁完整报告</div>
            <div class="pay-price">¥{{ result.price }}</div>
          </div>
          <div class="pay-features">
            <div class="pay-feature">完整版结果分析</div>
            <div class="pay-feature">{{ result.quizCode === 'color' ? '性格优势详解' : '职业发展建议' }}</div>
            <div class="pay-feature">个人成长指南</div>
          </div>
          <button class="btn-pay" @click="handlePay" :disabled="isPaying">
            {{ isPaying ? '处理中...' : '立即支付解锁' }}
          </button>
        </div>

        <!-- 已付费提示 -->
        <div v-else class="paid-tip">
          <span class="paid-icon">✓</span>
          <span>您已购买过此报告</span>
        </div>
      </div>

      <!-- 分享 -->
      <div class="share-section">
        <button class="btn-share" @click="showSharePoster = true">
          <span class="share-icon">📤</span>
          <span>生成海报分享</span>
        </button>
        <div class="share-tip">分享给朋友，一起测试吧</div>
      </div>

      <!-- 分享海报弹窗 -->
      <SharePoster
        :visible="showSharePoster"
        :quiz-name="result.quizName"
        :quiz-icon="getQuizIcon(result.quizCode)"
        :result-type="result.resultType"
        :result-name="result.resultName"
        :result-desc="result.resultDesc"
        @close="showSharePoster = false"
      />
    </div>

    <!-- 底部导航 -->
    <div class="tab-bar">
      <div class="tab-item" @click="goHome">
        <div class="tab-icon">🏠</div>
        <div>首页</div>
      </div>
      <div class="tab-item" @click="goProfile">
        <div class="tab-icon">📊</div>
        <div>我的测试</div>
      </div>
    </div>
  </div>
  <div v-else class="loading">加载中...</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import SharePoster from '@/components/SharePoster.vue'
import MbtiChart from '@/components/MbtiChart.vue'
import { pay as doPay, isWechat } from '@/utils/wechatPay'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const result = ref({})
const isPaid = ref(false)
const isPaying = ref(false)
const showSharePoster = ref(false)

// 计算 MBTI 各维度得分
const mbtiScores = computed(() => {
  if (result.value.quizCode !== 'mbti' || !result.value.answers) {
    return { e: 0, i: 0, s: 0, n: 0, t: 0, f: 0, j: 0, p: 0 }
  }

  const scores = { e: 0, i: 0, s: 0, n: 0, t: 0, f: 0, j: 0, p: 0 }
  const answers = result.value.answers

  // 需要从后端获取题目来计算，这里使用默认比例
  // 实际应该存储题目数据
  return { e: 50, i: 50, s: 50, n: 50, t: 50, f: 50, j: 50, p: 50 }
})

function getQuizIcon(code) {
  const icons = {
    mbti: '🎯',
    age: '🧠',
    color: '🎨',
    star: '⭐',
    bazi: '🔮',
    career: '💼',
    eq: '🧡'
  }
  return icons[code] || '📝'
}

onMounted(async () => {
  // 确保userStore已初始化
  if (!userStore.testHistory || userStore.testHistory.length === 0) {
    // 尝试从localStorage加载
    userStore.init()
    // 等待一小段时间让store初始化完成
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  const id = route.params.id
  console.log('Result page - id:', id, 'history:', userStore.testHistory)
  // 从用户历史中查找结果
  const historyItem = userStore.testHistory.find(r => r.id === id)

  if (historyItem) {
    result.value = historyItem
    console.log('Result found:', result.value)
    // 如果测试本身是免费的(paid=0)，直接显示完整内容
    // 如果测试是付费的(paid=1)，则检查是否已购买
    isPaid.value = historyItem.paid === 0 || historyItem.isPaid === true
  } else {
    console.log('Result not found, redirecting to home')
    // 结果不存在，返回首页
    router.push('/')
  }
})

function goHome() {
  router.push('/')
}

function goProfile() {
  router.push('/profile')
}

function handlePay() {
  if (isPaying.value) return

  isPaying.value = true

  // 调用后端创建订单
  fetch(`${API_BASE}/order/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      resultId: result.value.id,
      quizCode: result.value.quizCode
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.code === 0) {
      const { orderNo, payParams, payType } = data.data

      // 执行支付
      doPay({
        orderNo,
        payParams,
        payType,
        apiFunc: async (no) => {
          // 确认支付
          await fetch(`${API_BASE}/order/simulate-pay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderNo: no })
          })
        },
        onSuccess: () => {
          userStore.markAsPurchased(result.value.quizCode, result.value.id)
          isPaid.value = true
          alert('支付成功！报告已解锁。')
        },
        onCancel: () => {
          alert('支付已取消')
        },
        onError: (error) => {
          alert('支付失败：' + error.message)
        }
      })
    } else {
      alert('创建订单失败：' + data.message)
    }
  })
  .catch(error => {
    console.error('支付错误:', error)
    // 降级到模拟支付
    if (confirm(`确认支付 ¥${result.value.price} 解锁完整报告？`)) {
      userStore.markAsPurchased(result.value.quizCode, result.value.id)
      isPaid.value = true
      alert('支付成功！报告已解锁。')
    }
  })
  .finally(() => {
    isPaying.value = false
  })
}
</script>

<style lang="scss" scoped>
.result-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.result-header {
  padding: 60px 20px 50px;
  color: white;
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
    animation: shimmer 3s infinite linear;
  }

  @keyframes shimmer {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .result-icon {
    font-size: 80px;
    margin-bottom: 10px;
    display: block;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  }

  .result-type {
    font-size: 64px;
    font-weight: 800;
    letter-spacing: 6px;
    margin-bottom: 16px;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    position: relative;
  }

  .result-name {
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 12px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }

  .result-desc {
    font-size: 16px;
    opacity: 0.95;
    max-width: 80%;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.result-content {
  padding: 20px;
}

.result-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;

    .section-icon {
      font-size: 20px;
      margin-right: 10px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      flex: 1;
    }

    .lock-tag {
      font-size: 12px;
      color: #ff6b6b;
      background: #fff0f0;
      padding: 4px 12px;
      border-radius: 12px;
      font-weight: 500;
    }
  }

  .section-body {
    font-size: 15px;
    color: #555;
    line-height: 2;
    white-space: pre-wrap;

    &.blur {
      filter: blur(8px);
      user-select: none;
      pointer-events: none;
    }

    p {
      margin: 0;
      text-align: justify;
    }
  }

  &.paid-section {
    border: 1px dashed #e0e0e0;
    background: linear-gradient(to bottom, #fafafa, #fff);
  }
}

.strengths-list, .careers-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.strength-item, .career-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }
}

.pay-card {
  background: linear-gradient(135deg, #fff5e5 0%, #ffe5e5 100%);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  border: 2px solid #ffddd0;
  text-align: center;

  .pay-header {
    margin-bottom: 16px;

    .pay-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .pay-price {
      font-size: 36px;
      font-weight: 700;
      color: #ff6b6b;
    }
  }

  .pay-features {
    text-align: left;
    margin-bottom: 20px;

    .pay-feature {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
      padding-left: 20px;
      position: relative;

      &::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #52c41a;
        font-weight: bold;
      }
    }
  }

  .btn-pay {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.paid-tip {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  color: #52c41a;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .paid-icon {
    width: 20px;
    height: 20px;
    background: #52c41a;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
}

.share-section {
  text-align: center;
  padding: 20px;

  .btn-share {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 12px;
    transition: transform 0.2s;

    &:active {
      transform: scale(0.98);
    }

    .share-icon {
      font-size: 18px;
    }
  }

  .share-tip {
    font-size: 13px;
    color: #999;
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
