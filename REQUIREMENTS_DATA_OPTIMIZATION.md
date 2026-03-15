# 心理测试系统数据优化需求文档

## 文档信息

| 项目 | 内容 |
|------|------|
| 文档版本 | V1.0 |
| 创建日期 | 2026-03-12 |
| 项目名称 | 心理测试系统 |
| 涉及模块 | Result.vue 结果展示页 |
| 目标 | 确保所有测试结果数据真实、科学、有效 |

---

## 一、现状分析

### 1.1 当前数据问题

根据 Result.vue 数据来源分析文档，当前存在以下问题：

| 数据类型 | 字段 | 问题描述 | 影响程度 |
|----------|------|----------|----------|
| 随机数据 | mbtiComparePercent | 每次渲染随机生成 60-90% | 高 |
| 硬编码 | mbtiRadarBars | 固定值 [25, 75, 85, 70, 75, 25, 15, 30] | 高 |
| 硬编码 | eqDimensions | 固定维度数据 | 高 |
| 硬编码 | ageDimensions | 固定维度数据 | 高 |
| 硬编码 | colorData | 固定颜色比例 | 高 |
| 硬编码 | mbtiSuggestions | 固定职业建议 | 中 |
| 硬编码 | eqInsights | 固定解读文本 | 中 |
| 硬编码 | ageInsights | 固定解读文本 | 中 |
| 硬编码 | colorInsights | 固定解读文本 | 中 |
| 待后端 | ageComparePercent | 需要历史数据 | 低 |
| 待后端 | colorComparePercent | 需要历史数据 | 低 |

### 1.2 数据来源说明

各测试题库均已包含 dimension 字段，用于标识题目对应的维度：

- **MBTI**: EI, SN, TF, JP (8个维度各6题，共28题)
- **EQ情商**: selfAwareness, selfManagement, motivation, socialAwareness, relationshipManagement (5个维度各4题，共20题)
- **心理成熟度**: emotional, responsibility, stress, growth, relationship, finance (6个维度各2题，共12题)
- **性格色彩**: red, blue, yellow, green (4个维度各5题，共20题)

### 1.3 选项值格式（重要）

> ⚠️ 在实现计算逻辑前，必须先确认题库中选项的 `option.value` 格式：

| 测试 | 选项格式 | 转换方式 | 示例 |
|-----|---------|---------|------|
| EQ | A/B/C/D/E | A=5, B=4, C=3, D=2, E=1 | "A" → 5 |
| 心理成熟度 | A/B/C/D | A=4, B=3, C=2, D=1 | "A" → 4 |
| 性格色彩 | A/B/C/D/E | A=4, B=3, C=2, D=1, E=0 | "A" → 4 |
| MBTI | e/i/s/n/t/f/j/p | 直接匹配字母 | "e" → E |

**转换工具函数**:
```javascript
function convertOptionValue(value, quizCode) {
  const map = {
    'eq': { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1 },
    'age': { 'A': 4, 'B': 3, 'C': 2, 'D': 1 },
    'color': { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'E': 0 },
    'mbti': null // MBTI直接用字母
  }

  if (quizCode === 'mbti') {
    return value?.toUpperCase()
  }

  return map[quizCode]?.[value] || 0
}
```

---

## 二、需求说明

### 2.1 维度数据计算（高优先级）

#### 2.1.1 MBTI 能力维度分析 - 8维度显示（重点）

**问题描述**: 当前结果页只显示4个维度（思考T、情感F、判断J、知觉P），缺少E/I/S/N四个维度，且分数都是硬编码的50分。

**目标**: 在结果页正确显示全部8个维度，并根据用户答案计算真实得分。

**完整计算逻辑**:

