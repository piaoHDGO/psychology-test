<template>
  <div class="test-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 恢复进度弹窗 -->
    <div v-if="showResumeDialog && !loading && quiz" class="resume-dialog-overlay">
      <div class="resume-dialog">
        <div class="resume-icon">📝</div>
        <div class="resume-title">您有上次未完成的测试</div>
        <div class="resume-info">
          已完成 {{ savedProgressData?.currentIndex + 1 || 0 }} / {{ quiz?.questions?.length || 0 }} 题
        </div>
        <div class="resume-buttons">
          <button class="btn-resume" @click="resumeProgress">继续答题</button>
          <button class="btn-restart" @click="restartTest">重新开始</button>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="!quiz" class="empty-state">
      <p>测试不存在</p>
      <button class="btn btn-primary" @click="$router.push('/')">返回首页</button>
    </div>

    <!-- 测试内容 -->
    <template v-else>
      <!-- 进度条 -->
      <div class="progress-header">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="progress-info">
          <div class="progress-left">
            <span>第 {{ currentIndex + 1 }} 题 · 共 {{ quiz.questions?.length || 0 }} 题</span>
            <span class="dimension-tag" v-if="currentQuestion?.dimension">{{ currentQuestion.dimension }} 维度</span>
          </div>
          <div class="save-status">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            已自动保存
          </div>
        </div>
        <div class="time-estimate">
          ⏱️ 预计剩余时间：约 {{ estimatedTime }} 分钟
        </div>
      </div>

      <!-- 问题区域 -->
      <div class="question-area">
        <div class="question-card" :key="currentIndex">
          <div class="question-category" v-if="currentQuestion?.category">
            📋 {{ currentQuestion.category }}
          </div>
          <div class="question-number">第 {{ currentIndex + 1 }} 题</div>
          <h2 class="question-text">{{ currentQuestion?.content || currentQuestion?.question || '加载中...' }}</h2>

          <div class="options">
            <div
              v-for="(option, index) in (currentQuestion?.options || [])"
              :key="index"
              class="option"
              :class="{ selected: isOptionSelected(index) }"
              @click="selectOption(index)"
            >
              <div class="option-radio"></div>
              <span class="option-text">{{ option.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="bottom-actions">
        <button class="btn btn-prev" :disabled="currentIndex === 0" @click="prevQuestion">
          ← 上一题
        </button>
        <button class="btn btn-save" @click="saveTemporarily">
          💾 暂时保存
        </button>
        <button
          class="btn btn-next"
          :disabled="!hasAnswered"
          @click="nextOrSubmit"
        >
          {{ isLastQuestion ? '查看结果' : '下一题 →' }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { calculateMBTI, calculateMBTIWithScores, calculatePsychologicalAge, calculateColor, calculateStar, calculateBazi, calculateCareer, calculateEQ, getQuizByCode } from '@/data/quizzes'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

// 记录统计事件
async function recordStat(event, quizCode, extra = {}) {
  try {
    await fetch(`${API_BASE}/stats/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        quizCode,
        ...extra
      })
    })
  } catch (e) {
    console.error('记录统计失败:', e)
  }
}

const quiz = ref(null)
const loading = ref(true)
const answers = ref([])
const currentIndex = ref(0)
const showResumeDialog = ref(false)
const savedProgressData = ref(null)

const PROGRESS_EXPIRY_DAYS = 7

// 监听路由参数变化，重新加载测试
watch(() => route.params.code, async (newCode) => {
  if (newCode) {
    await loadQuiz(newCode)
  }
}, { immediate: false })

const letters = ['A', 'B', 'C', 'D', 'E']

const progressPercent = computed(() => {
  if (!quiz.value) return 0
  return ((currentIndex.value + 1) / quiz.value.questions.length) * 100
})

// 预计剩余时间（假设每题约15秒）
const estimatedTime = computed(() => {
  if (!quiz.value) return 0
  const remaining = quiz.value.questions.length - currentIndex.value - 1
  return Math.max(1, Math.ceil(remaining * 0.25))
})

const currentQuestion = computed(() => {
  if (!quiz.value) return {}
  return quiz.value.questions[currentIndex.value]
})

const isLastQuestion = computed(() => {
  if (!quiz.value) return false
  return currentIndex.value === quiz.value.questions.length - 1
})

// 检查当前题目是否已回答
const hasAnswered = computed(() => {
  return answers.value[currentIndex.value] !== undefined
})

// 检查选项是否被选中
function isOptionSelected(index) {
  // 对于所有测试类型，都使用索引比较，避免value重复导致的多选问题
  return answers.value[currentIndex.value] === index
}

// 加载测试数据
async function loadQuiz(code) {
  loading.value = true
  answers.value = []
  currentIndex.value = 0

  try {
    // 从本地题库获取测试
    const localQuiz = getQuizByCode(code)

    if (!localQuiz) {
      router.push('/')
      return
    }

    quiz.value = localQuiz

    // 检查测试是否上线
    if (quiz.value.status !== 1) {
      alert('该测试已下线')
      router.push('/')
      return
    }

    // 初始化答案数组
    answers.value = new Array(quiz.value.questions?.length || 0).fill(undefined)
  } catch (e) {
    console.error('加载失败:', e)
  } finally {
    loading.value = false
  }

  // 检查是否有保存的进度（未过期）
  const savedProgress = localStorage.getItem(`progress_${code}`)
  if (savedProgress) {
    try {
      const data = JSON.parse(savedProgress)
      const savedTime = data.savedAt ? new Date(data.savedAt).getTime() : 0
      const now = Date.now()
      const expiryMs = PROGRESS_EXPIRY_DAYS * 24 * 60 * 60 * 1000

      // 检查是否在7天内
      if (now - savedTime < expiryMs && data.answers && data.answers.length > 0) {
        savedProgressData.value = data
        showResumeDialog.value = true
      } else {
        // 过期了，删除旧进度
        localStorage.removeItem(`progress_${code}`)
      }
    } catch (e) {
      console.error('恢复进度失败', e)
      localStorage.removeItem(`progress_${code}`)
    }
  }
}

// 继续上次答题
function resumeProgress() {
  if (savedProgressData.value) {
    answers.value = savedProgressData.value.answers
    currentIndex.value = savedProgressData.value.currentIndex
  }
  showResumeDialog.value = false
}

// 重新开始
function restartTest() {
  // 清除保存的进度
  localStorage.removeItem(`progress_${quiz.value.code}`)
  answers.value = new Array(quiz.value.questions?.length || 0).fill(undefined)
  currentIndex.value = 0
  showResumeDialog.value = false
}

onMounted(async () => {
  const code = route.params.code
  await loadQuiz(code)
})

function selectOption(index) {
  // 所有测试类型都使用索引存储
  answers.value[currentIndex.value] = index

  // 保存进度到localStorage（带时间戳）
  localStorage.setItem(`progress_${quiz.value.code}`, JSON.stringify({
    answers: answers.value,
    currentIndex: currentIndex.value,
    savedAt: new Date().toISOString()
  }))

  // 自动跳转到下一题（延时100ms让用户看到选中效果）
  if (!isLastQuestion.value) {
    setTimeout(() => {
      currentIndex.value++
    }, 100)
  }
}

// 上一题
function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// 暂时保存
function saveTemporarily() {
  localStorage.setItem(`progress_${quiz.value.code}`, JSON.stringify({
    answers: answers.value,
    currentIndex: currentIndex.value,
    savedAt: new Date().toISOString()
  }))
  alert('已保存，下次可继续作答')
}

function nextOrSubmit() {
  if (isLastQuestion.value) {
    submitTest()
  } else {
    currentIndex.value++
  }
}

function submitTest() {
  // 清除保存的进度
  localStorage.removeItem(`progress_${quiz.value.code}`)

  // 计算结果
  let resultType = ''
  let resultName = ''
  let resultDesc = ''
  let detailReport = ''
  let careers = []

  // MBTI分数（用于雷达图）
  let mbtiScores = null
  // 性格色彩分数（用于匹配度）
  let colorScores = null
  // 心理年龄维度得分（用于5维度分析）
  let ageDimensions = null
  // EQ维度得分（用于结果页展示）
  let eqDimensions = null

  if (quiz.value.code === 'mbti') {
    const mbtiResult = calculateMBTIWithScores(answers.value, quiz.value.questions)
    resultType = mbtiResult.type
    mbtiScores = mbtiResult.scores
    // 支持数组 types 和对象两种结构
    const results = quiz.value.results || {}
    let result = null
    if (results.types) {
      result = results.types.find(t => t.name === resultType)
    } else if (results[resultType]) {
      result = results[resultType]
    }
    if (result) {
      resultName = result.name
      resultDesc = result.desc || result.description
      detailReport = result.detail
      careers = result.careers
    }
  } else if (quiz.value.code === 'age') {
    // 计算心理成熟度结果
    const ageResult = calculatePsychologicalAge(answers.value, quiz.value.questions)
    // 根据resultKey获取对应的结果
    const results = quiz.value.results || {}
    const result = results[ageResult.resultKey] || {}
    resultType = ageResult.level
    resultName = result.name || ageResult.level
    resultDesc = result.description || ''
    detailReport = result.detail || ''
    // 保存维度得分用于结果页展示（将总分转换为百分比）
    ageDimensions = [{ name: '心理成熟度', score: ageResult.totalScore, levelScore: Math.round((ageResult.totalScore / 48) * 100), level: ageResult.level }]
  } else if (quiz.value.code === 'color') {
    // 计算颜色分数（用于职业匹配度）
    // 计算性格色彩结果
    const colorResult = calculateColor(answers.value, quiz.value.questions)
    colorScores = colorResult.scores
    resultType = colorResult.primary

    // 从结果对象中获取对应颜色的结果
    const results = quiz.value.results || {}
    const result = results[colorResult.primary] || {}
    if (result) {
      resultName = result.name
      resultDesc = result.description
      detailReport = result.detail
      careers = result.strengths
    }
  } else if (quiz.value.code === 'star') {
    const starType = calculateStar(answers.value, quiz.value.questions)
    resultType = String(starType)
    const types = quiz.value.results?.types || []
    const result = types.find(t => t.star === starType)
    if (result) {
      resultName = result.name
      resultDesc = result.desc
      detailReport = result.detail
    }
  } else if (quiz.value.code === 'bazi') {
    const baziType = calculateBazi(answers.value, quiz.value.questions)
    resultType = String(baziType)
    const types = quiz.value.results?.types || []
    const result = types.find(t => t.bazi === baziType)
    if (result) {
      resultName = result.name
      resultDesc = result.desc
      detailReport = result.detail
    }
  } else if (quiz.value.code === 'career') {
    const careerType = calculateCareer(answers.value, quiz.value.questions)
    resultType = careerType
    const types = quiz.value.results?.types || []
    const result = types.find(t => t.name === careerType)
    if (result) {
      resultName = result.name
      resultDesc = result.desc
      detailReport = result.detail
      careers = result.careers
    }
  } else if (quiz.value.code === 'eq') {
    // 计算情商结果
    const eqResult = calculateEQ(answers.value, quiz.value.questions)
    // 根据resultKey获取对应的结果
    const results = quiz.value.results || {}
    const result = results[eqResult.resultKey] || {}
    resultType = eqResult.level
    resultName = result.name || eqResult.level
    resultDesc = result.description || ''
    detailReport = result.detail || ''
    // 保存维度得分用于结果页展示
    eqDimensions = eqResult.dimensions
  }

  // 生成结果ID
  const resultId = Date.now().toString(36) + Math.random().toString(36).substr(2)

  // 获取MBTI的附加信息
  let icon = ''
  let functions = {}
  let chart = {}
  // 重新获取MBTI结果对象
  if (quiz.value.code === 'mbti') {
    const mbtiResults = quiz.value.results || {}
    let mbtiResult = null
    if (mbtiResults.types) {
      mbtiResult = mbtiResults.types.find(t => t.name === resultType)
    } else if (mbtiResults[resultType]) {
      mbtiResult = mbtiResults[resultType]
    }
    if (mbtiResult) {
      icon = mbtiResult.icon || ''
      functions = mbtiResult.functions || {}
      chart = mbtiResult.chart || {}
    }
  }

  // 保存结果
  const testResult = {
    id: resultId,
    quizCode: quiz.value.code,
    quizName: quiz.value.name,
    resultType,
    resultName,
    resultDesc,
    answers: answers.value,
    isPaid: false,
    createdAt: new Date().toISOString()
  }

  // 计算总分用于结果页显示
  let totalScore = 0
  if (quiz.value.code === 'mbti' && mbtiScores) {
    totalScore = Object.values(mbtiScores).reduce((a, b) => a + b, 0)
  } else if (quiz.value.code === 'age') {
    totalScore = ageDimensions?.[0]?.score || 0
  } else if (quiz.value.code === 'color' && colorScores) {
    totalScore = Object.values(colorScores).reduce((a, b) => a + b, 0)
  } else if (quiz.value.code === 'eq') {
    totalScore = eqDimensions?.reduce((a, b) => a + b.score, 0) || 0
  }

  // 存储到用户历史（包含完整报告用于后续解锁）
  const fullResult = {
    ...testResult,
    score: totalScore,  // 保存总分
    detailReport,
    careers,
    price: quiz.value.price,
    paid: quiz.value.paid || 0,  // 标记是否为付费测试
    isPaid: quiz.value.paid === 1,  // 当前测试是否为付费测试
    mbtiScores,  // MBTI维度分数（用于雷达图）
    colorScores,  // 性格色彩分数（用于匹配度计算）
    ageDimensions,  // 心理年龄5维度得分
    eqDimensions,  // EQ维度得分
    icon,
    functions,
    chart
  }
  userStore.saveTestResult(fullResult)

  // 记录测试完成统计
  recordStat('test_complete', quiz.value.code)

  // 跳转到结果页
  router.push(`/result/${resultId}`)
}
</script>

<style lang="scss" scoped>
.test-page {
  min-height: 100vh;
  background: #F5F7FA;
  display: flex;
  flex-direction: column;
}

.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: #666;

  p {
    margin: 16px 0;
  }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 顶部进度条 */
.progress-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  z-index: 100;

  .progress-bar {
    height: 6px;
    background: linear-gradient(90deg, #3B82F6, #8B5CF6);
    border-radius: 3px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3B82F6, #8B5CF6);
      transition: width 0.4s ease;
    }
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    max-width: 800px;
    margin: 0 auto;

    .progress-left {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 14px;
      color: #6B7280;

      strong {
        color: #1F2937;
      }

      .dimension-tag {
        padding: 4px 10px;
        background: #EEF2FF;
        color: #4F46E5;
        font-size: 12px;
        font-weight: 600;
        border-radius: 6px;
      }
    }

    .save-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #10B981;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }

  .time-estimate {
    background: #FEF3C7;
    color: #92400E;
    font-size: 13px;
    padding: 8px 20px;
    text-align: center;
  }
}

/* 问题区域 */
.question-area {
  flex: 1;
  padding: 100px 24px 140px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.question-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 48px;
  animation: slideUp 0.4s ease;
  width: 100%;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.question-category {
  display: inline-block;
  padding: 6px 14px;
  background: #EEF2FF;
  color: #4F46E5;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 20px;
}

.question-number {
  font-size: 14px;
  color: #9CA3AF;
  margin-bottom: 12px;
}

.question-text {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  color: #1F2937;
  margin-bottom: 28px;
}

.options {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 14px;
}

.option {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  min-height: 72px;
  margin-bottom: 14px;
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3B82F6;
    background: #EFF6FF;
  }

  &.selected {
    background: #EFF6FF;
    border-color: #3B82F6 !important;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.15);

    .option-radio {
      border-color: #3B82F6;

      &::after {
        content: '';
        width: 10px;
        height: 10px;
        background: #3B82F6;
        border-radius: 50%;
      }
    }
  }
}

.option-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #D1D5DB;
  border-radius: 50%;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.option-text {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #374151;
  line-height: 1.5;
}

/* 底部操作 */
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 16px 24px;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  .btn {
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-prev {
    background: #F3F4F6;
    color: #374151;
    border: none;

    &:hover {
      background: #E5E7EB;
    }

    &:active {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .btn-save {
    background: white;
    color: #6B7280;
    border: 2px solid #E5E7EB;

    &:hover {
      border-color: #9CA3AF;
      color: #374151;
    }
  }

  .btn-next {
    background: linear-gradient(135deg, #3B82F6, #6366F1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59,130,246,0.4);
    }

    &:active {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

/* 移动端适配 */
@media (max-width: 600px) {
  .question-area {
    padding: 90px 16px 130px;
  }

  .question-card {
    padding: 24px 20px;
  }

  .question-text {
    font-size: 18px;
  }

  .option {
    padding: 14px 16px;
  }

  .option-text {
    font-size: 15px;
  }

  .bottom-actions {
    padding: 12px 16px;
    flex-wrap: wrap;
    gap: 10px;

    .btn {
      padding: 12px 16px;
      font-size: 14px;
    }

    .btn-save {
      order: 3;
      width: 100%;
      justify-content: center;
    }
  }

  .progress-info {
    flex-wrap: wrap;
    gap: 8px;
  }
}

.resume-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.resume-dialog {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin: 20px;
  text-align: center;
  max-width: 320px;
  width: 100%;

  .resume-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .resume-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }

  .resume-info {
    font-size: 14px;
    color: #666;
    margin-bottom: 24px;
  }

  .resume-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .btn-resume {
      padding: 14px;
      background: linear-gradient(135deg, #667eea, #764ba2);
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
    }

    .btn-restart {
      padding: 14px;
      background: #f5f5f5;
      color: #666;
      border: none;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #e8e8e8;
      }
    }
  }
}
</style>
