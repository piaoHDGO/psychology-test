<template>
  <div class="admin-settings">
    <h1 class="page-title">系统配置</h1>

    <!-- 支付配置 -->
    <div class="settings-section">
      <h2>💰 支付配置</h2>
      <div class="settings-card">
        <div class="setting-item">
          <div class="setting-info">
            <label>启用微信支付</label>
            <p>开启后用户可以使用微信支付</p>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="settings.enableWechatPay" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <label>微信AppID</label>
            <input v-model="settings.wechatAppId" type="text" placeholder="请输入微信AppID" />
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <label>微信商户号</label>
            <input v-model="settings.wechatMchId" type="text" placeholder="请输入微信商户号" />
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <label>支付回调地址</label>
            <input v-model="settings.payNotifyUrl" type="text" placeholder="https://your-domain.com/api/order/notify" />
          </div>
        </div>
      </div>
    </div>

    <!-- 常规配置 -->
    <div class="settings-section">
      <h2>⚙️ 常规配置</h2>
      <div class="settings-card">
        <div class="setting-item">
          <div class="setting-info">
            <label>网站名称</label>
            <input v-model="settings.siteName" type="text" />
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <label>客服电话</label>
            <input v-model="settings.phone" type="text" />
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <label>用户协议链接</label>
            <input v-model="settings.termsUrl" type="text" />
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <label>隐私政策链接</label>
            <input v-model="settings.privacyUrl" type="text" />
          </div>
        </div>
      </div>
    </div>

    <!-- 报告配置 -->
    <div class="settings-section">
      <h2>📄 报告配置</h2>
      <div class="settings-card">
        <div class="setting-item">
          <div class="setting-info">
            <label>报告底部版权</label>
            <textarea v-model="settings.copyright" rows="2"></textarea>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <label>免责声明</label>
            <textarea v-model="settings.disclaimer" rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="save-bar">
      <button class="btn-save" @click="saveSettings">保存配置</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const settings = reactive({
  enableWechatPay: false,
  wechatAppId: '',
  wechatMchId: '',
  payNotifyUrl: '',
  siteName: '心理测试大全',
  phone: '400-888-8888',
  termsUrl: '',
  privacyUrl: '',
  copyright: '© 2024 心理测试大全 版权所有',
  disclaimer: '本测试结果仅供参考娱乐，不作为任何决策依据。测试结果不代表专业心理诊断，如有心理困扰请咨询专业医生。'
})

function saveSettings() {
  // 保存到localStorage
  localStorage.setItem('admin_settings', JSON.stringify(settings))
  alert('保存成功！')
}
</script>

<style lang="scss" scoped>
.admin-settings {
  .page-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #333;
  }
}

.settings-section {
  margin-bottom: 24px;

  h2 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }
}

.settings-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  .setting-item {
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .setting-info {
      label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        margin-bottom: 8px;
      }

      p {
        font-size: 13px;
        color: #999;
        margin-bottom: 8px;
      }

      input, textarea {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #667eea;
        }
      }
    }
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 26px;

    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
  }

  input:checked + .slider {
    background-color: #667eea;
  }

  input:checked + .slider:before {
    transform: translateX(24px);
  }
}

.save-bar {
  position: fixed;
  bottom: 0;
  left: 220px;
  right: 0;
  padding: 16px 24px;
  background: white;
  border-top: 1px solid #f0f0f0;
  text-align: right;

  .btn-save {
    padding: 12px 32px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