```javascript
/**
 * MBTI 8维度计算
 * 
 * 题库结构（共28题）：
 * - Q1-Q6: dimension='EI' (外向/内向)
 * - Q7-Q12: dimension='SN' (感觉/直觉)
 * - Q13-Q20: dimension='TF' (思考/情感) - 8题
 * - Q21-Q28: dimension='JP' (判断/知觉) - 8题
 * 
 * 注意：题目中选项的value是字母 'e', 'i', 's', 'n', 't', 'f', 'j', 'p'
 */

// 1. 统计每个字母的出现次数
function calculateMBTIDimensions(answers) {
  // 初始化计数器
  const letterCounts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  const letterTotalQuestions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  // 遍历用户答案
  answers.forEach((answer, index) => {
    // 获取题目信息（需要根据实际题库结构调整）
    const question = getQuestionByIndex('mbti', index)
    const dimension = question?.dimension // 如 'EI', 'SN', 'TF', 'JP'

    if (!dimension) return

    // 遍历维度中的每个字母
    dimension.split('').forEach(char => {
      const upperChar = char.toUpperCase() // 'E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'
      
      if (letterTotalQuestions[upperChar] !== undefined) {
        // 统计总题目数
        letterTotalQuestions[upperChar]++

        // 判断用户选择的选项是否等于该字母（不区分大小写）
        if (answer?.toUpperCase() === upperChar) {
          letterCounts[upperChar]++
        }
      }
    })
  })

  // 计算每个维度的百分比
  const dimensionData = [
    { 
      name: '外向E', 
      shortName: 'E',
      score: letterCounts.E,
      total: letterTotalQuestions.E,
      percent: letterTotalQuestions.E > 0 
        ? Math.round((letterCounts.E / letterTotalQuestions.E) * 100) 
        : 50
    },
    { 
      name: '内向I', 
      shortName: 'I',
      score: letterCounts.I,
      total: letterTotalQuestions.I,
      percent: letterTotalQuestions.I > 0 
        ? Math.round((letterCounts.I / letterTotalQuestions.I) * 100) 
        : 50
    },
    { 
      name: '感觉S', 
      shortName: 'S',
      score: letterCounts.S,
      total: letterTotalQuestions.S,
      percent: letterTotalQuestions.S > 0 
        ? Math.round((letterCounts.S / letterTotalQuestions.S) * 100) 
        : 50
    },
    { 
      name: '直觉N', 
      shortName: 'N',
      score: letterCounts.N,
      total: letterTotalQuestions.N,
      percent: letterTotalQuestions.N > 0 
        ? Math.round((letterCounts.N / letterTotalQuestions.N) * 100) 
        : 50
    },
    { 
      name: '思考T', 
      shortName: 'T',
      score: letterCounts.T,
      total: letterTotalQuestions.T,
      percent: letterTotalQuestions.T > 0 
        ? Math.round((letterCounts.T / letterTotalQuestions.T) * 100) 
        : 50
    },
    { 
      name: '情感F', 
      shortName: 'F',
      score: letterCounts.F,
      total: letterTotalQuestions.F,
      percent: letterTotalQuestions.F > 0 
        ? Math.round((letterCounts.F / letterTotalQuestions.F) * 100) 
        : 50
    },
    { 
      name: '判断J', 
      shortName: 'J',
      score: letterCounts.J,
      total: letterTotalQuestions.J,
      percent: letterTotalQuestions.J > 0 
        ? Math.round((letterCounts.J / letterTotalQuestions.J) * 100) 
        : 50
    },
    { 
      name: '知觉P', 
      shortName: 'P',
      score: letterCounts.P,
      total: letterTotalQuestions.P,
      percent: letterTotalQuestions.P > 0 
        ? Math.round((letterCounts.P / letterTotalQuestions.P) * 100) 
        : 50
    }
  ]

  return dimensionData
}
```

**前端组件实现（Vue）**:

