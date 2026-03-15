<template>
  <div class="result-page" :class="['page-' + result.quizCode, result.quizCode === 'color' ? 'page-color-' + mainColor.class : '']" v-if="isLoaded">
    <!-- 结果主体 -->
    <div class="result-container">

      <!-- 顶部结果卡片 - MBTI渐变背景 -->
      <div class="result-header" :class="['header-' + result.quizCode, result.quizCode === 'color' ? 'header-color page-color-' + mainColor.class : '']">
        <div class="result-badge">{{ resultBadge }}</div>

        <!-- MBTI 类型展示 -->
        <template v-if="result.quizCode === 'mbti'">
          <div class="mbti-type">{{ result.resultType }}</div>
          <div class="mbti-name">{{ result.resultName }}</div>
          <div class="mbti-tags">
            <span class="mbti-tag" v-for="tag in mbtiTags" :key="tag">{{ tag }}</span>
          </div>
        </template>

        <!-- 其他测试类型标题 -->
        <template v-else>
          <div class="result-title">{{ resultTitle }}</div>
        </template>

        <!-- EQ 等级徽章 -->
        <!-- EQ 分数 -->
        <template v-if="result.quizCode === 'eq'">
          <!-- 仪表盘分数 -->
          <div class="gauge-section">
            <div class="gauge-chart">
              <canvas ref="gaugeChart"></canvas>
              <div class="gauge-value">
                <div class="gauge-score">{{ eqTotalScore }}</div>
                <div class="gauge-label">分</div>
              </div>
            </div>
          </div>

          <!-- 等级徽章和超过百分比在分数下方 -->
          <div class="eq-header-row">
            <div class="level-badge" :class="'level-' + eqLevel">
              {{ eqLevelText }}
            </div>
            <div class="score-compare">🔥 超过 {{ eqComparePercent }}% 的用户</div>
          </div>
        </template>

        <!-- 心理成熟度 分数 -->
        <template v-if="result.quizCode === 'age'">
          <!-- 等级徽章 -->
          <div class="level-badge" :class="'level-' + ageLevel">
            {{ ageLevelText }}
          </div>

          <div class="age-score-section">
            <div class="age-score-main">
              <span class="age-score-value">{{ ageScore }}</span>
              <span class="age-score-total">/ {{ ageTotalScore }} 分</span>
            </div>
            <div class="score-compare">🔥 超过 {{ ageComparePercent }}% 的用户</div>
          </div>
        </template>

        <!-- 性格色彩 环形图 -->
        <template v-if="result.quizCode === 'color'">
          <div class="chart-section">
            <div class="donut-chart">
              <canvas ref="colorChart"></canvas>
            </div>
            <div class="color-legend">
              <div class="legend-item" v-for="color in colorData" :key="color.name">
                <span class="legend-dot" :class="color.class"></span>
                {{ color.name }} {{ color.percent }}%
              </div>
            </div>
          </div>

          <!-- 主辅色 -->
          <div class="color-type">
            <div class="type-badge main" :class="mainColor.class">
              <span>{{ mainColorIcon }}</span> 主色：{{ mainColor.name }} - {{ mainColor.trait }}
            </div>
            <div class="type-badge sub" v-if="subColor" :class="subColor.class">
              <span>{{ subColorIcon }}</span> 辅色：{{ subColor.name }} - {{ subColor.trait }}
            </div>
          </div>

          <div class="score-section">
            <div class="score-compare">🔥 超过 {{ colorComparePercent }}% 的用户</div>
          </div>
        </template>

        <!-- MBTI 分数卡片 -->
        <template v-if="result.quizCode === 'mbti'">
          <div class="score-card">
            <div class="score-main">
              <div class="score-circle" :style="{ '--score': mbtiScore }">
                <span class="score-value">{{ mbtiScore }}</span>
              </div>
              <div class="score-info">
                <span class="score-label">综合得分</span>
                <span class="score-compare">🔥 超过 {{ mbtiComparePercent }}% 的用户</span>
              </div>
            </div>

            <!-- 能力维度分析标题 -->
            <h3>📊 能力维度分析</h3>

            <!-- 雷达图 -->
            <div class="chart-container">
              <canvas ref="radarChart"></canvas>
            </div>

            <!-- 维度进度条 - 显示4个维度的对比 -->
            <div class="dimension-bars">
              <div class="dim-item" v-for="item in mbtiRadarBars" :key="item.label">
                <span class="dim-label">{{ item.label }}</span>
                <div class="dim-bar-bg comparison">
                  <div class="dim-bar-fill left" :style="{ width: item.left + '%' }"></div>
                  <div class="dim-bar-fill right" :style="{ width: item.right + '%' }"></div>
                </div>
                <span class="dim-value">{{ item.left }}% / {{ item.right }}%</span>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- EQ 维度分析 -->
      <template v-if="result.quizCode === 'eq'">
        <div class="dimensions-card">
          <h2>📊 五维能力分析</h2>
          <div class="chart-container">
            <canvas ref="eqRadarChart"></canvas>
          </div>
          <div class="dim-list">
            <div class="dim-item" v-for="dim in eqDimensions" :key="dim.name">
              <span class="dim-label">{{ dim.name }}</span>
              <div class="dim-bar-bg">
                <div class="dim-bar-fill" :style="{ width: dim.percent + '%' }"></div>
              </div>
              <span class="dim-value">{{ dim.score }}/{{ dim.maxScore }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- 心理成熟度 维度分析 -->
      <template v-if="result.quizCode === 'age'">
        <div class="dimensions-card">
          <h2>📊 六大维度分析</h2>
          <div class="dim-list">
            <div class="dim-item" v-for="dim in ageDimensions" :key="dim.name">
              <span class="dim-label">{{ dim.name }}</span>
              <div class="dim-bar-bg">
                <div class="dim-bar-fill" :style="{ width: dim.percent + '%' }"></div>
              </div>
              <span class="dim-value">{{ dim.score }}/{{ dim.maxScore }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- 性格色彩 四色分析 -->
      <template v-if="result.quizCode === 'color'">
        <div class="dimensions-card">
          <h2>🎨 四色分析</h2>
          <div class="color-list">
            <div class="color-item" v-for="color in colorData" :key="color.name">
              <div class="color-label">
                <span class="color-dot" :class="color.class"></span>
                {{ color.name }}
              </div>
              <div class="color-bar-bg">
                <div class="color-bar-fill" :class="color.class" :style="{ width: color.percent + '%' }"></div>
              </div>
              <span class="color-value">{{ color.percent }}%</span>
              <span class="color-trait">{{ color.trait }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- 建议/解读卡片 -->
      <template v-if="result.quizCode === 'mbti'">
        <div class="suggestion-card">
          <h3>💡 职业建议</h3>
          <div class="suggestion-item">
            <h4>🎯 适合职业</h4>
            <p>{{ mbtiSuggestions.careers }}</p>
          </div>
          <div class="suggestion-item">
            <h4>💪 核心优势</h4>
            <p>{{ mbtiSuggestions.advantages }}</p>
          </div>
          <div class="suggestion-item">
            <h4>🌱 成长建议</h4>
            <p>{{ mbtiSuggestions.growth }}</p>
          </div>
        </div>
      </template>

      <template v-if="result.quizCode === 'eq'">
        <div class="insight-card">
          <h2>💡 情商解读</h2>
          <div class="insight-item advantage">
            <h3>✨ 优势</h3>
            <p>{{ eqInsights.advantage }}</p>
          </div>
          <div class="insight-item suggestion">
            <h3>📈 建议提升</h3>
            <p>{{ eqInsights.suggestion }}</p>
          </div>
          <div class="insight-item highlight">
            <h3>🌟 高情商表现</h3>
            <p>{{ eqInsights.highlight }}</p>
          </div>
        </div>
      </template>

      <template v-if="result.quizCode === 'age'">
        <div class="insight-card">
          <h2>💡 成熟度解读</h2>
          <div class="insight-item advantage">
            <h3>✨ 优势</h3>
            <p>{{ ageInsights.advantage }}</p>
          </div>
          <div class="insight-item suggestion">
            <h3>📈 建议提升</h3>
            <p>{{ ageInsights.suggestion }}</p>
          </div>
        </div>
      </template>

      <template v-if="result.quizCode === 'color'">
        <div class="insight-card">
          <h2>💡 性格解读</h2>
          <div class="combo-section">
            <h3>{{ comboTitle }}</h3>
            <p>{{ colorInsights.combo }}</p>
          </div>
          <div class="career-section">
            <h3>💼 适合职业</h3>
            <p>{{ colorInsights.careers }}</p>
          </div>
        </div>
      </template>

      <!-- 分享卡片 -->
      <div class="share-card-preview">
        <h3>📤 分享给朋友</h3>
        <div class="share-card" :style="{ background: shareCardGradient }">
          <div class="share-card-icon">{{ shareCardIcon }}</div>
          <template v-if="result.quizCode === 'mbti'">
            <div class="share-card-type">{{ result.resultType }}</div>
            <div class="share-card-name">{{ mbtiTypeName }}</div>
            <div class="share-card-desc">{{ mbtiShareDesc }}</div>
            <div class="share-card-compare">🔥 超越{{ mbtiComparePercent }}%用户</div>
          </template>
          <template v-if="result.quizCode === 'eq'">
            <div class="share-card-title">EQ情商测试</div>
            <div class="share-card-score">{{ eqTotalScore }}</div>
            <div class="share-card-level">{{ eqLevelText }}</div>
            <div class="share-card-compare">🔥 超越{{ eqComparePercent }}%用户</div>
          </template>
          <template v-if="result.quizCode === 'age'">
            <div class="share-card-title">心理成熟度测试</div>
            <div class="share-card-level">{{ ageLevelText }}</div>
            <div class="share-card-score">得分 {{ ageScore }}/{{ ageTotalScore }}</div>
            <div class="share-card-compare">🔥 超越{{ ageComparePercent }}%用户</div>
          </template>
          <template v-if="result.quizCode === 'color'">
            <div class="share-card-title">性格色彩测试</div>
            <div class="share-card-combo">{{ comboEmoji }} {{ mainColor.name }} + {{ subColor ? subColor.name : '' }}</div>
            <div class="share-card-type">{{ colorShareType }}</div>
          </template>
          <div class="share-card-source">mindceshi.cn</div>
        </div>
      </div>

      <!-- 付费解锁 - 敬请期待 -->
      <div class="paywall-card">
        <h3>🔮 敬请期待</h3>
        <p>更多深度分析功能即将上线</p>
      </div>

      <!-- 操作按钮 -->
      <div class="result-actions">
        <button class="btn-result btn-secondary" @click="retest">🔄 重新测评</button>
        <button class="btn-result btn-primary" @click="shareResult">📱 分享结果</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Chart, registerables } from 'chart.js'
import { getQuizByCode } from '@/data/quizzes'

Chart.register(...registerables)

const router = useRouter()
const route = useRoute()

// Chart refs
const radarChart = ref(null)
const gaugeChart = ref(null)
const colorChart = ref(null)
const eqRadarChart = ref(null)

// Result data
const result = ref({
  quizCode: 'mbti',
  resultType: '',
  resultName: '',
  resultNameEn: '',
  tags: [],
  score: 0,
  answers: {}
})

const isLoaded = ref(false)

// Computed properties for different test types
const resultBadge = computed(() => {
  const badges = {
    mbti: '🌟 测评结果',
    eq: '💡 测评结果',
    age: '🌟 测评结果',
    color: '🎨 测评结果'
  }
  return badges[result.value.quizCode] || '🌟 测评结果'
})

const resultTitle = computed(() => {
  const titles = {
    eq: '你的情商指数',
    age: '心理成熟度',
    color: '你的性格色彩'
  }
  return titles[result.value.quizCode] || ''
})

// MBTI computed
const mbtiScore = computed(() => result.value.score || 78)
// MBTI比较百分比 - 基于字母偏好强度计算
const mbtiComparePercent = computed(() => {
  const answers = Array.isArray(result.value.answers) ? result.value.answers : []
  if (!answers || answers.length === 0) return 50

  // 统计字母计数
  const counts = { e: 0, i: 0, s: 0, n: 0, t: 0, f: 0, j: 0, p: 0 }

  // 获取题目数据
  const quiz = getQuizByCode('mbti')
  const questions = quiz?.questions || []

  // 统计各字母出现次数
  answers.forEach((answerIndex, qIndex) => {
    if (answerIndex === undefined) return
    const question = questions[qIndex]
    if (!question || !question.options) return
    const option = question.options[answerIndex]
    if (!option || !option.value) return

    const v = option.value.toString().toLowerCase()
    if (counts[v] !== undefined) {
      counts[v]++
    }
  })

  // 计算每个维度的偏好强度 (0-100)
  // E/I: 偏好越强，越稀有
  const eiTotal = counts.e + counts.i || 1
  const eiStrength = Math.abs(counts.e - counts.i) / eiTotal * 100

  const snTotal = counts.s + counts.n || 1
  const snStrength = Math.abs(counts.s - counts.n) / snTotal * 100

  const tfTotal = counts.t + counts.f || 1
  const tfStrength = Math.abs(counts.t - counts.f) / tfTotal * 100

  const jpTotal = counts.j + counts.p || 1
  const jpStrength = Math.abs(counts.j - counts.p) / jpTotal * 100

  // 平均偏好强度
  const avgStrength = (eiStrength + snStrength + tfStrength + jpStrength) / 4

  // 转换为百分比：强度50%=50%的人，强度100%=99%的人
  const percentile = Math.round(50 + avgStrength * 0.5)
  return Math.min(99, Math.max(10, percentile))
})
const mbtiDimensions = computed(() => {
  const answers = Array.isArray(result.value.answers) ? result.value.answers : []
  let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0
  answers.forEach(v => {
    if (v === 'E') e++; if (v === 'I') i++;
    if (v === 'S') s++; if (v === 'N') n++;
    if (v === 'T') t++; if (v === 'F') f++;
    if (v === 'J') j++; if (v === 'P') p++;
  })
  const total = e + i || 1
  return {
    'E-I': { percent: Math.round((i / total) * 100), result: '内向' },
    'S-N': { percent: Math.round((n / total) * 100), result: '直觉' },
    'T-F': { percent: Math.round((t / total) * 100), result: '思考' },
    'J-P': { percent: Math.round((j / total) * 100), result: '判断' }
  }
})

// MBTI雷达图8个维度的真实数据 - 供雷达图和进度条使用
const mbtiRadarData = computed(() => {
  // 标签顺序和数据顺序必须对应：[E, I, S, N, T, F, J, P]
  const radarLabels = ['外向E', '内向I', '感觉S', '直觉N', '思考T', '情感F', '判断J', '知觉P']
  const defaultRadarData = [50, 50, 50, 50, 50, 50, 50, 50]

  // 如果没有答案，返回默认值
  const answers = result.value?.answers
  if (!answers || (Array.isArray(answers) && answers.length === 0) || (typeof answers === 'object' && Object.keys(answers).length === 0)) {
    return {
      labels: radarLabels,
      data: defaultRadarData
    }
  }

  // 统计每个字母的出现次数
  const letterCounts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  const letterTotalQuestions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  // 获取题目数据
  const quiz = getQuizByCode(result.value.quizCode)
  const questions = quiz?.questions || []

  // 遍历用户答案，统计各字母出现次数 - 答案存储的是选项索引
  Object.entries(answers).forEach(([index, answer]) => {
    const questionIndex = parseInt(index)
    const question = questions[questionIndex]
    if (!question?.dimension || !question?.options) return

    // 获取用户选择选项的实际value值（字母）
    const selectedOption = question.options[answer]
    const selectedValue = selectedOption?.value

    if (!selectedValue) return

    const dimension = question.dimension // 如 'EI', 'SN', 'TF', 'JP'

    // 遍历维度中的每个字母
    dimension.split('').forEach(char => {
      const upperChar = char.toUpperCase()
      if (letterTotalQuestions[upperChar] !== undefined) {
        letterTotalQuestions[upperChar]++

        // 判断用户选择的选项value是否等于该字母（不区分大小写）
        if (String(selectedValue).toUpperCase() === upperChar) {
          letterCounts[upperChar]++
        }
      }
    })
  })

  // 计算雷达图数据（百分比）- 顺序必须与radarLabels对应：[E, I, S, N, T, F, J, P]
  const radarData = [
    letterTotalQuestions.E > 0 ? Math.round((letterCounts.E / letterTotalQuestions.E) * 100) : 50,
    letterTotalQuestions.I > 0 ? Math.round((letterCounts.I / letterTotalQuestions.I) * 100) : 50,
    letterTotalQuestions.S > 0 ? Math.round((letterCounts.S / letterTotalQuestions.S) * 100) : 50,
    letterTotalQuestions.N > 0 ? Math.round((letterCounts.N / letterTotalQuestions.N) * 100) : 50,
    letterTotalQuestions.T > 0 ? Math.round((letterCounts.T / letterTotalQuestions.T) * 100) : 50,
    letterTotalQuestions.F > 0 ? Math.round((letterCounts.F / letterTotalQuestions.F) * 100) : 50,
    letterTotalQuestions.J > 0 ? Math.round((letterCounts.J / letterTotalQuestions.J) * 100) : 50,
    letterTotalQuestions.P > 0 ? Math.round((letterCounts.P / letterTotalQuestions.P) * 100) : 50,
  ]

  return {
    labels: radarLabels,
    data: radarData
  }
})

// 雷达图数据进度条 - 显示4个维度的对比
const mbtiRadarBars = computed(() => {
  const { labels, data } = mbtiRadarData.value
  // labels: ['外向E', '内向I', '感觉S', '直觉N', '思考T', '情感F', '判断J', '知觉P']
  // data: [E, I, S, N, T, F, J, P] 百分比

  // 构建4个维度的对比数据
  const dimensions = [
    { label: '外向-内向', left: data[0], right: data[1] },   // E vs I
    { label: '感觉-直觉', left: data[2], right: data[3] },  // S vs N
    { label: '思考-情感', left: data[4], right: data[5] },  // T vs F
    { label: '判断-知觉', left: data[6], right: data[7] }   // J vs P
  ]

  return dimensions
})

const mbtiTypeName = computed(() => {
  const names = {
    'INTJ': '建筑师', 'INTP': '逻辑学家', 'ENTJ': '指挥官', 'ENTP': '辩论家',
    'INFJ': '提倡者', 'INFP': '调停者', 'ENFJ': '主人公', 'ENFP': '竞选者',
    'ISTJ': '物流师', 'ISFJ': '守卫者', 'ESTJ': '总经理', 'ESFJ': '执政官',
    'ISTP': '鉴赏家', 'ISFP': '探险家', 'ESTP': '企业家', 'ESFP': '表演者'
  }
  return names[result.value.resultType] || '探险家'
})

const mbtiShareDesc = computed(() => {
  const descs = {
    'INTJ': '战略思维强、独立分析',
    'INTP': '逻辑思考、追求真理',
    'ENTJ': '领导力强、决策果断',
    'ENTP': '思维活跃、善于辩论',
    'INFJ': '理想主义、富有洞察',
    'INFP': '追求意义、创意无限',
    'ENFJ': '天生的领导者、善于激励',
    'ENFP': '热情洋溢、创意十足',
    'ISTJ': '可靠务实、注重细节',
    'ISFJ': '忠诚体贴、任劳任怨',
    'ESTJ': '组织能力强、务实可靠',
    'ESFJ': '关心他人、乐于助人',
    'ISTP': '灵活多变、动手能力强',
    'ISFP': '温柔敏感、艺术气质',
    'ESTP': '行动派、善于交际',
    'ESFP': '热情奔放、活在当下'
  }
  return descs[result.value.resultType] || '独特个性'
})

// MBTI 标签
const mbtiTags = computed(() => {
  return result.value.tags && result.value.tags.length > 0
    ? result.value.tags
    : ['#理性', '#独立', '#策划者']
})

// MBTI 职业建议 - 根据用户类型动态获取
const mbtiSuggestions = computed(() => {
  const mbtiType = result.value.resultType

  // 从题库获取对应类型的详细结果
  const quiz = getQuizByCode('mbti')
  const results = quiz?.results || {}
  const mbtiResult = results[mbtiType] || {}

  // 提取优势
  const advantages = mbtiResult.strengths?.join('、') || '待定'

  // 提取成长建议
  const growth = mbtiResult.weaknesses?.map(w => `注意${w}`).join('，') || '持续学习和成长'

  // 从 detail 中提取职业建议
  let careers = '待定'
  const detail = mbtiResult.detail || ''
  // 匹配职业建议：从【职业建议】到下一个【或结尾
  const careerMatch = detail.match(/【职业建议】[\s\S]*?：([\s\S]*?)(?:【|$)/)
  if (careerMatch) {
    careers = careerMatch[1].trim().replace(/\n/g, '、')
  }

  return {
    careers,
    advantages,
    growth
  }
})

// EQ computed
const eqTotalScore = computed(() => {
  const answers = Array.isArray(result.value.answers) ? result.value.answers : []

  // 从答案计算实际分数
  const quiz = getQuizByCode('eq')
  const questions = quiz?.questions || []
  let total = 0

  answers.forEach((answerIndex, qIndex) => {
    if (answerIndex === undefined) return
    const question = questions[qIndex]
    if (!question || !question.options) return
    const option = question.options[answerIndex]
    if (option && option.value !== undefined) {
      total += option.value
    }
  })

  return total
})

const eqLevel = computed(() => {
  const score = eqTotalScore.value
  if (score >= 80) return 'high'
  if (score >= 60) return 'mid-high'
  if (score >= 40) return 'mid'
  return 'low'
})

const eqLevelText = computed(() => {
  const texts = {
    high: '🌟 高情商',
    'mid-high': '👍 中高情商',
    mid: '😊 中等情商',
    low: '📈 需提升'
  }
  return texts[eqLevel.value]
})

// EQ超越百分比 - 根据分数计算
const eqComparePercent = computed(() => {
  const score = eqTotalScore.value
  // 0分=10%, 100分=99%
  const percent = Math.round(10 + score * 0.89)
  return Math.min(99, Math.max(10, percent))
})

// EQ维度数据 - 根据用户答案真实计算
const eqDimensions = computed(() => {
  const defaultEqDimensions = [
    { name: '自我认知', score: 0, maxScore: 20, percent: 0 },
    { name: '情绪管理', score: 0, maxScore: 20, percent: 0 },
    { name: '动机激励', score: 0, maxScore: 20, percent: 0 },
    { name: '社交认知', score: 0, maxScore: 20, percent: 0 },
    { name: '社交技巧', score: 0, maxScore: 20, percent: 0 }
  ]

  // 如果没有答案，返回默认值
  const answers = result.value?.answers
  if (!answers || (Array.isArray(answers) && answers.length === 0) || (typeof answers === 'object' && Object.keys(answers).length === 0)) {
    return defaultEqDimensions
  }

  const dimensionNames = {
    selfAwareness: '自我认知',
    selfManagement: '情绪管理',
    motivation: '动机激励',
    socialAwareness: '社交认知',
    relationshipManagement: '社交技巧'
  }

  const dims = {}
  Object.keys(dimensionNames).forEach(key => dims[key] = { score: 0, maxScore: 20 })

  // 获取题目数据
  const quiz = getQuizByCode('eq')
  const questions = quiz?.questions || []

  // 遍历用户答案 - 答案存储的是选项索引(0,1,2,3,4)，需要获取选项的value值
  Object.entries(answers).forEach(([index, answer]) => {
    const questionIndex = parseInt(index)
    const question = questions[questionIndex]
    const dimension = question?.dimension

    if (dimension && dims[dimension] && question?.options) {
      // answer是选项索引，获取该索引对应选项的分值
      const optionValue = question.options[answer]?.value
      if (optionValue !== undefined) {
        dims[dimension].score += optionValue
      }
    }
  })

  return Object.entries(dims).map(([key, data]) => ({
    name: dimensionNames[key],
    score: data.score,
    maxScore: data.maxScore,
    percent: Math.round((data.score / data.maxScore) * 100)
  }))
})

// EQ 解读 - 根据用户等级动态获取
const eqInsights = computed(() => {
  const level = eqLevel.value

  // 映射 eqLevel 到 quiz results 的 key
  const resultKeyMap = {
    'high': 'high',
    'mid-high': 'mediumHigh',
    'mid': 'medium',
    'low': 'low'
  }

  const quiz = getQuizByCode('eq')
  const results = quiz?.results || {}
  const resultData = results[resultKeyMap[level]] || {}

  // 从 detail 中提取内容
  const detail = resultData.detail || ''

  // 简单解析 - 提取【建议】部分
  let suggestion = ''
  const lines = detail.split('\n')
  let inSuggestion = false

  lines.forEach(line => {
    if (line.includes('【建议】')) {
      inSuggestion = true
    } else if (inSuggestion && line.trim()) {
      suggestion += line.trim() + ' '
    }
  })

  return {
    advantage: resultData.description || '',
    suggestion: suggestion.trim() || '持续学习和成长',
    highlight: resultData.description || ''
  }
})

// 心理成熟度 computed - 从用户答案计算真实分数
const ageScore = computed(() => {
  const answers = result.value?.answers
  if (!answers || (Array.isArray(answers) && answers.length === 0)) {
    return 0
  }

  // 从答案计算分数
  const quiz = getQuizByCode('age')
  const questions = quiz?.questions || []
  let totalScore = 0

  answers.forEach((answer, questionIndex) => {
    if (answer === undefined || answer === null) return
    const question = questions[questionIndex]
    if (!question || !question.options) return
    const option = question.options[answer]
    if (option && option.value !== undefined) {
      totalScore += option.value
    }
  })

  return totalScore
})
const ageTotalScore = computed(() => 48)
// 心理成熟度百分比 - 根据分数计算
// 分数范围 12-48，12分超越~10%，24分超越~50%，36分超越~90%，48分超越~99%
const ageComparePercent = computed(() => {
  const score = ageScore.value
  const minScore = 12
  const maxScore = 48
  // 线性映射：12分->10%, 48分->99%
  const percent = Math.round(((score - minScore) / (maxScore - minScore)) * 89 + 10)
  return Math.min(99, Math.max(10, percent))
})

const ageLevel = computed(() => {
  const score = ageScore.value
  if (score >= 36) return 'high'
  if (score >= 24) return 'mid'
  if (score >= 12) return 'low'
  return 'needs'
})

const ageLevelText = computed(() => {
  const texts = {
    high: '🌿 高成熟度',
    mid: '🌱 中等成熟度',
    low: '🌾 偏低',
    needs: '🌱 需提升'
  }
  return texts[ageLevel.value]
})

// 心理成熟度维度数据 - 根据用户答案真实计算
const ageDimensions = computed(() => {
  const defaultAgeDimensions = [
    { name: '情绪稳定性', score: 0, maxScore: 8, percent: 0 },
    { name: '责任意识', score: 0, maxScore: 8, percent: 0 },
    { name: '抗压能力', score: 0, maxScore: 8, percent: 0 },
    { name: '成长心态', score: 0, maxScore: 8, percent: 0 },
    { name: '人际关系', score: 0, maxScore: 8, percent: 0 },
    { name: '财务成熟度', score: 0, maxScore: 8, percent: 0 }
  ]

  // 如果没有答案，返回默认值
  const answers = result.value?.answers
  if (!answers || (Array.isArray(answers) && answers.length === 0) || (typeof answers === 'object' && Object.keys(answers).length === 0)) {
    return defaultAgeDimensions
  }

  const dimensionNames = {
    emotional: '情绪稳定性',
    responsibility: '责任意识',
    stress: '抗压能力',
    growth: '成长心态',
    relationship: '人际关系',
    finance: '财务成熟度'
  }

  const dims = {}
  Object.keys(dimensionNames).forEach(key => dims[key] = { score: 0, maxScore: 8 })

  // 获取题目数据
  const quiz = getQuizByCode('age')
  const questions = quiz?.questions || []

  // 遍历用户答案 - 答案存储的是选项索引(0,1,2,3)，需要获取选项的value值
  answers.forEach((answer, questionIndex) => {
    const question = questions[questionIndex]
    if (!question) return

    const dimension = question?.dimension

    if (dimension && dims[dimension] && question?.options && question.options[answer]) {
      // answer是选项索引，获取该索引对应选项的分值
      const optionValue = question.options[answer]?.value
      if (optionValue !== undefined) {
        dims[dimension].score += optionValue
      }
    }
  })

  return Object.entries(dims).map(([key, data]) => ({
    name: dimensionNames[key],
    score: data.score,
    maxScore: data.maxScore,
    percent: data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0
  }))
  return resultDims
})

// 成熟度解读 - 根据用户分数动态获取
const ageInsights = computed(() => {
  const level = ageLevel.value

  // 映射 ageLevel 到 quiz results 的 key
  const resultKeyMap = {
    'high': 'high',
    'mid': 'medium',
    'low': 'low',
    'needs': 'needImprovement'
  }

  const quiz = getQuizByCode('age')
  const results = quiz?.results || {}
  const ageResult = results[resultKeyMap[level]] || {}

  // 从 detail 中提取优势和建议
  const detail = ageResult.detail || ''

  // 简单解析 detail 文本
  const lines = detail.split('\n')
  let advantage = ''
  let suggestion = ''

  let currentSection = ''
  lines.forEach(line => {
    if (line.includes('【建议】')) {
      currentSection = 'suggestion'
    } else if (line.startsWith('【') && line.endsWith('】')) {
      currentSection = line
    } else if (line.trim() && currentSection) {
      if (currentSection === 'suggestion') {
        suggestion += line.trim() + ' '
      }
    }
  })

  // 如果解析失败，使用默认文本
  if (!advantage) {
    advantage = ageResult.description || ''
  }
  if (!suggestion) {
    suggestion = '持续关注个人成长，逐步提升心理成熟度。'
  }

  return {
    advantage,
    suggestion: suggestion.trim()
  }
})

// 性格色彩 computed - 根据用户答案真实计算
const defaultColorData = [
  { name: '红色', percent: 0, trait: '行动力强', class: 'red', score: 0, maxScore: 20 },
  { name: '蓝色', percent: 0, trait: '追求完美', class: 'blue', score: 0, maxScore: 20 },
  { name: '黄色', percent: 0, trait: '社交达人', class: 'yellow', score: 0, maxScore: 20 },
  { name: '绿色', percent: 0, trait: '稳定温和', class: 'green', score: 0, maxScore: 20 }
]

const colorData = computed(() => {
  // 如果没有答案，返回默认值
  const answers = result.value?.answers
  if (!answers || (Array.isArray(answers) && answers.length === 0) || (typeof answers === 'object' && Object.keys(answers).length === 0)) {
    return defaultColorData
  }

  const colorInfo = {
    red: { name: '红色', trait: '行动力强', class: 'red' },
    blue: { name: '蓝色', trait: '追求完美', class: 'blue' },
    yellow: { name: '黄色', trait: '社交达人', class: 'yellow' },
    green: { name: '绿色', trait: '稳定温和', class: 'green' }
  }

  // 统计各颜色得分
  const scores = { red: 0, blue: 0, yellow: 0, green: 0 }
  const maxScore = 20 // 每颜色5题，每题4分 = 20分满分

  // 获取题目数据
  const quiz = getQuizByCode('color')
  const questions = quiz?.questions || []

  // 遍历用户答案 - 答案存储的是选项索引(0,1,2,3,4)，需要获取选项的value值
  Object.entries(answers).forEach(([index, answer]) => {
    const questionIndex = parseInt(index)
    const question = questions[questionIndex]
    const dimension = question?.dimension // 'red', 'blue', 'yellow', 'green'

    if (dimension && scores[dimension] !== undefined && question?.options) {
      // answer是选项索引，获取该索引对应选项的分值
      const optionValue = question.options[answer]?.value
      if (optionValue !== undefined) {
        scores[dimension] += optionValue
      }
    }
  })

  // 计算各颜色的百分比 = 该颜色得分 / 该颜色满分 * 100
  const resultData = Object.entries(scores).map(([key, score]) => ({
    ...colorInfo[key],
    score: score,
    maxScore: maxScore,
    percent: Math.round((score / maxScore) * 100)
  }))

  // 按百分比降序排列
  return resultData.sort((a, b) => b.percent - a.percent)
})

const mainColor = computed(() => colorData.value[0] || { name: '红色', trait: '行动派' })
const subColor = computed(() => colorData.value[1] || null)

const mainColorIcon = computed(() => {
  const icons = { '红色': '🔴', '蓝色': '🔵', '黄色': '🟡', '绿色': '🟢' }
  return icons[mainColor.value.name] || '🔴'
})

const subColorIcon = computed(() => {
  if (!subColor.value) return ''
  const icons = { '红色': '🔴', '蓝色': '🔵', '黄色': '🟡', '绿色': '🟢' }
  return icons[subColor.value.name] || '🔵'
})

const comboTitle = computed(() => {
  const colors = [mainColor.value.name, subColor.value?.name].filter(Boolean).join('+')
  return `🎨 你是${colors}`
})

// 性格色彩超越百分比 - 根据主色分数计算
const colorComparePercent = computed(() => {
  const mainPercent = mainColor.value.percent || 0
  // 分数越高越稀有：0%=10%, 100%=99%
  const percent = Math.round(10 + mainPercent * 0.89)
  return Math.min(99, Math.max(10, percent))
})

const colorShareType = computed(() => {
  if (mainColor.value.name === '红色' && subColor.value?.name === '蓝色') return '高效领导者'
  if (mainColor.value.name === '蓝色') return '完美主义者'
  if (mainColor.value.name === '黄色') return '社交达人'
  if (mainColor.value.name === '绿色') return '和平使者'
  return mainColor.value.trait
})

// 性格色彩解读 - 从题库获取职业建议
const colorInsights = computed(() => {
  const primaryKey = mainColor.value.class // 'red', 'blue', 'yellow', 'green'

  // 从题库获取对应颜色的结果
  const quiz = getQuizByCode('color')
  const results = quiz?.results || {}
  const colorResult = results[primaryKey] || {}

  // 从 detail 中提取职业建议
  let careers = ''
  const detail = colorResult.detail || ''
  // 匹配职业建议：从【职业建议】到下一个【或结尾
  const careerMatch = detail.match(/【职业建议】[\s\S]*?：([\s\S]*?)(?:【|$)/)
  if (careerMatch) {
    careers = careerMatch[1].trim().replace(/\n/g, '、')
  }

  return {
    combo: `${mainColor.value.name}+${subColor.value?.name || ''} = ${colorShareType.value}。你既有${mainColor.value.trait}，又具备${subColor.value?.trait || ''}的特点。`,
    careers: careers || '项目经理、创业者、咨询顾问、企业高管、投资人'
  }
})

// Header gradient
const headerGradient = computed(() => {
  const gradients = {
    mbti: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    eq: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    age: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    color: 'linear-gradient(135deg, #EF4444 0%, #F97316 20%, #EAB308 60%, #22C55E 100%)'
  }
  return gradients[result.value.quizCode] || gradients.mbti
})

// Share card gradient
const shareCardGradient = computed(() => {
  const gradients = {
    mbti: 'linear-gradient(135deg, #667eea, #764ba2)',
    eq: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
    age: 'linear-gradient(135deg, #10B981, #059669)',
    color: 'linear-gradient(135deg, #EF4444, #F97316, #EAB308, #22C55E)'
  }
  return gradients[result.value.quizCode] || gradients.mbti
})

const shareCardIcon = computed(() => {
  const icons = {
    mbti: '🧠',
    eq: '💡',
    age: '🌿',
    color: '🎨'
  }
  return icons[result.value.quizCode] || '🧠'
})

const comboEmoji = computed(() => {
  const emojis = { '红色': '🔴', '蓝色': '🔵', '黄色': '🟡', '绿色': '🟢' }
  return `${emojis[mainColor.value.name] || ''} ${emojis[subColor.value?.name] || ''}`
})

// Initialize charts
const initCharts = async () => {
  await nextTick()

  // MBTI Radar Chart
  if (result.value.quizCode === 'mbti' && radarChart.value) {
    const { labels, data } = mbtiRadarData.value
    new Chart(radarChart.value.getContext('2d'), {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: '你的倾向',
          data: data,
          fill: true,
          backgroundColor: 'rgba(79, 70, 229, 0.2)',
          borderColor: '#4F46E5',
          borderWidth: 2,
          pointBackgroundColor: '#4F46E5'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { display: false },
            grid: { color: '#E5E7EB' },
            pointLabels: { font: { size: 12 }, color: '#374151' }
          }
        },
        plugins: { legend: { display: false } }
      }
    })
  }

  // EQ Gauge Chart
  if (result.value.quizCode === 'eq' && gaugeChart.value) {
    new Chart(gaugeChart.value.getContext('2d'), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [eqTotalScore.value, 100 - eqTotalScore.value],
          backgroundColor: ['#3B82F6', '#E5E7EB'],
          borderWidth: 0,
          cutout: '75%',
          rotation: -90,
          circumference: 180
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    })

    // EQ Radar Chart
    if (eqRadarChart.value) {
      const dimData = eqDimensions.value
      new Chart(eqRadarChart.value.getContext('2d'), {
        type: 'radar',
        data: {
          labels: dimData.map(d => d.name),
          datasets: [{
            label: '你的得分',
            data: dimData.map(d => d.score),
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3B82F6',
            borderWidth: 2,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#3B82F6'
          }, {
            label: '平均分',
            data: dimData.map(() => 14),
            fill: true,
            backgroundColor: 'rgba(156, 163, 175, 0.1)',
            borderColor: '#9CA3AF',
            borderDash: [5, 5],
            borderWidth: 1,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 20,
              ticks: { stepSize: 5, display: false },
              grid: { color: '#E5E7EB' },
              pointLabels: { font: { size: 12, weight: '500' }, color: '#374151' }
            }
          },
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      })
    }
  }

  // 性格色彩 Donut Chart
  if (result.value.quizCode === 'color' && colorChart.value) {
    // 颜色映射：根据class动态获取颜色
    const colorMap = {
      'red': '#EF4444',
      'blue': '#3B82F6',
      'yellow': '#F59E0B',
      'green': '#10B981'
    }
    const dynamicColors = colorData.value.map(c => colorMap[c.class] || '#999999')

    new Chart(colorChart.value.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: colorData.value.map(c => c.name),
        datasets: [{
          // 使用实际分数而不是百分比，这样加起来才等于100%
          data: colorData.value.map(c => c.score),
          backgroundColor: dynamicColors,
          borderWidth: 0,
          cutout: '65%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    })
  }
}

// Load result data
const loadResult = () => {
  // 首先设置默认MBTI数据
  const defaultResult = {
    quizCode: 'mbti',
    resultType: 'INTJ',
    resultName: '👑 建筑师',
    resultNameEn: 'Architect',
    tags: ['#理性', '#独立', '#策划者'],
    score: 78,
    answers: {
      0: 'I', 1: 'I', 2: 'N', 3: 'N', 4: 'T', 5: 'T', 6: 'J', 7: 'J',
      8: 'I', 9: 'N', 10: 'T', 11: 'J'
    }
  }

  // 从testHistory加载结果
  const testHistory = JSON.parse(localStorage.getItem('testHistory') || '[]')
  const resultId = route.params.id

  if (resultId && testHistory.length > 0) {
    // 尝试找到对应ID的结果
    const savedResult = testHistory.find(r => r.id === resultId)
    if (savedResult) {
      result.value = {
        quizCode: savedResult.quizCode,
        resultType: savedResult.resultType,
        resultName: savedResult.resultName,
        resultNameEn: savedResult.resultNameEn || '',
        tags: savedResult.tags || [],
        score: savedResult.score || 0,
        // 确保答案是数组格式
        answers: Array.isArray(savedResult.answers) ? savedResult.answers : Object.values(savedResult.answers || {})
      }
    } else if (testHistory.length > 0) {
      // 没找到则使用最新结果
      const latestResult = testHistory[0]
      result.value = {
        quizCode: latestResult.quizCode,
        resultType: latestResult.resultType,
        resultName: latestResult.resultName,
        resultNameEn: latestResult.resultNameEn || '',
        tags: latestResult.tags || [],
        score: latestResult.score || 0,
        // 确保答案是数组格式
        answers: Array.isArray(latestResult.answers) ? latestResult.answers : Object.values(latestResult.answers || {})
      }
    } else {
      result.value = defaultResult
    }
  } else if (testHistory.length > 0) {
    // 没有ID但有历史记录，使用最新结果
    const latestResult = testHistory[0]
    result.value = {
      quizCode: latestResult.quizCode,
      resultType: latestResult.resultType,
      resultName: latestResult.resultName,
      resultNameEn: latestResult.resultNameEn || '',
      tags: latestResult.tags || [],
      score: latestResult.score || 0,
      // 确保答案是数组格式
      answers: Array.isArray(latestResult.answers) ? latestResult.answers : Object.values(latestResult.answers || {})
    }
  } else {
    // 没有数据时使用默认演示数据
    result.value = defaultResult
  }

  isLoaded.value = true

  initCharts()
}

// Navigation
const retest = () => {
  if (result.value?.quizCode) {
    router.push(`/test/${result.value.quizCode}`)
  } else {
    router.push('/')
  }
}

const shareResult = () => {
  alert('生成分享图片')
}

onMounted(() => {
  loadResult()
})
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  padding: 20px;
  padding-bottom: 40px;
}

/* 性格色彩背景 - 默认 */
.result-page.page-color {
  background: linear-gradient(135deg, #EF4444 0%, #F97316 20%, #EAB308 60%, #22C55E 100%);
}

/* 性格色彩背景 - 红色主色 */
.result-page.page-color-red {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
}

/* 性格色彩背景 - 蓝色主色 */
.result-page.page-color-blue {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
}

/* 性格色彩背景 - 黄色主色 */
.result-page.page-color-yellow {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
}

/* 性格色彩背景 - 绿色主色 */
.result-page.page-color-green {
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
}

/* 心理成熟度背景 */
.result-page.page-age {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
}

/* EQ背景 */
.result-page.page-eq {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
}

/* 容器 */
.result-container {
  max-width: 800px;
  margin: 0 auto;
}

/* 顶部结果卡片 */
.result-header {
  background: white;
  border-radius: 24px 24px 0 0;
  padding: 40px 30px 30px;
  text-align: center;
  color: #1F2937;
}

/* 性格色彩badge */
.result-header.header-color .result-badge {
  background: #FEF2F2;
  color: #991B1B;
}

/* 性格色彩头部 - 红色主色 */
.result-header.header-color.page-color-red .result-badge {
  background: #FEE2E2;
  color: #DC2626;
}

/* 性格色彩头部 - 蓝色主色 */
.result-header.header-color.page-color-blue .result-badge {
  background: #DBEAFE;
  color: #1D4ED8;
}

/* 性格色彩头部 - 黄色主色 */
.result-header.header-color.page-color-yellow .result-badge {
  background: #FEF3C7;
  color: #D97706;
}

/* 性格色彩头部 - 绿色主色 */
.result-header.header-color.page-color-green .result-badge {
  background: #DCFCE7;
  color: #16A34A;
}

/* EQ/心理成熟度/性格色彩 - 白色头部（使用默认样式） */

.result-badge {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 20px;
  background: #FEF3C7;
  color: #92400E;
}

.result-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* MBTI 样式 */
.mbti-type {
  font-size: 80px;
  font-weight: 800;
  letter-spacing: 12px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mbti-name {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
}

.mbti-tags {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.mbti-tag {
  padding: 6px 14px;
  background: #F3F4F6;
  color: #6B7280;
  font-size: 13px;
  border-radius: 20px;
}

/* 分数卡片 */
.score-card {
  background: white;
  border-radius: 0 0 24px 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  margin-bottom: 20px;
}

.score-card h3 {
  font-size: 18px;
  color: #1F2937;
  margin-bottom: 20px;
  text-align: left;
}

.score-card .chart-container {
  height: 280px;
  margin-bottom: 20px;
}

.score-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding-bottom: 24px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 24px;
}

.score-main .score-label {
  margin-right: 0;
}

.score-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(#4F46E5 calc(var(--score).6deg * 3), #E5E7EB 0);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.score-circle::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
}

.score-value {
  position: relative;
  z-index: 1;
  font-size: 42px;
  font-weight: 700;
  color: #1F2937;
}

.score-label {
  font-size: 16px;
  color: #6B7280;
}

.score-compare {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #ECFDF5;
  color: #065F46;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  margin-top: 0;
}

/* EQ 分数区域 */
.eq-score-section {
  padding: 16px;
  background: #F9FAFB;
  border-radius: 12px;
  text-align: center;
}

/* EQ 头部行：等级徽章和百分比并排 */
.eq-header-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.eq-header-row .level-badge {
  margin-bottom: 0;
}

/* 心理成熟度分数区域 */
.age-score-section {
  padding: 20px;
  background: #F9FAFB;
  border-radius: 16px;
  text-align: center;
}

.age-score-main {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.age-score-value {
  font-size: 48px;
  font-weight: 700;
  color: #1F2937;
}

.age-score-total {
  font-size: 18px;
  color: #6B7280;
}

/* 心理成熟度分数 */
.score-section {
  padding: 24px;
  background: #F9FAFB;
  border-radius: 16px;
  margin-top: 20px;
}

.score-main {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

.score-value-large {
  font-size: 48px;
  font-weight: 700;
  color: #1F2937;
}

.score-total {
  font-size: 18px;
  color: #6B7280;
}

/* 等级徽章 */
.level-badge {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  font-size: 20px;
  font-weight: 700;
  border-radius: 30px;
  margin-bottom: 24px;
}

.level-badge.mid {
  background: linear-gradient(135deg, #3B82F6, #2563EB);
}

.level-badge.low, .level-badge.needs {
  background: linear-gradient(135deg, #F59E0B, #D97706);
}

/* EQ 仪表盘 */
.gauge-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.gauge-chart {
  width: 200px;
  height: 200px;
  position: relative;
}

.gauge-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.gauge-score {
  font-size: 48px;
  font-weight: 700;
  color: #1F2937;
}

.gauge-label {
  font-size: 14px;
  color: #6B7280;
}

/* 性格色彩图表 */
.chart-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.donut-chart {
  width: 180px;
  height: 180px;
  position: relative;
}

.color-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  text-align: left;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-dot.red { background: #EF4444; }
.legend-dot.blue { background: #3B82F6; }
.legend-dot.yellow { background: #F59E0B; }
.legend-dot.green { background: #10B981; }

/* 主辅色徽章 */
.color-type {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.type-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
}

.type-badge.main {
  color: white;
}

.type-badge.main.red {
  background: linear-gradient(135deg, #EF4444, #DC2626);
}

.type-badge.main.blue {
  background: linear-gradient(135deg, #3B82F6, #2563EB);
}

.type-badge.main.yellow {
  background: linear-gradient(135deg, #F59E0B, #D97706);
  color: white;
}

.type-badge.main.green {
  background: linear-gradient(135deg, #22C55E, #16A34A);
}

.type-badge.sub {
  color: white;
}

.type-badge.sub.red {
  background: linear-gradient(135deg, #EF4444, #DC2626);
}

.type-badge.sub.blue {
  background: linear-gradient(135deg, #3B82F6, #2563EB);
}

.type-badge.sub.yellow {
  background: linear-gradient(135deg, #F59E0B, #D97706);
}

.type-badge.sub.green {
  background: linear-gradient(135deg, #22C55E, #16A34A);
}

/* 维度分析 */
.dimensions-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-top: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.dimensions-card h2 {
  font-size: 20px;
  color: #1F2937;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.dimensions-card h2::before {
  content: '';
  width: 4px;
  height: 20px;
  background: #10B981;
  border-radius: 2px;
}

.dimensions-card h3 {
  font-size: 18px;
  color: #1F2937;
  margin-bottom: 20px;
}

/* 维度条 */
.dimension-bars, .dim-list {
  display: grid;
  gap: 20px;
}

.dim-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dim-label {
  width: 90px;
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.dim-bar-bg {
  flex: 1;
  height: 16px;
  background: #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
}

.dim-bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.8s ease;
  background: linear-gradient(90deg, #10B981, #34D399);
}

.dim-bar-fill.left {
  background: #3B82F6;
}

.dim-bar-fill.right {
  background: #F59E0B;
}

/* 对比进度条样式 */
.dim-bar-bg.comparison {
  display: flex;
  justify-content: space-between;
}

.dim-value {
  width: 80px;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  text-align: right;
}

/* 四色进度条 */
.color-list {
  display: grid;
  gap: 20px;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.color-label {
  width: 60px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
}

.color-dot {
  width: 14px;
  height: 14px;
  border-radius: 4px;
}

.color-dot.red { background: #EF4444; }
.color-dot.blue { background: #3B82F6; }
.color-dot.yellow { background: #F59E0B; }
.color-dot.green { background: #10B981; }

.color-bar-bg {
  flex: 1;
  height: 20px;
  background: #F3F4F6;
  border-radius: 10px;
  overflow: hidden;
}

.color-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.8s ease;
}

.color-bar-fill.red { background: linear-gradient(90deg, #EF4444, #F87171); }
.color-bar-fill.blue { background: linear-gradient(90deg, #3B82F6, #60A5FA); }
.color-bar-fill.yellow { background: linear-gradient(90deg, #F59E0B, #FBBF24); }
.color-bar-fill.green { background: linear-gradient(90deg, #10B981, #34D399); }

.color-value {
  width: 50px;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
}

.color-trait {
  width: 80px;
  font-size: 12px;
  color: #6B7280;
  text-align: right;
}

/* 雷达图 */
.chart-card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  margin-top: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.chart-container {
  height: 300px;
}

/* 建议卡片 */
.suggestion-card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  margin-top: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.suggestion-card h3 {
  font-size: 18px;
  color: #1F2937;
  margin-bottom: 16px;
}

.suggestion-item {
  padding: 16px;
  background: #F0FDF4;
  border-radius: 12px;
  margin-bottom: 12px;
  border-left: 4px solid #10B981;
}

.suggestion-item h4 {
  font-size: 15px;
  color: #065F46;
  margin-bottom: 6px;
}

.suggestion-item p {
  font-size: 14px;
  color: #047857;
  line-height: 1.5;
}

/* 解读卡片 */
.insight-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-top: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.insight-card h2 {
  font-size: 20px;
  color: #1F2937;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.insight-card h2::before {
  content: '';
  width: 4px;
  height: 20px;
  background: #F59E0B;
  border-radius: 2px;
}

.insight-item {
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.insight-item.advantage {
  background: #F0FDF4;
  border-left: 4px solid #10B981;
}

.insight-item.suggestion {
  background: #FEF3C7;
  border-left: 4px solid #F59E0B;
}

.insight-item.highlight {
  background: #EFF6FF;
  border-left: 4px solid #3B82F6;
}

.insight-item h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}

.insight-item.advantage h3 { color: #065F46; }
.insight-item.suggestion h3 { color: #92400E; }
.insight-item.highlight h3 { color: #1E40AF; }

.insight-item p {
  font-size: 14px;
  line-height: 1.5;
}

.insight-item.advantage p { color: #047857; }
.insight-item.suggestion p { color: #B45309; }
.insight-item.highlight p { color: #1E3A8A; }

/* 性格色彩解读 */
.combo-section {
  padding: 20px;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  border-radius: 12px;
  margin-bottom: 16px;
  border-left: 4px solid #F59E0B;
}

.combo-section h3 {
  font-size: 16px;
  color: #92400E;
  margin-bottom: 8px;
}

.combo-section p {
  font-size: 14px;
  color: #B45309;
  line-height: 1.5;
}

.career-section {
  padding: 20px;
  background: #F0FDF4;
  border-radius: 12px;
  border-left: 4px solid #10B981;
}

.career-section h3 {
  font-size: 16px;
  color: #065F46;
  margin-bottom: 8px;
}

.career-section p {
  font-size: 14px;
  color: #047857;
  line-height: 1.5;
}

/* 分享卡片 */
.share-card-preview {
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-top: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  text-align: center;
}

.share-card-preview h3 {
  font-size: 18px;
  color: #1F2937;
  margin-bottom: 20px;
}

.share-card {
  border-radius: 16px;
  padding: 30px;
  color: white;
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}

.share-card-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.share-card-type {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: 4px;
  margin-bottom: 4px;
}

.share-card-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.share-card-desc {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 12px;
}

.share-card-compare {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
  font-size: 13px;
}

.share-card-source {
  margin-top: 16px;
  font-size: 12px;
  opacity: 0.7;
}

.share-card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.share-card-score {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 12px;
}

.share-card-level {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}

.share-card-combo {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}

/* 付费解锁 */
.paywall-card {
  background: linear-gradient(135deg, #9CA3AF, #6B7280);
  border-radius: 20px;
  padding: 30px;
  margin-top: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  text-align: center;
}

.paywall-card h3 {
  font-size: 20px;
  color: white;
  margin-bottom: 12px;
}

.paywall-card p {
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  margin-bottom: 20px;
}

/* 操作按钮 */
.result-actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.btn-result {
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  user-select: none;

  &:active {
    transform: scale(0.95);
  }
}

.btn-primary {
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: white;
  color: #3B82F6;
  border: 2px solid #3B82F6;
}

.btn-secondary:hover {
  background: #EFF6FF;
}

/* 响应式 */
@media (max-width: 600px) {
  .result-header, .dimensions-card, .insight-card, .suggestion-card, .chart-card {
    padding: 24px;
  }

  .mbti-type {
    font-size: 48px;
    letter-spacing: 8px;
  }

  .score-card {
    padding: 24px;
  }

  .score-value {
    font-size: 48px;
  }

  .result-actions {
    flex-direction: column;
  }

  .chart-section {
    flex-direction: column;
    gap: 20px;
  }

  .color-type {
    flex-direction: column;
    align-items: center;
  }
}
</style>
