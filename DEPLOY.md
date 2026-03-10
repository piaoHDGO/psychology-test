# 上线检查清单 & 资源需求

## 一、上线前必做事项

### 1.1 域名与备案
| 项目 | 要求 | 备注 |
|-----|------|------|
| 域名 | .com 或 .cn | 建议购买一年 |
| 备案 | 国内服务器需要 | 使用Vercel可跳过 |
| SSL证书 | 免费（Vercel提供） | 自动HTTPS |

### 1.2 微信配置
| 项目 | 状态 | 说明 |
|-----|------|------|
| 微信商户号 | ❌ 需申请 | 用于支付 |
| 微信AppID | ❌ 需申请 | 小程序/公众号 |
| 支付API密钥 | ❌ 需配置 | 商户后台获取 |

### 1.3 环境变量配置

**前端 (.env)**:
```bash
VITE_API_BASE=https://your-domain.com/api
VITE_ADMIN_USER=your_admin_user
VITE_ADMIN_PASS=your_secure_password
VITE_ADMIN_API_KEY=your_api_key
```

**后端 (.env)**:
```bash
PORT=8080
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-random-secret-key
WECHAT_PAY_ENABLED=false  # 测试时关闭
```

---

## 二、服务器资源需求

### 2.1 低成本方案（推荐）

| 服务 | 推荐方案 | 月成本 | 年成本 | 说明 |
|-----|---------|-------|-------|------|
| 前端托管 | **Vercel** | ¥0 | ¥0 | 免费100GB/月 |
| 后端API | **Railway** | ¥30 | ¥360 | $5/月套餐 |
| 数据库 | **MongoDB Atlas** | ¥0 | ¥0 | 免费512MB |
| 对象存储 | 暂不需要 | - | - | 后期添加 |
| 域名 | 阿里云/腾讯云 | ¥8 | ¥100 | .com域名 |
| **合计** | | | **¥460/年** |

### 2.2 备选方案

| 方案 | 服务商 | 特点 |
|-----|-------|------|
| 前端+后端一体化 | 腾讯云Serverless | 按量计费 |
| 纯前端 | Vercel + Railway | 分离部署 |
| 国内备案 | 阿里云轻量服务器 | ¥60/月起 |

---

## 三、当前项目已完成

### 3.1 功能清单 ✅
- [x] MBTI人格测试（70题）
- [x] 心理年龄测试
- [x] 性格色彩测试
- [x] 星座测试
- [x] 八字命格测试
- [x] 职业测试
- [x] 情商测试
- [x] 测试答题流程
- [x] 结果计算与展示
- [x] 付费解锁功能（模拟）
- [x] 分享海报
- [x] 后台管理
- [x] 数据同步

### 3.2 安全措施 ✅
- [x] API密钥验证
- [x] 管理员密码环境变量化
- [x] 无XSS漏洞
- [x] 无SQL注入

---

## 四、部署步骤

### 4.1 后端部署（Railway）

```bash
# 1. 安装Railway CLI
npm install -g railway

# 2. 登录
railway login

# 3. 初始化项目
railway init

# 4. 设置环境变量
railway variables set MONGODB_URI=your_mongodb_uri
railway variables set JWT_SECRET=your_secret
railway variables set ADMIN_API_KEY=your_key

# 5. 部署
railway up
```

### 4.2 前端部署（Vercel）

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod

# 或连接GitHub自动部署
```

### 4.3 本地测试

```bash
# 后端
cd psychology-test-server
npm install
cp .env.example .env  # 填入真实值
npm start

# 前端
cd psychology-test
npm install
cp .env.example .env
npm run dev
```

---

## 五、测试账号

| 角色 | 用户名 | 密码 | 说明 |
|-----|-------|------|------|
| 管理员 | admin | admin123 | 后台登录（需配置环境变量） |

---

## 六、上线检查项

- [ ] 域名解析正确
- [ ] SSL证书生效
- [ ] 后端API可访问
- [ ] 数据库连接正常
- [ ] 微信支付配置（如需真实支付）
- [ ] 管理员账号可登录
- [ ] 测试流程完整
- [ ] 付费流程测试
- [ ] 分享功能正常
- [ ] 移动端适配正常

---

## 七、后续优化

| 优先级 | 功能 | 说明 |
|-------|------|------|
| P0 | 微信登录 | 需申请微信开放平台 |
| P1 | 真实支付 | 需申请微信商户号 |
| P2 | 短信登录 | 阿里云短信服务 |
| P3 | 会员体系 | 月卡/年卡 |

---

*更新时间：2026-03-10*