```vue
<template>
  <div class="dimension-analysis">
    <h3>📊 能力维度分析</h3>
    
    <!-- 显示4对维度 -->
    <div class="dimension-pairs">
      <!-- 第一对：E/I -->
      <div class="dimension-pair">
        <div class="pair-label">外向E / 内向I</div>
        <div class="dimension-bar">
          <div class="bar-left" :style="{ width: dimensions[0].percent + '%' }">
            <span>E {{ dimensions[0].percent }}%</span>
          </div>
          <div class="bar-right" :style="{ width: dimensions[1].percent + '%' }">
            <span>I {{ dimensions[1].percent }}%</span>
          </div>
        </div>
      </div>
      
      <!-- 第二对：S/N -->
      <div class="dimension-pair">
        <div class="pair-label">感觉S / 直觉N</div>
        <div class="dimension-bar">
          <div class="bar-left" :style="{ width: dimensions[2].percent + '%' }">
            <span>S {{ dimensions[2].percent }}%</span>
          </div>
          <div class="bar-right" :style="{ width: dimensions[3].percent + '%' }">
            <span>N {{ dimensions[3].percent }}%</span>
          </div>
        </div>
      </div>
      
      <!-- 第三对：T/F -->
      <div class="dimension-pair">
        <div class="pair-label">思考T / 情感F</div>
        <div class="dimension-bar">
          <div class="bar-left" :style="{ width: dimensions[4].percent + '%' }">
            <span>T {{ dimensions[4].percent }}%</span>
          </div>
          <div class="bar-right" :style="{ width: dimensions[5].percent + '%' }">
            <span>F {{ dimensions[5].percent }}%</span>
          </div>
        </div>
      </div>
      
      <!-- 第四对：J/P -->
      <div class="dimension-pair">
        <div class="pair-label">判断J / 知觉P</div>
        <div class="dimension-bar">
          <div class="bar-left" :style="{ width: dimensions[6].percent + '%' }">
            <span>J {{ dimensions[6].percent }}%</span>
          </div>
          <div class="bar-right" :style="{ width: dimensions[7].percent + '%' }">
            <span>P {{ dimensions[7].percent }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dimensions() {
      return calculateMBTIDimensions(this.result?.answers || [])
    }
  }
}
</script>

<style scoped>
.dimension-pair {
  margin-bottom: 16px;
}
.pair-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
.dimension-bar {
  display: flex;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
}
.bar-left {
  background: linear-gradient(90deg, #3B82F6, #60A5FA);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 12px;
  color: white;
  font-size: 12px;
  font-weight: 600;
}
.bar-right {
  background: linear-gradient(90deg, #F59E0B, #FBBF24);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  color: white;
  font-size: 12px;
  font-weight: 600;
}
</style>
```

**显示效果**:

```
┌─────────────────────────────────────┐
│  外向E / 内向I                      │
│  [███████░░░░░░] 60%  [████░░░░░] 40%│
│     E 60%          I 40%            │
├─────────────────────────────────────┤
│  感觉S / 直觉N                      │
│  [█████░░░░░░░] 40%  [████████] 60% │
│     S 40%          N 60%            │
├─────────────────────────────────────┤
│  思考T / 情感F                      │
│  [██████████] 75%  [███░░░░░░░] 25% │
│     T 75%          F 25%            │
├─────────────────────────────────────┤
│  判断J / 知觉P                      │
│  [███████░░░░░] 55%  [████░░░░░░] 45%│
│     J 55%          P 45%            │
└─────────────────────────────────────┘
```

**关键点总结**:

