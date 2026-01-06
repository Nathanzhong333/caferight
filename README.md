# 咖啡对了 CafeRight

北京精品咖啡地图 - 帮助咖啡爱好者发现城市中的优质咖啡店

## 功能特点

- 🗺️ **互动地图**: 基于高德地图的咖啡店位置展示
- ☕ **咖啡店详情**: 查看咖啡店的详细信息、特色推荐
- 👨‍🍳 **大师评鉴**: 专业咖啡评鉴师的详细评价和评分
- 💬 **用户评价**: 咖啡爱好者的真实体验分享
- 📋 **列表视图**: 方便浏览和筛选咖啡店
- 📱 **响应式设计**: 支持桌面和移动设备

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **地图服务**: 高德地图 JavaScript API
- **样式**: Tailwind CSS
- **状态管理**: React Hooks

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置高德地图 API Key

1. 访问 [高德开放平台](https://lbs.amap.com/)
2. 注册并登录账号
3. 创建应用并获取 Web 端（JS API）的 API Key
4. 打开 `src/components/Map.tsx` 文件
5. 将 `YOUR_AMAP_KEY` 替换为您的 API Key

```typescript
AMapLoader.load({
  key: 'YOUR_AMAP_KEY', // 替换为您的高德地图 API Key
  version: '2.0',
  plugins: ['AMap.Marker', 'AMap.InfoWindow'],
})
```

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 运行

### 4. 构建生产版本

```bash
npm run build
```

## 项目结构

```
caferight/
├── src/
│   ├── components/          # React 组件
│   │   ├── Header.tsx       # 顶部导航栏
│   │   ├── Map.tsx          # 地图组件
│   │   ├── ShopList.tsx     # 咖啡店列表
│   │   └── ShopDetails.tsx  # 咖啡店详情侧边栏
│   ├── data/                # 数据文件
│   │   └── coffeeShops.ts   # 咖啡店示例数据
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts         # 数据模型
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── public/                  # 静态资源
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 数据模型

### CoffeeShop (咖啡店)
- 基本信息：名称、地址、位置坐标
- 评分和价格等级
- 特色咖啡推荐
- 用户评价和大师评鉴

### MasterReview (大师评鉴)
- 评鉴师信息和资质
- 综合评分和详细评分（口感、香气、环境、服务、性价比）
- 专业评价内容
- 精选标记

### Review (用户评价)
- 用户信息和评分
- 评价内容和标签
- 照片（待实现）

## 下一步计划

- [ ] 用户登录和个人中心
- [ ] 用户标记咖啡体验功能
- [ ] 收藏和笔记功能
- [ ] 咖啡店搜索和筛选
- [ ] 上传评价照片
- [ ] 后端API集成
- [ ] 数据库存储
- [ ] 咖啡相关产品商城
- [ ] 广告位管理
- [ ] 移动端应用

## 商业模式

1. **广告服务**: 为咖啡店提供推广位
2. **产品销售**: 销售咖啡豆、器具等相关产品
3. **会员服务**: 提供高级功能和优惠
4. **评鉴服务**: 付费邀请大师评鉴

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
