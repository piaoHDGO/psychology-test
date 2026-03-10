# 域名解析与部署详细指南

## 一、域名解析配置

### 1.1 获取服务器IP/地址

**如果部署到Vercel：**
1. 访问 https://vercel.com 并注册账号
2. 连接GitHub仓库后，会得到一个分配域名（如 your-project.vercel.app）
3. 在域名控制台添加解析：
   - 类型：`CNAME`
   - 主机记录：`@` 或 `www`
   - 记录值：`cname.vercel-dns.com`

**如果部署到Railway（后端API）：**
1. Railway项目会分配一个域名（如 your-project.up.railway.app）
2. 添加解析：
   - 类型：`CNAME`
   - 主机记录：`api`
   - 记录值：`your-project.up.railway.app`

### 1.2 国内域名服务商操作链接

| 服务商 | 登录地址 | 文档链接 |
|-------|---------|---------|
| 阿里云 | https://dns.console.aliyun.com | https://help.aliyun.com/document_detail/29725.html |
| 腾讯云 | https://console.dnspod.cn | https://docs.dnspod.com/dns/record |

### 1.3 解析配置示例

```
# 前端域名 (yourdomain.com)
类型: CNAME
主机记录: @
记录值: cname.vercel-dns.com

# www域名
类型: CNAME
主机记录: www
记录值: cname.vercel-dns.com

# API子域名 (可选)
类型: CNAME
主机记录: api
记录值: your-railway-app.up.railway.app
```

---

## 二、MongoDB Atlas 免费数据库配置

### 2.1 注册链接
👉 https://www.mongodb.com/cloud/atlas/register

### 2.2 创建集群步骤

1. **注册账号** - 使用GitHub或邮箱登录
2. **创建免费集群**
   - Provider: AWS / Google Cloud（选择离中国近的，如香港/新加坡）
   - Tier: M0 Sandbox（免费）
   - Cluster Name: psychology-test
3. **创建用户**
   - Username: admin
   - Password: 记住你设置的密码
4. **网络访问**
   - IP Access List: 添加 `0.0.0.0/0`（允许所有访问，生产环境建议限制IP）
5. **获取连接字符串**
   - 点击 "Connect" → "Connect your application"
   - 复制类似：`mongodb+srv://admin:password@cluster0.xxx.mongodb.net/psychology-test?retryWrites=true&w=majority`

### 2.3 文档链接
👉 https://www.mongodb.com/docs/atlas/

---

## 三、后端部署（Railway）

### 3.1 注册链接
👉 https://railway.app/

### 3.2 部署步骤

1. **登录** - 使用GitHub账号
2. **创建项目**
   - New Project → Empty Project
   - 命名：psychology-test-server
3. **连接GitHub仓库**
   - 点击 "GitHub" 图标
   - 选择 `psychology-test-server` 仓库
4. **配置环境变量**
   - 前往 https://railway.app/project/your-project/settings/variables
   - 添加以下变量：
   ```
   MONGODB_URI=mongodb+srv://admin:你的密码@cluster0.xxx.mongodb.net/psychology-test
   JWT_SECRET=随机字符串（用 openssl rand -hex 32 生成）
   ADMIN_API_KEY=admin-sync-key-2024（建议改复杂点）
   PORT=8080
   ```
5. **部署**
   - 点击 "Deploy"

### 3.3 注意事项
- 免费套餐：每月$5额度（约500小时）
- 首次部署可能需要等待2-3分钟

---

## 四、前端部署（Vercel）

### 4.1 注册链接
👉 https://vercel.com/

### 4.2 部署步骤

**方案A：GitHub自动部署（推荐）**

1. **登录** Vercel - 使用GitHub账号
2. **导入项目**
   - New Project → Import Git Repository
   - 选择 `psychology-test` 仓库
3. **配置**
   - Framework Preset: Vue.js
   - Build Command: `npm run build`（或留空）
   - Output Directory: `dist`（或留空）
4. **环境变量**
   - Settings → Environment Variables
   - 添加：
   ```
   VITE_API_BASE=https://your-railway-app.up.railway.app/api
   VITE_ADMIN_USER=admin
   VITE_ADMIN_PASS=你设置的密码
   VITE_ADMIN_API_KEY=admin-sync-key-2024
   ```
5. **部署**
   - 点击 Deploy

**方案B：CLI部署**

```bash
# 安装
npm i -g vercel

# 进入项目目录
cd psychology-test

# 登录
vercel login

# 部署
vercel --prod
```

### 4.3 文档链接
- Vercel文档：https://vercel.com/docs
- Vue部署：https://vercel.com/guides/deploying-vue3-to-vercel

---

## 五、微信支付配置（可选）

### 5.1 申请微信商户号
👉 https://pay.weixin.qq.com/

### 5.2 配置步骤

1. **注册商户号**
   - 需要营业执照（个体户也可）
   - 类目选择 "教育/在线教育/测试"

2. **获取API密钥**
   - 账户中心 → API安全 → 设置APIv2密钥

3. **配置后端环境变量**
   ```
   WECHAT_PAY_ENABLED=true
   WECHAT_PAY_MCHID=你的商户号
   WECHAT_PAY_APIKEY=你的API密钥
   WECHAT_PAY_NOTIFY_URL=https://yourdomain.com/api/order/notify
   ```

### 5.3 测试模式
- 当前可以先使用 `WECHAT_PAY_ENABLED=false` 模拟支付

---

## 六、完整配置清单

### 环境变量汇总

**后端 (Railway)**
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/psychology-test
JWT_SECRET=<随机字符串>
ADMIN_API_KEY=<自定义密钥>
WECHAT_PAY_ENABLED=false
```

**前端 (Vercel)**
```env
VITE_API_BASE=https://your-railway-app.up.railway.app/api
VITE_ADMIN_USER=admin
VITE_ADMIN_PASS=<你设置的密码>
VITE_ADMIN_API_KEY=<自定义密钥>
```

---

## 七、验证检查

部署完成后，访问以下地址验证：

- [ ] https://yourdomain.com → 前台首页
- [ ] https://yourdomain.com/admin → 后台登录
- [ ] https://your-railway-app.up.railway.app/api/health → API健康检查

---

## 八、常见问题

**Q: 访问域名显示404？**
A: 等待DNS解析生效（通常5分钟-2小时），检查Vercel是否绑定域名

**Q: API请求失败？**
A: 检查前端 VITE_API_BASE 是否正确指向Railway地址

**Q: 数据库连接失败？**
A: 检查MongoDB Atlas IP白名单是否添加 0.0.0.0/0

---

*更新时间：2026-03-10*