1. **显示8个维度**：E、I、S、N、T、F、J、P
2. **成对显示**：每对用双向进度条显示
3. **百分比计算**：选该字母的次数 / 该字母总题数 * 100
4. **数据来源**：从用户answers数组计算，不是硬编码
  })

  // 计算雷达图数据（百分比）
  return [
    letterTotalQuestions.E > 0 ? Math.round((letterCounts.E / letterTotalQuestions.E) * 100) : 50,
    letterTotalQuestions.I > 0 ? Math.round((letterCounts.I / letterTotalQuestions.I) * 100) : 50,
    letterTotalQuestions.S > 0 ? Math.round((letterCounts.S / letterTotalQuestions.S) * 100) : 50,
    letterTotalQuestions.N > 0 ? Math.round((letterCounts.N / letterTotalQuestions.N) * 100) : 50,
    letterTotalQuestions.T > 0 ? Math.round((letterCounts.T / letterTotalQuestions.T) * 100) : 50,
    letterTotalQuestions.F > 0 ? Math.round((letterCounts.F / letterTotalQuestions.F) * 100) : 50,
    letterTotalQuestions.J > 0 ? Math.round((letterCounts.J / letterTotalQuestions.J) * 100) : 50,
    letterTotalQuestions.P > 0 ? Math.round((letterCounts.P / letterTotalQuestions.P) * 100) : 50,
  ]
})
```

#### 2.1.2 EQ 情商维度数据

**需求描述**: 根据用户答案计算五个维度的真实得分

**计算逻辑**:

| 维度 | 字段名 | 题目数 | 计算方式 | 满分 |
|------|--------|--------|----------|------|
| 自我情绪认知 | selfAwareness | 4题 | A=5,B=4,C=3,D=2,E=1 | 20分 |
| 情绪管理 | selfManagement | 4题 | A=5,B=4,C=3,D=2,E=1 | 20分 |
| 动机激励 | motivation | 4题 | A=5,B=4,C=3,D=2,E=1 | 20分 |
| 社交认知 | socialAwareness | 4题 | A=5,B=4,C=3,D=2,E=1 | 20分 |
| 社交技巧 | relationshipManagement | 4题 | A=5,B=4,C=3,D=2,E=1 | 20分 |

> **注意**: 选项值为A-E，需要转换为1-5分

**前端实现**:
```javascript
const eqDimensions = computed(() => {
  if (!result.value?.answers) return defaultEqDimensions

  const dimensionNames = {
    selfAwareness: '自我认知',
    selfManagement: '情绪管理',
    motivation: '动机激励',
    socialAwareness: '社交认知',
    relationshipManagement: '社交技巧'
  }

  // 选项值转换 (A=5, B=4, C=3, D=2, E=1)
  const optionToScore = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1 }

  const dims = {}
  Object.keys(dimensionNames).forEach(key => dims[key] = { score: 0, maxScore: 20 })

  result.value.answers.forEach((answer, index) => {
    const question = getQuestionByIndex('eq', index)
    const dimension = question?.dimension
    if (dimension && dims[dimension]) {
      // 转换选项值为分数
      dims[dimension].score += optionToScore[answer] || 0
    }
  })

  return Object.entries(dims).map(([key, data]) => ({
    name: dimensionNames[key],
    score: data.score,
    maxScore: data.maxScore,
    percent: Math.round((data.score / data.maxScore) * 100)
  }))
})
```

#### 2.1.3 心理成熟度维度数据

**需求描述**: 根据用户答案计算六个维度的真实得分

**计算逻辑**:

| 维度 | 字段名 | 题目数 | 选项值 | 满分 |
|------|--------|--------|--------|------|
| 情绪稳定性 | emotional | 2题 | A=4, B=3, C=2, D=1 | 8分 |
| 责任意识 | responsibility | 2题 | A=4, B=3, C=2, D=1 | 8分 |
| 抗压能力 | stress | 2题 | A=4, B=3, C=2, D=1 | 8分 |
| 成长心态 | growth | 2题 | A=4, B=3, C=2, D=1 | 8分 |
| 人际关系 | relationship | 2题 | A=4, B=3, C=2, D=1 | 8分 |
| 财务管理 | finance | 2题 | A=4, B=3, C=2, D=1 | 8分 |

> **注意**: 选项值为A-D，需要转换为1-4分

**前端实现**:
```javascript
const ageDimensions = computed(() => {
  if (!result.value?.answers) return defaultAgeDimensions

  const dimensionNames = {
    emotional: '情绪稳定性',
    responsibility: '责任意识',
    stress: '抗压能力',
    growth: '成长心态',
    relationship: '人际关系',
    finance: '财务管理'
  }

  // 选项值转换 (A=4, B=3, C=2, D=1)
  const optionToScore = { 'A': 4, 'B': 3, 'C': 2, 'D': 1 }

  const dims = {}
  Object.keys(dimensionNames).forEach(key => dims[key] = { score: 0, maxScore: 8 })

  result.value.answers.forEach((answer, index) => {
    const question = getQuestionByIndex('age', index)
    const dimension = question?.dimension
    if (dimension && dims[dimension]) {
      // 转换选项值为分数
      dims[dimension].score += optionToScore[answer] || 0
    }
  })

  return Object.entries(dims).map(([key, data]) => ({
    name: dimensionNames[key],
    score: data.score,
    maxScore: data.maxScore, // 每维度2题，每题4分 = 8分满分
    percent: Math.round((data.score / data.maxScore) * 100)
  }))
})
```

#### 2.1.4 性格色彩比例数据

**需求描述**: 根据用户答案计算四种颜色的真实比例

**计算逻辑**:

```
各颜色得分 = 对应dimension的所有题目得分之和 (每题0-4分，每颜色5题，满分20分)
总得分 = 四个颜色得分之和 (满分80分)
各颜色百分比 = (该颜色得分 / 总得分) * 100

