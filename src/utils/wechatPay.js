/**
 * 微信支付服务
 * 用于在前端唤起微信支付
 */

// 判断是否在微信环境中
export function isWechat() {
  const ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('micromessenger') > -1
}

/**
 * 发起微信支付
 * @param {Object} payParams - 支付参数
 * @returns {Promise}
 */
export function wechatPay(payParams) {
  return new Promise((resolve, reject) => {
    if (!isWechat()) {
      reject(new Error('请在微信中打开'))
      return
    }

    // 微信JSSDK支付
    if (typeof WeixinJSBridge === 'undefined') {
      // WeixinJSBridge未准备好
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', () => {
          doWechatPay(payParams, resolve, reject)
        }, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', () => {
          doWechatPay(payParams, resolve, reject)
        })
        document.attachEvent('onWeixinJSBridgeReady', () => {
          doWechatPay(payParams, resolve, reject)
        })
      }
    } else {
      doWechatPay(payParams, resolve, reject)
    }
  })
}

function doWechatPay(payParams, resolve, reject) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    {
      appId: payParams.appId,
      timeStamp: payParams.timeStamp,
      nonceStr: payParams.nonceStr,
      package: payParams.package,
      signType: payParams.signType || 'MD5',
      paySign: payParams.paySign
    },
    (res) => {
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        resolve(res)
      } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
        reject(new Error('支付取消'))
      } else {
        reject(new Error('支付失败'))
      }
    }
  )
}

/**
 * 模拟支付（用于演示）
 * @param {string} orderNo - 订单号
 * @param {Function} apiFunc - API函数
 */
export async function simulatePay(orderNo, apiFunc = null) {
  // 模拟支付延迟
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 如果提供了API函数，调用API确认支付
  if (apiFunc) {
    await apiFunc(orderNo)
  }

  return { success: true }
}

/**
 * 通用支付函数
 * 自动选择微信支付或模拟支付
 * @param {Object} options - 支付选项
 */
export async function pay(options) {
  const { orderNo, payParams, payType, onSuccess, onError, onCancel, apiFunc } = options

  if (payType === 'wechat' && isWechat()) {
    // 微信支付
    try {
      await wechatPay(payParams)
      onSuccess?.()
    } catch (error) {
      if (error.message === '支付取消') {
        onCancel?.()
      } else {
        onError?.(error)
      }
    }
  } else {
    // 模拟支付
    try {
      await simulatePay(orderNo, apiFunc)
      onSuccess?.()
    } catch (error) {
      onError?.(error)
    }
  }
}
