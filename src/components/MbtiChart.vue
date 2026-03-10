<template>
  <div class="mbti-chart">
    <!-- 人格图标展示 -->
    <div v-if="icon" class="personality-icon" :style="{ background: color }">
      {{ icon }}
    </div>

    <!-- 人格维度雷达图 -->
    <div class="chart-section">
      <h3 class="chart-title">人格维度分析</h3>
      <div class="radar-chart">
        <svg viewBox="0 0 300 300" class="radar-svg">
          <!-- 背景网格 -->
          <circle cx="150" cy="150" r="100" class="grid-circle" />
          <circle cx="150" cy="150" r="75" class="grid-circle" />
          <circle cx="150" cy="150" r="50" class="grid-circle" />
          <circle cx="150" cy="150" r="25" class="grid-circle" />
          <!-- 轴线 -->
          <line x1="150" y1="50" x2="150" y2="250" class="axis-line" />
          <line x1="63" y1="100" x2="237" y2="200" class="axis-line" />
          <line x1="63" y1="200" x2="237" y2="100" class="axis-line" />
          <!-- 数据多边形 -->
          <polygon
            :points="radarPoints"
            class="data-polygon"
          />
          <!-- 数据点 -->
          <circle
            v-for="(point, index) in radarPointsArray"
            :key="index"
            :cx="point.x"
            :cy="point.y"
            r="5"
            class="data-point"
          />
          <!-- 标签 -->
          <text x="150" y="35" class="axis-label">E/I</text>
          <text x="250" y="100" class="axis-label">S/N</text>
          <text x="250" y="210" class="axis-label">T/F</text>
          <text x="50" y="210" class="axis-label">J/P</text>
          <text x="50" y="100" class="axis-label">能</text>
        </svg>
      </div>
      <div class="dimension-labels">
        <div class="dimension-item">
          <span class="dim-label">外向 E</span>
          <div class="dim-bar">
            <div class="dim-fill" :style="{ width: eiPercent + '%', background: getDimColor('EI') }"></div>
          </div>
          <span class="dim-label">内向 I</span>
        </div>
        <div class="dimension-item">
          <span class="dim-label">实感 S</span>
          <div class="dim-bar">
            <div class="dim-fill" :style="{ width: snPercent + '%', background: getDimColor('SN') }"></div>
          </div>
          <span class="dim-label">直觉 N</span>
        </div>
        <div class="dimension-item">
          <span class="dim-label">思考 T</span>
          <div class="dim-bar">
            <div class="dim-fill" :style="{ width: tfPercent + '%', background: getDimColor('TF') }"></div>
          </div>
          <span class="dim-label">情感 F</span>
        </div>
        <div class="dimension-item">
          <span class="dim-label">判断 J</span>
          <div class="dim-bar">
            <div class="dim-fill" :style="{ width: jpPercent + '%', background: getDimColor('JP') }"></div>
          </div>
          <span class="dim-label">知觉 P</span>
        </div>
      </div>
    </div>

    <!-- 认知功能图 -->
    <div class="chart-section">
      <h3 class="chart-title">认知功能分布</h3>
      <div class="functions-grid">
        <div class="function-card dominant">
          <div class="func-label">主导功能</div>
          <div class="func-name">{{ functions.dominant }}</div>
          <div class="func-desc">你最自然使用的功能</div>
        </div>
        <div class="function-card auxiliary">
          <div class="func-label">辅助功能</div>
          <div class="func-name">{{ functions.auxiliary }}</div>
          <div class="func-desc">支持主导功能</div>
        </div>
        <div class="function-card tertiary">
          <div class="func-label">第三功能</div>
          <div class="func-name">{{ functions.tertiary }}</div>
          <div class="func-desc">正在发展中</div>
        </div>
        <div class="function-card inferior">
          <div class="func-label">劣势功能</div>
          <div class="func-name">{{ functions.inferior }}</div>
          <div class="func-desc">需要成长提升</div>
        </div>
      </div>
    </div>

    <!-- 性格特点雷达图 -->
    <div class="chart-section">
      <h3 class="chart-title">性格特点分布</h3>
      <div class="traits-chart">
        <div class="trait-item" v-for="trait in traits" :key="trait.name">
          <div class="trait-header">
            <span class="trait-name">{{ trait.name }}</span>
            <span class="trait-value">{{ trait.value }}%</span>
          </div>
          <div class="trait-bar-bg">
            <div class="trait-bar-fill" :style="{ width: trait.value + '%', background: trait.color }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  functions: {
    type: Object,
    default: () => ({})
  },
  scores: {
    type: Object,
    default: () => ({})
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#667eea'
  }
})

// 计算各维度百分比
const eiPercent = computed(() => {
  const e = props.scores.e || 0
  const i = props.scores.i || 0
  const total = e + i
  return total > 0 ? Math.round((e / total) * 100) : 50
})