百分比归一化处理：确保四个颜色百分比总和=100%
```

---

### 2.2 个性化 Insights 解读（中优先级）

#### 2.2.1 MBTI 职业建议

**需求描述**: 根据用户MBTI类型和维度得分生成个性化建议

**实现逻辑**:

1. 根据 resultType (如 INTJ) 获取基础人格描述
2. 根据各维度得分高低，添加针对性建议
3. 示例规则:
   - E得分高: "适合需要社交沟通的岗位"
   - I得分高: "适合需要独立思考的岗位"
   - N得分高: "适合创新类工作"
   - S得分高: "适合执行类工作"

#### 2.2.2 EQ 情商解读

**需求描述**: 根据五个维度的得分生成个性化解读

**实现逻辑**:

```javascript
const eqInsights = computed(() => {
  const insights = []
  const dims = eqDimensions.value

  dims.forEach(dim => {
    if (dim.percent >= 80) {
      insights.push(`${dim.name}能力优秀，继续保持`)
    } else if (dim.percent >= 60) {
      insights.push(`${dim.name}能力良好，有提升空间`)
    } else {
      insights.push(`建议加强${dim.name}能力的培养`)
    }
  })

  return insights
})
```

#### 2.2.3 心理成熟度解读

**需求描述**: 根据六个维度的得分生成个性化解读

**实现逻辑**: 参考EQ解读逻辑，根据各维度得分生成对应文本

#### 2.2.4 性格色彩解读

**需求描述**: 根据主色和辅色生成个性化解读

**实现逻辑**:

```javascript
const colorInsights = computed(() => {
  const main = mainColor.value
  const sub = subColor.value

  const colorDescriptions = {
    red: {
      strength: '行动力强、热情积极',
      weakness: '可能过于急躁',
      suggestion: '学会在行动前先思考'
    },
    blue: {
      strength: '思考深入、追求完美',
      weakness: '可能过度分析',
      suggestion: '适当放松，接受不完美'
    },
    yellow: {
      strength: '乐观开朗、人缘好',
      weakness: '可能缺乏计划性',
      suggestion: '制定计划并坚持执行'
    },
    green: {
      strength: '稳定温和、善于倾听',
      weakness: '可能回避冲突',
      suggestion: '学会表达自己的需求'
    }
  }

  return [
    `主色${main.name}：${colorDescriptions[main.key].strength}`,
    `辅色${sub.name}：${colorDescriptions[sub.key].strength}`,
    `建议：${colorDescriptions[main.key].suggestion}`
  ]
})
```

---

### 2.3 比较百分比优化（中优先级）

#### 2.3.1 MBTI 比较百分比

**问题**: 当前使用随机数 `Math.floor(Math.random() * 30) + 60`

**需求**: 根据用户得分计算真实排名

**前端实现** (无后端时):
```javascript
const mbtiComparePercent = computed(() => {
  const score = mbtiScore.value
  // 基于得分的估算公式（无后端数据时）
  // 假设平均分为50，标准差为15
  const percentile = Math.min(99, Math.max(1,
    50 + (score - 50) * 1.5
  ))
  return Math.round(percentile)
})
```

**后端实现** (有后端时):
```sql
SELECT COUNT(*) * 100.0 / (SELECT COUNT(*) FROM test_results WHERE quiz_code = 'mbti')
FROM test_results
WHERE quiz_code = 'mbti' AND score > ?
```

#### 2.3.2 EQ 比较百分比

**当前状态**: `Math.floor(eqTotalScore.value - 10)`

**优化建议**: 使用与MBTI相同的估算公式，或接入后端真实数据

#### 2.3.3 心理成熟度比较百分比

**当前状态**: 固定值 75%

**优化建议**: 接入后端真实数据，或使用估算公式

#### 2.3.4 性格色彩比较百分比

**当前状态**: 固定值 65%

**优化建议**: 接入后端真实数据，或使用估算公式

---

## 三、后端需求

### 3.1 用户数据存储

#### 3.1.1 测试结果表

```sql
CREATE TABLE test_results (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  quiz_code VARCHAR(50) NOT NULL,
  result_type VARCHAR(10),
  score INT,
  answers JSON,
  dimension_scores JSON,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_quiz_code (quiz_code),
  INDEX idx_completed_at (completed_at)
);
```

#### 3.1.2 维度得分计算

用户提交答案时，后端应计算并存储各维度得分：

```json
{
  "mbti": {
    "E": 5,
    "I": 1,
    "S": 3,
    "N": 3,
    "T": 4,
    "F": 2,
    "J": 4,
    "P": 2
  },
  "eq": {
    "selfAwareness": 15,
    "selfManagement": 12,
    "motivation": 14,
    "socialAwareness": 16,
    "relationshipManagement": 13
  },
  "age": {
    "emotional": 7,
    "responsibility": 6,
    "stress": 5,
    "growth": 8,
    "relationship": 6,
    "finance": 5
  },
  "color": {
    "red": 15,
    "blue": 12,
    "yellow": 10,
    "green": 8
  }
}
```

### 3.2 排名计算API

#### 3.2.1 获取用户排名

```
GET /api/results/:quizCode/:userId/rank

