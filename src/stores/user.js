import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref(null)
  const isLoggedIn = computed(() => !!userInfo.value)

  // 测试历史
  const testHistory = ref([])

  // 当前登录（模拟）
  function login(user) {
    userInfo.value = user
    // 保存到localStorage
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  // 登出
  function logout() {
    userInfo.value = null
    localStorage.removeItem('userInfo')
  }

  // 初始化（从localStorage恢复）
  function init() {
    const saved = localStorage.getItem('userInfo')
    if (saved) {
      try {
        userInfo.value = JSON.parse(saved)
      } catch (e) {
        localStorage.removeItem('userInfo')
      }
    }

    // 加载测试历史
    const history = localStorage.getItem('testHistory')
    if (history) {
      try {
        testHistory.value = JSON.parse(history)
      } catch (e) {
        testHistory.value = []
      }
    }
  }

  // 保存测试结果
  function saveTestResult(result) {
    testHistory.value.unshift(result)
    // 限制保存最近20条
    if (testHistory.value.length > 20) {
      testHistory.value = testHistory.value.slice(0, 20)
    }
    localStorage.setItem('testHistory', JSON.stringify(testHistory.value))
  }

  // 检查是否已购买
  function hasPurchased(quizCode, resultId) {
    return testHistory.value.some(
      r => r.quizCode === quizCode && r.id === resultId && r.isPaid
    )
  }

  // 标记为已购买
  function markAsPurchased(quizCode, resultId) {
    const result = testHistory.value.find(
      r => r.quizCode === quizCode && r.id === resultId
    )
    if (result) {
      result.isPaid = true
      localStorage.setItem('testHistory', JSON.stringify(testHistory.value))
    }
  }

  return {
    userInfo,
    isLoggedIn,
    testHistory,
    login,
    logout,
    init,
    saveTestResult,
    hasPurchased,
    markAsPurchased
  }
})