const snPercent = computed(() => {
  const s = props.scores.s || 0
  const n = props.scores.n || 0
  const total = s + n
  return total > 0 ? Math.round((s / total) * 100) : 50
})

const tfPercent = computed(() => {
  const t = props.scores.t || 0
  const f = props.scores.f || 0
  const total = t + f
  return total > 0 ? Math.round((t / total) * 100) : 50
})

const jpPercent = computed(() => {
  const j = props.scores.j || 0
  const p = props.scores.p || 0
  const total = j + p
  return total > 0 ? Math.round((j / total) * 100) : 50
})

// 雷达图点计算
const radarPointsArray = computed(() => {
  const center = 150
  const radius = 100
  const ei = eiPercent.value / 100
  const sn = snPercent.value / 100
  const tf = tfPercent.value / 100
  const jp = jpPercent.value / 100

  return [
    { x: center, y: center - radius * (ei * 2 - 1) }, // 上 - EI
    { x: center + radius * (sn * 2 - 1) * 0.866, y: center + radius * (sn * 2 - 1) * 0.5 }, // 右上 - SN
    { x: center + radius * (tf * 2 - 1) * 0.866, y: center - radius * (tf * 2 - 1) * 0.5 + radius }, // 右下 - TF
    { x: center - radius * (jp * 2 - 1) * 0.866, y: center - radius * (jp * 2 - 1) * 0.5 + radius } // 左下 - JP
  ]
})

const radarPoints = computed(() => {
  return radarPointsArray.value.map(p => `${p.x},${p.y}`).join(' ')
})

function getDimColor(dim) {
  const dimColors = {
    'EI': `linear-gradient(90deg, ${props.color}, ${adjustColor(props.color, 30)})`,
    'SN': `linear-gradient(90deg, ${adjustColor(props.color, -30)}, ${adjustColor(props.color, 30)})`,
    'TF': `linear-gradient(90deg, ${adjustColor(props.color, -20)}, ${adjustColor(props.color, 40)})`,
    'JP': `linear-gradient(90deg, ${adjustColor(props.color, 20)}, ${adjustColor(props.color, -30)})`
  }
  return dimColors[dim] || props.color
}

// 颜色调整辅助函数
function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount))
  return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
}

