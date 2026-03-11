<template>
  <div class="share-poster" v-if="visible">
    <div class="poster-mask" @click="close"></div>
    <div class="poster-content">
      <div class="poster-card" ref="posterRef">
        <!-- 海报顶部 -->
        <div class="poster-header gradient-bg">
          <div class="poster-brand">心理测试</div>
          <div class="poster-icon">{{ quizIcon }}</div>
          <div class="poster-title">{{ quizName }}</div>
        </div>

        <!-- 海报中间 -->
        <div class="poster-body">
          <div class="result-type">{{ resultType }}</div>
          <div class="result-name">{{ resultName }}</div>
          <div class="result-desc">{{ resultDesc }}</div>

          <!-- 二维码区域 -->
          <div class="qr-section">
            <div class="qr-code">
              <img :src="qrCodeUrl" alt="扫码测试" />
            </div>
            <div class="qr-tip">长按识别二维码</div>
            <div class="qr-tip">我在mindceshi.cn测出了{{ resultType }}，你也来测测吧</div>
          </div>

          <!-- 底部 -->
          <div class="poster-footer">
            <div class="footer-text">mindceshi.cn · 专业的心理测试平台</div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="poster-actions">
        <button class="btn-save" @click="savePoster">保存图片</button>
        <button class="btn-share" @click="sharePoster">分享给朋友</button>
      </div>
      <div class="share-tip">分享到朋友圈/好友，一起测试吧</div>
      <button class="btn-close" @click="close">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'

const props = defineProps({
  visible: Boolean,
  quizName: String,
  quizIcon: String,
  resultType: String,
  resultName: String,
  resultDesc: String
})

const emit = defineEmits(['close'])

const posterRef = ref(null)
const qrCodeUrl = ref('')

// 生成二维码（使用API）
const generateQRCode = () => {
  // 使用免费的二维码API
  const text = window.location.href
  qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`
}

generateQRCode()

function close() {
  emit('close')
}

async function savePoster() {
  if (!posterRef.value) return

  try {
    const canvas = await html2canvas(posterRef.value, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    })

    // 生成图片并下载
    const link = document.createElement('a')
    link.download = `测试结果-${props.quizName}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (error) {
    console.error('保存海报失败:', error)
    alert('保存失败，请重试')
  }
}

function sharePoster() {
  const shareText = `我在mindceshi.cn测出了${props.resultType}${props.resultName}，你也来测测吧！`

  // 唤起系统分享
  if (navigator.share) {
    navigator.share({
      title: `我的${props.quizName}结果是${props.resultType}`,
      text: shareText,
      url: window.location.href
    })
  } else if (navigator.clipboard) {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(` ${shareText} ${window.location.href}`)
    alert('链接已复制到剪贴板，快去分享给朋友吧！')
  } else {
    alert('请长按海报保存图片分享')
  }
}
</script>

<style lang="scss" scoped>
.share-poster {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  .poster-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  .poster-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
  }

  .poster-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .poster-header {
    padding: 30px 20px 25px;
    text-align: center;
    color: white;
    position: relative;

    .poster-brand {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 11px;
      opacity: 0.8;
      letter-spacing: 2px;
    }

    .poster-icon {
      font-size: 48px;
      margin-bottom: 8px;
    }

    .poster-title {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .poster-body {
    padding: 20px;
    text-align: center;

    .result-type {
      font-size: 36px;
      font-weight: 700;
      color: #333;
      margin-bottom: 8px;
    }

    .result-name {
      font-size: 18px;
      font-weight: 600;
      color: #667eea;
      margin-bottom: 8px;
    }

    .result-desc {
      font-size: 13px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .qr-section {
      margin: 20px 0;

      .qr-code {
        width: 120px;
        height: 120px;
        margin: 0 auto 10px;
        background: #f5f5f5;
        border-radius: 8px;
        padding: 8px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .qr-tip {
        font-size: 12px;
        color: #999;
      }
    }

    .poster-footer {
      padding-top: 15px;
      border-top: 1px dashed #eee;

      .footer-text {
        font-size: 11px;
        color: #999;
      }
    }
  }

  .poster-actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;

    button {
      flex: 1;
      padding: 14px;
      border: none;
      border-radius: 25px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-save {
      background: white;
      color: #667eea;
    }

    .btn-share {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }
  }

  .btn-close {
    width: 100%;
    margin-top: 12px;
    padding: 12px;
    background: transparent;
    border: none;
    color: #999;
    font-size: 14px;
    cursor: pointer;
  }

  .share-tip {
    text-align: center;
    font-size: 12px;
    color: #fff;
    margin-top: 8px;
  }
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
