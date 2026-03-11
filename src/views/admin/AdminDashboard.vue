<template>
  <div class="admin-dashboard">
    <h1 class="page-title">仪表盘</h1>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea, #764ba2);">
          📊
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.totalTests }}</div>
          <div class="stat-label">测试总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #11998e, #38ef7d);">
          👥
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.totalUsers }}</div>
          <div class="stat-label">用户总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #ff9966, #ff5e62);">
          💰
        </div>
        <div class="stat-info">
          <div class="stat-value">¥{{ stats.totalRevenue }}</div>
          <div class="stat-label">总收入</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #a8edea, #fed6e3);">
          📦
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.todayOrders }}</div>
          <div class="stat-label">今日订单</div>
        </div>
      </div>
    </div>

    <!-- 数据图表区域 -->
    <div class="charts-row">
      <div class="chart-card">
        <h3>📈 最近7天订单趋势</h3>
        <div class="chart-placeholder">
          <div class="chart-bars">
            <div v-for="(val, i) in weekData" :key="i" class="bar-wrapper">
              <div class="bar" :style="{ height: val + '%' }"></div>
              <span class="bar-label">{{ weekLabels[i] }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3>📊 测试类型分布</h3>
        <div class="pie-placeholder">
          <div class="pie-chart">
            <div class="pie-item" v-for="(item, i) in pieData" :key="i">
              <span class="pie-color" :style="{ background: item.color }"></span>
              <span class="pie-label">{{ item.name }}</span>
              <span class="pie-value">{{ item.value }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 测试列表 -->
    <div class="section">
      <div class="section-header">
        <h2>📝 测试概览</h2>
        <router-link to="/admin/quizzes" class="more-link">管理 →</router-link>
      </div>
      <div class="quiz-table">
        <table>
          <thead>
            <tr>
              <th>测试名称</th>
              <th>分类</th>
              <th>价格</th>
              <th>测试次数</th>
              <th>收入</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="quiz in quizzes" :key="quiz.code">
              <td>
                <span class="quiz-icon" :style="{ background: quiz.color }">{{ quiz.icon }}</span>
                {{ quiz.name }}
              </td>
              <td>{{ getCategoryName(quiz.category) }}</td>
              <td class="price">¥{{ quiz.price }}</td>
              <td>{{ Math.floor(Math.random() * 1000) + 100 }}</td>
              <td class="revenue">¥{{ (Math.random() * 5000 + 500).toFixed(2) }}</td>
              <td>
                <span class="status-badge active">上线中</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="section quick-section">
      <h2>⚡ 快捷操作</h2>
      <div class="quick-actions">
        <router-link to="/admin/quizzes" class="action-btn">
          <span class="action-icon">➕</span>
          <span>添加测试</span>
        </router-link>
        <router-link to="/admin/orders" class="action-btn">
          <span class="action-icon">📋</span>
          <span>查看订单</span>
        </router-link>
        <router-link to="/admin/settings" class="action-btn">
          <span class="action-icon">⚙️</span>
          <span>系统设置</span>
        </router-link>
        <a href="/" target="_blank" class="action-btn">
          <span class="action-icon">🌐</span>
          <span>访问前台</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getQuizList } from '@/data/quizzes'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

const quizzes = ref(getQuizList())

const stats = ref({
  totalTests: 0,
  totalUsers: 0,
  totalRevenue: 0,
  todayOrders: 0
})

const weekData = ref([0, 0, 0, 0, 0, 0, 0])
const weekLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const pieData = ref([])

// 从API获取统计数据
async function fetchStats() {
  try {
    const response = await fetch(`${API_BASE}/stats/stats?period=7d`)
    const data = await response.json()

    if (data.code === 0) {
      const s = data.data
      stats.value = {
        totalTests: s.totalTests || 0,
        totalUsers: s.totalUsers || 0,
        totalRevenue: s.totalRevenue || 0,
        todayOrders: s.periodPaidOrders || 0
      }

      // 更新趋势图数据
      if (s.trendData && s.trendData.length > 0) {
        const tests = s.trendData.map(d => d.tests)
        const maxTests = Math.max(...tests, 1)
        weekData.value = tests.map(t => (t / maxTests) * 100)
      }
    }
  } catch (e) {
    console.error('获取统计数据失败:', e)
  }
}

// 获取测试类型分布
async function fetchQuizStats() {
  try {
    const response = await fetch(`${API_BASE}/stats/stats?period=all`)
    const data = await response.json()

    if (data.code === 0 && data.data.trendData) {
      // 从趋势数据计算各测试的分布
      const quizCounts = {}
      data.data.trendData.forEach(d => {
        // 这里可以进一步获取每个quiz的统计
      })
    }
  } catch (e) {
    console.error('获取测试分布失败:', e)
  }
}

onMounted(() => {
  fetchStats()
  fetchQuizStats()
})

function getCategoryName(category) {
  const names = {
    psychology: '心理测试',
    career: '职业测试',
    fengshui: '玄学测试'
  }
  return names[category] || category
}
</script>

<style lang="scss" scoped>
.admin-dashboard {
  .page-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #333;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  .stat-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-4px);
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-right: 16px;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #333;
    }

    .stat-label {
      font-size: 13px;
      color: #999;
      margin-top: 4px;
    }
  }
}

.charts-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  .chart-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);

    h3 {
      font-size: 15px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }

    .chart-placeholder {
      height: 180px;
    }

    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 150px;
      padding-top: 20px;

      .bar-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;

        .bar {
          width: 32px;
          background: linear-gradient(180deg, #667eea, #764ba2);
          border-radius: 6px 6px 0 0;
          transition: height 0.5s ease;
        }

        .bar-label {
          font-size: 12px;
          color: #999;
          margin-top: 8px;
        }
      }
    }

    .pie-placeholder {
      .pie-chart {
        .pie-item {
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .pie-color {
            width: 12px;
            height: 12px;
            border-radius: 3px;
            margin-right: 10px;
          }

          .pie-label {
            flex: 1;
            font-size: 13px;
            color: #333;
          }

          .pie-value {
            font-size: 13px;
            font-weight: 600;
            color: #667eea;
          }
        }
      }
    }
  }
}

.section {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h2 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .more-link {
      color: #667eea;
      text-decoration: none;
      font-size: 13px;
    }
  }

  &.quick-section {
    h2 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }
  }
}

.quiz-table {
  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 14px 12px;
      text-align: left;
      border-bottom: 1px solid #f5f5f5;
    }

    th {
      font-size: 12px;
      color: #999;
      font-weight: 500;
    }

    td {
      font-size: 14px;
      color: #333;

      &.price {
        color: #ff6b6b;
        font-weight: 600;
      }

      &.revenue {
        color: #52c41a;
        font-weight: 600;
      }
    }

    .quiz-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      margin-right: 10px;
      font-size: 14px;
    }

    .status-badge {
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;

      &.active {
        background: #e8f5e9;
        color: #52c41a;
      }
    }
  }
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  .action-btn {
    padding: 24px 16px;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 12px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.2s;

    .action-icon {
      font-size: 32px;
      margin-bottom: 12px;
    }

    span:last-child {
      color: #666;
      font-size: 14px;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }
  }
}
</style>