// 性格特点数据
const traits = computed(() => {
  const type = props.type
  const traitMap = {
    'INTJ': [
      { name: '战略思维', value: 95, color: '#667eea' },
      { name: '独立性', value: 90, color: '#764ba2' },
      { name: '分析能力', value: 88, color: '#f093fb' },
      { name: '创造力', value: 85, color: '#f5576c' },
      { name: '执行力', value: 75, color: '#4facfe' }
    ],
    'INTP': [
      { name: '逻辑思维', value: 95, color: '#667eea' },
      { name: '创造力', value: 90, color: '#764ba2' },
      { name: '求知欲', value: 88, color: '#f093fb' },
      { name: '独立性', value: 85, color: '#f5576c' },
      { name: '分析能力', value: 82, color: '#4facfe' }
    ],
    'ENTJ': [
      { name: '领导力', value: 95, color: '#667eea' },
      { name: '决策力', value: 90, color: '#764ba2' },
      { name: '执行力', value: 88, color: '#f093fb' },
      { name: '自信心', value: 85, color: '#f5576c' },
      { name: '战略思维', value: 80, color: '#4facfe' }
    ],
    'ENTP': [
      { name: '创造力', value: 95, color: '#667eea' },
      { name: '思维敏捷', value: 90, color: '#764ba2' },
      { name: '沟通能力', value: 85, color: '#f093fb' },
      { name: '好奇心', value: 88, color: '#f5576c' },
      { name: '灵活性', value: 80, color: '#4facfe' }
    ],
    'INFJ': [
      { name: '同理心', value: 95, color: '#667eea' },
      { name: '洞察力', value: 90, color: '#764ba2' },
      { name: '理想主义', value: 88, color: '#f093fb' },
      { name: '忠诚度', value: 85, color: '#f5576c' },
      { name: '创造力', value: 80, color: '#4facfe' }
    ],
    'INFP': [
      { name: '理想主义', value: 95, color: '#667eea' },
      { name: '同理心', value: 90, color: '#764ba2' },
      { name: '创造力', value: 88, color: '#f093fb' },
      { name: '忠诚度', value: 82, color: '#f5576c' },
      { name: '敏感度', value: 85, color: '#4facfe' }
    ],
    'ENFJ': [
      { name: '领导力', value: 95, color: '#667eea' },
      { name: '同理心', value: 90, color: '#764ba2' },
      { name: '沟通力', value: 88, color: '#f093fb' },
      { name: '感染力', value: 85, color: '#f5576c' },
      { name: '责任感', value: 82, color: '#4facfe' }
    ],
    'ENFP': [
      { name: '热情', value: 95, color: '#667eea' },
      { name: '创造力', value: 90, color: '#764ba2' },
      { name: '沟通力', value: 88, color: '#f093fb' },
      { name: '感染力', value: 85, color: '#f5576c' },
      { name: '灵活性', value: 80, color: '#4facfe' }
    ],
    'ISTJ': [
      { name: '可靠性', value: 95, color: '#667eea' },
      { name: '责任感', value: 90, color: '#764ba2' },
      { name: '执行力', value: 88, color: '#f093fb' },
      { name: '稳定性', value: 85, color: '#f5576c' },
      { name: '专注度', value: 82, color: '#4facfe' }
    ],
    'ISFJ': [
      { name: '温暖', value: 95, color: '#667eea' },
      { name: '责任感', value: 90, color: '#764ba2' },
      { name: '细心', value: 88, color: '#f093fb' },
      { name: '忠诚度', value: 85, color: '#f5576c' },
      { name: '耐心', value: 82, color: '#4facfe' }
    ],
    'ESTJ': [
      { name: '组织力', value: 95, color: '#667eea' },
      { name: '执行力', value: 90, color: '#764ba2' },
      { name: '领导力', value: 88, color: '#f093fb' },
      { name: '责任感', value: 85, color: '#f5576c' },
      { name: '决断力', value: 82, color: '#4facfe' }
    ],
    'ESFJ': [
      { name: '社交力', value: 95, color: '#667eea' },
      { name: '温暖', value: 90, color: '#764ba2' },
      { name: '责任感', value: 88, color: '#f093fb' },
      { name: '组织力', value: 85, color: '#f5576c' },
      { name: '关怀力', value: 82, color: '#4facfe' }
    ],
    'ISTP': [
      { name: '分析力', value: 95, color: '#667eea' },
      { name: '冷静', value: 90, color: '#764ba2' },
      { name: '动手能力', value: 88, color: '#f093fb' },
      { name: '灵活性', value: 85, color: '#f5576c' },
      { name: '实用性', value: 82, color: '#4facfe' }
    ],
    'ISFP': [
      { name: '艺术感', value: 95, color: '#667eea' },
      { name: '敏感度', value: 90, color: '#764ba2' },
      { name: '温柔', value: 88, color: '#f093fb' },
      { name: '审美力', value: 85, color: '#f5576c' },
      { name: '灵活性', value: 80, color: '#4facfe' }
    ],
    'ESTP': [
      { name: '行动力', value: 95, color: '#667eea' },
      { name: '社交力', value: 90, color: '#764ba2' },
      { name: '应变力', value: 88, color: '#f093fb' },
      { name: '精力', value: 85, color: '#f5576c' },
      { name: '务实', value: 82, color: '#4facfe' }
    ],
    'ESFP': [
      { name: '热情', value: 95, color: '#667eea' },
      { name: '表现力', value: 90, color: '#764ba2' },
      { name: '社交力', value: 88, color: '#f093fb' },
      { name: '活力', value: 85, color: '#f5576c' },
      { name: '感染力', value: 82, color: '#4facfe' }
    ]
  }
  return traitMap[type] || traitMap['INTJ']
})
</script>

<style lang="scss" scoped>
.mbti-chart {
  padding: 20px;
}

.personality-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  margin: 0 auto 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 4px solid white;
}

.chart-section {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.radar-chart {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.radar-svg {
  width: 250px;
  height: 250px;
}

.grid-circle {
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 1;
}

.axis-line {
  stroke: #e0e0e0;
  stroke-width: 1;
}

.data-polygon {
  fill: rgba(102, 126, 234, 0.3);
  stroke: #667eea;
  stroke-width: 2;
}

.data-point {
  fill: #667eea;
}

.axis-label {
  font-size: 12px;
  fill: #666;
  text-anchor: middle;
}

.dimension-labels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dimension-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dim-label {
  font-size: 12px;
  color: #666;
  width: 40px;
}

.dim-bar {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.dim-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.functions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.function-card {
  padding: 16px;
  border-radius: 12px;
  text-align: center;

  &.dominant {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  &.auxiliary {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }

  &.tertiary {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
  }

  &.inferior {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
  }
}

.func-label {
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 4px;
}

.func-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.func-desc {
  font-size: 11px;
  opacity: 0.8;
}

.traits-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trait-item {
  .trait-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .trait-name {
    font-size: 14px;
    color: #333;
  }

  .trait-value {
    font-size: 14px;
    font-weight: 600;
    color: #667eea;
  }

  .trait-bar-bg {
    height: 10px;
    background: #f0f0f0;
    border-radius: 5px;
    overflow: hidden;
  }

  .trait-bar-fill {
    height: 100%;
    border-radius: 5px;
    transition: width 0.5s ease;
  }
}
</style>
