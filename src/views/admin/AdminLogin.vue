<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo">🧠</div>
        <h1>心理测试后台</h1>
        <p>管理您的心理测试平台</p>
      </div>

      <div class="login-form">
        <div class="form-group">
          <label>用户名</label>
          <input
            v-model="loginForm.username"
            type="text"
            placeholder="请输入用户名"
            @keyup.enter="handleLogin"
          />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          />
        </div>
        <div class="form-group captcha-group">
          <label>验证码</label>
          <div class="captcha-input">
            <input
              v-model="loginForm.captcha"
              type="text"
              placeholder="请输入验证码"
              @keyup.enter="handleLogin"
            />
            <div class="captcha-code" @click="refreshCaptcha">{{ captchaText }}</div>
          </div>
        </div>
        <button class="btn-login" @click="handleLogin" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </div>

      <div class="login-footer">
        <p>如忘记密码，请联系技术支持</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const API_BASE = import.meta.env.VITE_API_BASE || ''

const loading = ref(false)
const captchaText = ref('')

const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
})

// 生成随机验证码
function refreshCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaText.value = code
}

onMounted(() => {
  refreshCaptcha()
})

async function handleLogin() {
  if (!loginForm.username || !loginForm.password) {
    alert('请输入用户名和密码')
    return
  }

  // 验证码验证
  if (loginForm.captcha.toUpperCase() !== captchaText.value) {
    alert('验证码错误')
    refreshCaptcha()
    return
  }

  loading.value = true

  try {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: loginForm.username,
        password: loginForm.password
      })
    })

    const result = await response.json()

    if (result.code === 0) {
      // 保存登录状态
      localStorage.setItem('admin_token', result.data.token)
      localStorage.setItem('admin_user', JSON.stringify(result.data.user))
      router.push('/admin')
    } else {
      alert(result.message || '登录失败')
      refreshCaptcha()
    }
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请稍后重试')
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.login-container {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .logo {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    margin: 0 auto 16px;
  }

  h1 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #999;
  }
}

.login-form {
  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      font-size: 14px;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
    }

    &.captcha-group {
      .captcha-input {
        display: flex;
        gap: 12px;

        input {
          flex: 1;
        }

        .captcha-code {
          width: 100px;
          height: 46px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: white;
          letter-spacing: 4px;
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }

  .btn-login {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

.login-footer {
  margin-top: 24px;
  text-align: center;

  p {
    font-size: 13px;
    color: #999;
  }
}
</style>