Response:
{
  "score": 78,
  "percentile": 85,
  "totalUsers": 12345,
  "rank": 1852
}
```

#### 3.2.2 获取维度排名

```
GET /api/results/:quizCode/:userId/dimension-rank

Response:
{
  "dimensions": [
    { "name": "自我认知", "score": 15, "percentile": 72 },
    { "name": "情绪管理", "score": 12, "percentile": 45 }
  ]
}
```

### 3.3 常规模型数据（可选）

为实现更精准的推荐，可考虑引入常模数据：

```sql
CREATE TABLE norms (
  quiz_code VARCHAR(50),
  dimension VARCHAR(50),
  mean_score DECIMAL(5,2),
  std_dev DECIMAL(5,2),
  sample_size INT,

  PRIMARY KEY (quiz_code, dimension)
);
```

---

## 四、前端实现计划

### 4.1 第一阶段：核心计算逻辑

| 序号 | 任务 | 预计工作量 |
|------|------|------------|
| 1.1 | 创建维度计算工具函数 | 2h |
| 1.2 | 实现MBTI雷达图数据计算 | 2h |
| 1.3 | 实现EQ维度数据计算 | 2h |
| 1.4 | 实现心理成熟度维度数据计算 | 2h |
| 1.5 | 实现性格色彩比例计算 | 2h |

### 4.2 第二阶段：个性化解读

| 序号 | 任务 | 预计工作量 |
|------|------|------------|
| 2.1 | 实现MBTI职业建议生成 | 2h |
| 2.2 | 实现EQ Insights生成 | 2h |
| 2.3 | 实现心理成熟度 Insights生成 | 2h |
| 2.4 | 实现性格色彩 Insights生成 | 2h |

### 4.3 第三阶段：比较百分比优化

| 序号 | 任务 | 预计工作量 |
|------|------|------------|
| 3.1 | 实现基于得分的百分比估算 | 1h |
| 3.2 | 对接后端排名API（可选） | 4h |

---

## 五、验收标准

### 5.1 功能验收

- [ ] MBTI雷达图显示用户真实维度得分
- [ ] EQ显示用户五个维度的真实得分
- [ ] 心理成熟度显示用户六个维度的真实得分
- [ ] 性格色彩显示用户四种颜色的真实比例
- [ ] 各测试显示基于用户得分的个性化 Insights

### 5.2 数据验收

- [ ] 维度得分与用户答案一致
- [ ] 百分比计算逻辑合理（非随机）
- [ ] Insights 解读与用户得分匹配

### 5.3 性能验收

- [ ] 页面加载时间 < 2s
- [ ] 计算逻辑不阻塞UI渲染
- [ ] 使用 computed 缓存计算结果

---

## 六、技术方案

### 6.1 目录结构建议

```
src/
  utils/
    dimensionCalculator.js  # 维度计算工具
    insightGenerator.js    # 解读生成工具
  composables/
    useDimensionData.js    # 维度数据composable
    useInsights.js         # Insights composable
```

### 6.2 关键代码结构

```javascript
// utils/dimensionCalculator.js
export function calculateMBTIDimensions(answers, questions) {
  // 实现MBTI维度计算
}

export function calculateEQDimensions(answers, questions) {
  // 实现EQ维度计算
}

export function calculateAgeDimensions(answers, questions) {
  // 实现心理成熟度维度计算
}

export function calculateColorPercentages(answers, questions) {
  // 实现性格色彩比例计算
}

// utils/insightGenerator.js
export function generateMBTIInsights(type, dimensions) {
  // 实现MBTI个性化建议生成
}

