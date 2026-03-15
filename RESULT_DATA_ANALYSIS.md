# Result.vue 数据来源分析文档

## 概述
本文档标注 Result.vue 中各数据的来源，区分真实计算数据、随机数据和硬编码模拟数据。

---

## MBTI 相关数据

| 数据字段 | 来源类型 | 说明 |
|---------|---------|------|
| `resultType` | **真实** | 从测试结果中获取，如 INTJ, ENFP 等 |
| `resultName` | **真实** | 从测试结果中获取，如 "👑 建筑师" |
| `mbtiTags` | **真实/默认** | 从保存结果中获取，无则使用默认值 ['#理性', '#独立', '#策划者'] |
| `mbtiScore` | **真实/默认** | 从 result.score 获取，无则使用默认值 78 |
| `mbtiDimensions` | **真实** | 从 result.answers 计算得出各维度倾向 |
| `mbtiComparePercent` | **随机** | `Math.floor(Math.random() * 30) + 60` - 每次渲染随机生成 60-90% |
| `mbtiRadarBars` | **硬编码** | 固定数据 `[25, 75, 85, 70, 75, 25, 15, 30]`，未使用用户答案 |
| `mbtiTypeName` | **真实** | 根据 resultType 映射人格名称 |
| `mbtiShareDesc` | **真实** | 根据 resultType 映射描述文字 |
| `mbtiSuggestions` | **硬编码** | 固定职业建议，未根据用户答案生成 |

---

## EQ 情商测试数据

| 数据字段 | 来源类型 | 说明 |
|---------|---------|------|
| `eqTotalScore` | **真实** | 从 result.answers 累加计算得分，无则默认 82 |
| `eqLevel` | **真实** | 根据 eqTotalScore 计算等级 (high/mid-high/mid/low) |
| `eqLevelText` | **真实** | 根据等级返回对应文本 |
| `eqComparePercent` | **真实** | `Math.floor(eqTotalScore.value - 10)` - 基于得分的计算值 |
| `eqDimensions` | **硬编码** | 固定维度数据 `[{name:'自我认知', score:18, ...}, ...]` |
| `eqInsights` | **硬编码** | 固定的解读文本，未根据用户答案生成 |

---

## 心理成熟度测试数据

| 数据字段 | 来源类型 | 说明 |
|---------|---------|------|
| `ageScore` | **真实/默认** | 从 result.score 获取，无则默认 36 |
| `ageTotalScore` | **硬编码** | 固定值 48 |
| `ageLevel` | **真实** | 根据 ageScore 计算等级 (high/mid/low/needs) |
| `ageLevelText` | **真实** | 根据等级返回对应文本 |
| `ageComparePercent` | **硬编码** | 固定值 75% |
| `ageDimensions` | **硬编码** | 固定维度数据 |
| `ageInsights` | **硬编码** | 固定的解读文本 |

---

## 性格色彩测试数据

| 数据字段 | 来源类型 | 说明 |
|---------|---------|------|
| `colorData` | **硬编码** | 固定颜色数据 `[{name:'红色', percent:40, ...}, ...]` |
| `mainColor` | **硬编码** | 固定取 colorData[0] |
| `subColor` | **硬编码** | 固定取 colorData[1] |
| `colorComparePercent` | **硬编码** | 固定值 65% |
| `colorShareType` | **硬编码** | 根据 mainColor 映射类型 |
| `colorInsights` | **硬编码** | 固定的解读文本 |

---

## 需要优化的地方

### 1. 随机数据（应改为真实计算）
- [ ] **mbtiComparePercent** - 目前随机生成，应根据用户得分计算

### 2. 硬编码数据（应从用户答案计算）
- [ ] **mbtiRadarBars** - 应根据用户答案计算八个维度的真实得分
- [ ] **eqDimensions** - 应根据用户答案计算五个维度的真实得分
- [ ] **ageDimensions** - 应根据用户答案计算六个维度的真实得分
- [ ] **colorData** - 应根据用户答案计算四种颜色的真实比例
- [ ] **mbtiSuggestions** - 应根据人格类型生成个性化建议
- [ ] **eqInsights** - 应根据各维度得分生成个性化解读
- [ ] **ageInsights** - 应根据各维度得分生成个性化解读
- [ ] **colorInsights** - 应根据主辅色生成个性化解读

### 3. 比较百分比（需要真实数据支持）
- [ ] **ageComparePercent** - 需要所有用户历史数据才能计算真实排名
- [ ] **colorComparePercent** - 同上

---

## 优化优先级

1. **高优先级**：雷达图/维度数据 - 用户能明显感知到数据不真实
2. **中优先级**：Insights 解读 - 影响用户体验
3. **低优先级**：比较百分比 - 需要后端数据支持

---

## 备注

- 当前测试数据存储在 `localStorage` 的 `testHistory` 中
- 需要后端支持才能实现真实的用户比较排名
- 部分数据可以预先根据题目答案计算后存储，避免每次动态计算
