# 安全配置指南

## API 密钥安全

### 1. 环境变量配置（已实现）

项目使用环境变量来保护 API 密钥，不会将密钥直接暴露在代码中。

**配置步骤：**

1. 复制 `.env.example` 为 `.env.local`
   ```bash
   cp .env.example .env.local
   ```

2. 在 `.env.local` 中配置您的密钥
   ```
   VITE_AMAP_KEY=your_actual_key_here
   ```

3. `.env.local` 已在 `.gitignore` 中，不会被提交到 Git

### 2. 高德地图控制台安全设置（重要！）

即使使用环境变量，前端代码编译后密钥仍会暴露。为了防止滥用，**必须**在高德地图控制台进行以下设置：

#### 🔒 设置域名白名单
1. 登录 [高德开放平台](https://console.amap.com/)
2. 进入"应用管理" > 选择您的应用
3. 在 "Key 设置" 中，找到您的 Web 服务 Key
4. 点击"设置" > "安全设置"
5. 添加允许的域名：
   - 开发环境：`localhost:5173`、`127.0.0.1:5173`
   - 生产环境：`yourdomain.com`、`www.yourdomain.com`

#### 📊 设置访问限制
1. 在同一页面设置"调用量限制"
2. 建议设置：
   - 每日调用次数上限（如：10,000次/天）
   - 每秒请求数限制（如：100次/秒）

#### 🌐 IP 白名单（可选）
- 如果您的应用只在固定环境运行，可以设置 IP 白名单
- 不推荐用于公开网站

### 3. 生产环境最佳实践

#### 方案A：后端代理（推荐）
不直接在前端调用高德地图 API，而是通过后端转发：

```
前端 -> 您的后端 API -> 高德地图 API
```

优点：
- API 密钥完全隐藏
- 可以添加访问控制、用户认证
- 可以缓存结果，减少 API 调用
- 可以监控和限流

实现示例（Node.js/Express）：
```javascript
// 后端 API
app.get('/api/map/geocode', async (req, res) => {
  const { address } = req.query;

  // 验证请求
  if (!address) {
    return res.status(400).json({ error: '缺少地址参数' });
  }

  // 调用高德 API（密钥存在后端环境变量中）
  const response = await fetch(
    `https://restapi.amap.com/v3/geocode/geo?address=${address}&key=${process.env.AMAP_KEY}`
  );

  const data = await response.json();
  res.json(data);
});
```

#### 方案B：使用高德地图 JSAPI 安全密钥
高德提供了安全密钥功能，可以配合域名白名单使用。

### 4. 监控和告警

定期检查 API 使用情况：
1. 登录高德控制台查看"数据统计"
2. 关注异常流量
3. 设置用量告警（接近配额时通知）

### 5. 开发环境 vs 生产环境

建议使用不同的 API Key：

**开发环境** (`.env.local`)：
```
VITE_AMAP_KEY=dev_key_with_localhost_whitelist
```

**生产环境** (服务器配置)：
```
VITE_AMAP_KEY=prod_key_with_domain_whitelist
```

### 6. 泄露应急处理

如果密钥不慎泄露：

1. 立即在高德控制台"删除"或"重置"该 Key
2. 创建新的 Key 并配置安全设置
3. 检查是否有异常调用
4. 更新项目配置

## 其他安全建议

### 前端安全
- 不要在前端存储敏感用户信息
- 使用 HTTPS（生产环境）
- 实施 Content Security Policy (CSP)
- 防止 XSS 攻击

### 用户数据
- 遵守数据隐私法规（GDPR、个人信息保护法等）
- 用户评价需要审核机制
- 存储最小必要信息

## 参考资源

- [高德地图开发指南 - 安全设置](https://lbs.amap.com/api/javascript-api/guide/abc/prepare)
- [Vite 环境变量文档](https://vitejs.dev/guide/env-and-mode.html)