export function generateEQInsights(dimensions) {
  // 实现EQ个性化解读生成
}
```

---

## 七、附录

### 7.1 题目维度映射表

#### MBTI
| 维度 | 字段名 | 题目范围 | 选项值 | 计算方式 |
|------|--------|----------|--------|----------|
| 外向/内向 | EI | 1-6 | e/i | 选对字母=1分 |
| 感觉/直觉 | SN | 7-12 | s/n | 选对字母=1分 |
| 思考/情感 | TF | 13-18 | t/f | 选对字母=1分 |
| 判断/知觉 | JP | 19-28 | j/p | 选对字母=1分 |

> **注意**: 题库中使用 JP 而非 PJ；选项值为字母，需判断是否匹配维度字母

#### EQ
| 维度 | 字段名 | 题目范围 | 选项值 | 计算方式 | 满分 |
|------|--------|----------|--------|----------|------|
| 自我认知 | selfAwareness | 1-4 | 1-5 | 选项分值直接累加 | 20分 |
| 情绪管理 | selfManagement | 5-8 | 1-5 | 选项分值直接累加 | 20分 |
| 动机激励 | motivation | 9-12 | 1-5 | 选项分值直接累加 | 20分 |
| 社交认知 | socialAwareness | 13-16 | 1-5 | 选项分值直接累加 | 20分 |
| 社交技巧 | relationshipManagement | 17-20 | 1-5 | 选项分值直接累加 | 20分 |

> **注意**: 题库中实际维度为 motivation 和 socialAwareness；每题5个选项(A-E)，分值1-5分

#### 心理成熟度
| 维度 | 字段名 | 题目范围 | 选项值 | 计算方式 | 满分 |
|------|--------|----------|--------|----------|------|
| 情绪稳定性 | emotional | 1-2 | 1-4 | 选项分值直接累加 | 8分 |
| 责任意识 | responsibility | 3-4 | 1-4 | 选项分值直接累加 | 8分 |
| 抗压能力 | stress | 5-6 | 1-4 | 选项分值直接累加 | 8分 |
| 成长心态 | growth | 7-8 | 1-4 | 选项分值直接累加 | 8分 |
| 人际关系 | relationship | 9-10 | 1-4 | 选项分值直接累加 | 8分 |
| 财务管理 | finance | 11-12 | 1-4 | 选项分值直接累加 | 8分 |

#### 性格色彩
| 颜色 | 题目范围 | 选项值 | 计算方式 | 满分 |
|------|----------|--------|----------|------|
| 红色 | 1-5 | A-E | A=4, B=3, C=2, D=1, E=0 | 20分 |
| 蓝色 | 6-10 | A-E | A=4, B=3, C=2, D=1, E=0 | 20分 |
| 黄色 | 11-15 | A-E | A=4, B=3, C=2, D=1, E=0 | 20分 |
| 绿色 | 16-20 | A-E | A=4, B=3, C=2, D=1, E=0 | 20分 |

> **重要修正**: 百分比计算应该用 **(该颜色得分 / 该颜色满分)**，而不是除以总分！

**前端实现**:
```javascript
const colorData = computed(() => {
  if (!result.value?.answers) return defaultColorData

  const colorInfo = {
    red: { name: '红色', desc: '热情行动派', icon: '🔥' },
    blue: { name: '蓝色', desc: '理性分析派', icon: '💧' },
    yellow: { name: '黄色', desc: '目标决策派', icon: '☀️' },
    green: { name: '绿色', desc: '和谐协作派', icon: '🌿' }
  }

  // 转换选项值 (A=4, B=3, C=2, D=1, E=0)
  const optionToScore = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'E': 0 }

  // 统计各颜色得分
  const scores = { red: 0, blue: 0, yellow: 0, green: 0 }
  const maxScore = 20 // 每颜色5题，每题4分 = 20分满分

  result.value.answers.forEach((answer, index) => {
    const question = getQuestionByIndex('color', index)
    const dimension = question?.dimension // 'red', 'blue', 'yellow', 'green'
    if (dimension && scores[dimension] !== undefined) {
      // 转换选项值为分数
      scores[dimension] += optionToScore[answer] || 0
    }
  })

  // 计算各颜色的百分比 = 该颜色得分 / 该颜色满分 * 100
  const result = Object.entries(scores).map(([key, score]) => ({
    ...colorInfo[key],
    score: score,
    maxScore: maxScore,
    percent: Math.round((score / maxScore) * 100)
  }))

  // 按百分比降序排列
  return result.sort((a, b) => b.percent - a.percent)
})
```

### 7.2 参考资料

- MBTI官方评分标准
- EQ-i 2.0 情商评估模型
- 心理成熟度评估量表
- FPA性格色彩理论
