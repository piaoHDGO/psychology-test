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
        <div class="progress-text">
          <span>第 {{ currentIndex + 1 }} / {{ quiz.questions?.length || 0 }} 题</span>
          <span class="progress-save">已保存</span>
        </div>
      </div>

      <!-- 问题区域 -->
      <div class="question-area">
        <!-- 上一题按钮 -->
        <div class="nav-header" v-if="currentIndex > 0">
          <button class="btn-prev" @click="prevQuestion">
            <span class="prev-icon">‹</span> 上一题
          </button>
        </div>

        <h2 class="question-text">{{ currentQuestion?.content || currentQuestion?.question || '加载中...' }}</h2>

        <div class="options">
          <div
            v-for="(option, index) in (currentQuestion?.options || [])"
            :key="index"
            class="option"
            :class="{ selected: isOptionSelected(index) }"
            @click="selectOption(index)"
          >
            <span class="option-letter">{{ letters[index] }}</span>
            <span class="option-text">{{ option.text }}</span>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="footer">
        <button
          class="btn btn-primary btn-block"
          :disabled="!hasAnswered"
          @click="nextOrSubmit"
        >
          {{ isLastQuestion ? '查看结果' : '下一题' }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQuizByCode, calculateMBTI, calculatePsychologicalAge, calculateColor, calculateStar, calculateBazi, calculateCareer, calculateEQ } from '@/data/quizzes'
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

const letters = ['A', 'B', 'C', 'D']

const progressPercent = computed(() => {
  if (!quiz.value) return 0
  return ((currentIndex.value + 1) / quiz.value.questions.length) * 100
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
  const answer = answers.value[currentIndex.value]
  if (quiz.value?.code === 'mbti') {
    // MBTI使用value比较
    return answer === currentQuestion.value?.options?.[index]?.value
  }
  return answer === index
}

// 加载测试数据
async function loadQuiz(code) {
  loading.value = true
  answers.value = []
  currentIndex.value = 0

  try {
    quiz.value = await getQuizByCode(code)
    console.log('加载测试数据:', quiz.value)

    if (!quiz.value) {
      router.push('/')
      return
    }

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
  // 对于MBTI测试，使用选项的值(1-5)，其他测试使用索引
  if (quiz.value.code === 'mbti') {
    const question = quiz.value.questions[currentIndex.value]
    answers.value[currentIndex.value] = question.options[index].value
  } else {
    answers.value[currentIndex.value] = index
  }

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

  if (quiz.value.code === 'mbti') {
    resultType = calculateMBTI(answers.value, quiz.value.questions)
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
    const age = calculatePsychologicalAge(answers.value, quiz.value.questions)
    // 找到对应的结果范围
    const ranges = quiz.value.results?.ranges || []
    let result = ranges[ranges.length - 1]
    for (const r of ranges) {
      if (age <= r.max) {
        result = r
        break
      }
    }
    resultType = result?.name || ''
    resultName = result?.desc || ''
    resultDesc = result?.name + ' - ' + result?.desc
    detailReport = result?.detail || ''
  } else if (quiz.value.code === 'color') {
    resultType = calculateColor(answers.value, quiz.value.questions)
    const types = quiz.value.results?.types || []
    const result = types.find(t => t.color === resultType)
    if (result) {
      resultName = result.name
      resultDesc = result.desc
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
    const eqScore = calculateEQ(answers.value, quiz.value.questions)
    resultType = String(eqScore)
    const ranges = quiz.value.results?.ranges || []
    let result = ranges[ranges.length - 1]
    for (const r of ranges) {
      if (eqScore <= r.max) {
        result = r
        break
      }
    }
    if (result) {
      resultName = result.level || result.name || ''
      resultDesc = result.desc || ''
      detailReport = result.detail || ''
    }
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

  // 存储到用户历史（包含完整报告用于后续解锁）
  const fullResult = {
    ...testResult,
    detailReport,
    careers,
    price: quiz.value.price,
    paid: quiz.value.paid || 0,  // 标记是否为付费测试
    isPaid: quiz.value.paid === 1,  // 当前测试是否为付费测试
    icon,
    functions,
    chart
  }
  console.log('Saving result:', fullResult)
  userStore.saveTestResult(fullResult)

  // 记录测试完成统计
  recordStat('test_complete', quiz.value.code)

  console.log('Result saved, redirecting to:', `/result/${resultId}`)

  // 跳转到结果页
  router.push(`/result/${resultId}`)
}
</script>

<style lang="scss" scoped>
.test-page {
  min-height: 100vh;
  background: #f5f5f5;
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

.progress-header {
  background: white;
  padding: 16px 20px;
  position: sticky;
  top: 0;
  z-index: 10;

  .progress-bar {
    height: 4px;
    background: #f0f0f0;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 10px;

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }

  .progress-text {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #999;

    .progress-save {
      color: #52c41a;
    }
  }
}

.question-area {
  flex: 1;
  padding: 30px 20px;

  .nav-header {
    margin-bottom: 20px;

    .btn-prev {
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      background: #f5f5f5;
      border: none;
      border-radius: 20px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #e8e8e8;
        color: #333;
      }

      .prev-icon {
        font-size: 20px;
        margin-right: 4px;
      }
    }
  }

  .question-text {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .option {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    background: white;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:active {
      transform: scale(0.98);
    }

    &.selected {
      border-color: #667eea;
      background: #f0edff;

      .option-letter {
        background: #667eea;
        color: white;
      }
    }

    .option-letter {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f5f5f5;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .option-text {
      font-size: 15px;
      color: #333;
      line-height: 1.5;
    }
  }
}

.footer {
  background: white;
  padding: 16px 20px 30px;
  border-top: 1px solid #f0f0f0;

  .btn {
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
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
