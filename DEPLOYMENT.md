# 心理测试网站 - 开发部署文档

## 一、项目概述

本项目是一个心理测试网站，包含：
- **前端**：Vue3 + Vite 单页应用
- **后端**：Node.js + Express API服务
- **数据库**：MongoDB（可选，默认使用内存存储）

## 二、项目结构

```
psychology-test/
├── psychology-test/              # 前端项目
│   ├── src/
│   │   ├── views/               # 页面组件
│   │   │   ├── Home.vue         # 首页（测试列表）
│   │   │   ├── Test.vue         # 答题页面
│   │   │   ├── Result.vue       # 结果页面
│   │   │   └── Profile.vue     # 用户中心
│   │   ├── data/
│   │   │   └── quizzes.js      # 测试题库数据
│   │   ├── stores/              # 状态管理
│   │   ├── router/              # 路由配置
│   │   └── styles/              # 样式文件
│   ├── dist/                    # 构建产物（部署用）
│   └── package.json
│
└── psychology-test-server/       # 后端项目
    ├── src/
    │   ├── routes/              # API路由
    │   │   ├── auth.js          # 登录认证
    │   │   ├── quiz.js          # 测试题库
    │   │   ├── result.js        # 测试结果
    │   │   └── order.js         # 支付订单
    │   ├── models/              # 数据模型
    │   └── index.js             # 入口文件
    ├── .env.example            # 环境变量示例
    └── package.json
```

## 三、本地开发

### 3.1 前端开发

```bash
# 进入前端目录
cd psychology-test

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问地址：http://localhost:3000

# 构建生产版本
npm run build
```

### 3.2 后端开发

```bash
# 进入后端目录
cd psychology-test-server

# 安装依赖
npm install

# 启动服务
npm start

# 访问地址：http://localhost:8080
# 健康检查：http://localhost:8080/api/health
```

### 3.3 同时启动前后端

需要修改前端API地址：
- 打开 `src/api/index.js`（如不存在则创建）
- 配置后端API地址

## 四、线上部署

### 4.1 部署架构

```
用户访问 → Vercel (前端静态资源)
         → Railway/Render (后端API)
         → MongoDB Atlas (数据库)
```

### 4.2 前端部署（Vercel）

1. 注册 [Vercel](https://vercel.com) 账号
2. 连接GitHub仓库
3. 推送代码：
```bash
# 在psychology-test目录下
git init
git add .
git commit -m "init"
# 创建GitHub仓库并推送
```

4. Vercel会自动检测为Vue项目
5. 构建命令：`npm run build`
6. 输出目录：`dist`

### 4.3 后端部署（Railway）

1. 注册 [Railway](https://railway.app) 账号
2. 创建新项目，选择"Empty Project"
3. 添加GitHub仓库
4. 设置环境变量：
```
PORT=8080
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
```

5. 部署完成获取API地址

### 4.4 数据库（MongoDB Atlas）

1. 注册 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. 创建免费集群（Shared）
3. 设置用户名密码
4. 获取连接字符串：
```
mongodb+srv://username:password@cluster0.xxx.mongodb.net/psychology-test
```

### 4.5 微信支付配置

1. 注册微信商户号
2. 获取API密钥
3. 配置环境变量：
```
WECHAT_PAY_MCHID=your-mchid
WECHAT_PAY_APIKEY=your-apikey
WECHAT_PAY_NOTIFY_URL=https://your-domain.com/api/order/notify
```

## 五、API接口文档

### 5.1 健康检查
```
GET /api/health
```

### 5.2 用户认证

#### 微信登录
```
POST /api/auth/wechat-login
Body: { code, userInfo }
Response: { token, user }
```

#### 获取用户信息
```
GET /api/auth/profile
Header: Authorization: Bearer <token>
```

### 5.3 测试题库

#### 获取测试列表
```
GET /api/quiz/list
```

#### 获取测试详情
```
GET /api/quiz/:code
```

#### 获取测试题目
```
GET /api/quiz/:code/questions
```

#### 计算测试结果
```
POST /api/quiz/:code/calculate
Body: { answers, userId }
```

### 5.4 测试结果

#### 保存结果
```
POST /api/result/save
Body: { quizCode, answers, resultType, resultName, ... }
```

#### 获取结果
```
GET /api/result/:id
```

#### 获取用户历史
```
GET /api/result/user/history
Header: Authorization: Bearer <token>
```

### 5.5 订单支付

#### 创建订单
```
POST /api/order/create
Body: { resultId, quizCode }
```

#### 支付回调
```
POST /api/order/notify
```

#### 查询订单
```
GET /api/order/:orderNo
```

## 六、功能说明

### 6.1 测试流程

1. 用户进入首页，查看测试列表
2. 点击测试进入答题页面
3. 答题过程中自动保存进度
4. 答题完成后显示免费结果
5. 如需查看完整报告，支付解锁

### 6.2 付费机制

- 免费内容：基础结果（如MBTI类型）
- 付费内容：详细分析报告
- 支付方式：微信支付
- 支付成功后，结果标记为已付费

### 6.3 数据存储

- 用户数据：MongoDB
- 测试结果：MongoDB
- 订单数据：MongoDB
- （可选）使用内存存储，重启后丢失

## 七、测试题库

### 7.1 MBTI人格测试
- 题数：28题
- 维度：E/I, S/N, T/F, J/P
- 免费：4字母类型
- 付费：详细分析+职业建议

### 7.2 心理年龄测试
- 题数：15题
- 免费：心理年龄数字
- 付费：详细分析

### 7.3 性格色彩测试
- 题数：40题
- 四色：红、蓝、黄、绿
- 免费：主色判断
- 付费：全面分析

## 八、常见问题

### 8.1 数据库连接失败
- 检查MongoDB连接字符串是否正确
- 检查网络是否允许访问MongoDB Atlas

### 8.2 前端无法访问后端
- 检查后端是否运行
- 检查API地址配置
- 检查跨域配置

### 8.3 微信支付无法使用
- 需要申请微信商户号
- 需要配置域名白名单

## 九、后续扩展

### 9.1 第二期功能
- 星座运势测试
- 八字算命测试
- 职业兴趣测试
- 会员体系

### 9.2 第三期功能
- 数字能量测试
- 姓名打分
- 职场压力测试
- 企业版B2B

---

*文档版本：v1.0*
*更新日期：2026-03-09*
