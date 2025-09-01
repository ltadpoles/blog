# 🌟 Vue 3 博客系统

基于 Vue 3 + Vite + Element Plus 构建的现代化博客前端系统，支持 SSR/SSG、响应式布局、文章管理、评论系统等功能。

## ✨ 项目特色

- 🚀 **现代化技术栈**：Vue 3.5 + Vite 7.0 + Element Plus 2.10
- 📱 **响应式设计**：桌面端/移动端自适应布局
- 🔧 **SSR/SSG 支持**：基于 vite-ssg 的静态站点生成
- 🎨 **主题切换**：支持明暗主题切换
- 💬 **评论系统**：完整的评论和回复功能
- 🏷️ **分类标签**：文章分类和标签管理
- 📊 **数据统计**：文章、分类、标签统计
- 🔍 **SEO 优化**：完善的 SEO 配置和 sitemap 生成
- 📦 **组件化**：可复用的 Vue 组件设计
- 🛠️ **开发体验**：ESLint + Prettier + 自动导入

## 🏗️ 技术架构

### 核心技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.18 | 渐进式 JavaScript 框架 |
| Vite | 7.0.6 | 下一代前端构建工具 |
| Vue Router | 4.5.1 | Vue.js 官方路由管理器 |
| Pinia | 3.0.3 | Vue 状态管理库 |
| Element Plus | 2.10.5 | Vue 3 组件库 |
| Sass | 1.89.2 | CSS 预处理器 |
| Axios | 1.11.0 | HTTP 客户端 |
| vite-ssg | 28.0.0 | Vite 静态站点生成器 |

### 开发工具

- **代码规范**：ESLint 9.31 + Prettier 3.6
- **自动导入**：unplugin-auto-import + unplugin-vue-components
- **图标系统**：vite-plugin-svg-icons
- **Markdown 渲染**：md-editor-v3
- **进度条**：nprogress

## 📁 项目结构

```
blog/
├── src/
│   ├── api/                 # API 接口封装
│   │   ├── article.js       # 文章相关接口
│   │   ├── comment.js       # 评论相关接口
│   │   ├── user.js          # 用户相关接口
│   │   └── ...
│   ├── assets/              # 静态资源
│   │   ├── styles/          # 样式文件
│   │   └── svg/             # SVG 图标
│   ├── components/          # 可复用组件
│   │   ├── article/         # 文章列表组件
│   │   ├── comment-form/    # 评论表单组件
│   │   ├── comment-list/    # 评论列表组件
│   │   ├── svgIcon/         # SVG 图标组件
│   │   └── ...
│   ├── config/              # 配置文件
│   │   ├── index.js         # 基础配置
│   │   ├── seo.js           # SEO 配置
│   │   └── sitemap.js       # 站点地图配置
│   ├── layout/              # 布局组件
│   │   ├── header/          # 页面头部
│   │   ├── footer/          # 页面底部
│   │   └── index.vue        # 主布局
│   ├── router/              # 路由配置
│   ├── stores/              # Pinia 状态管理
│   │   ├── modules/         # 状态模块
│   │   └── index.js         # 状态管理入口
│   ├── utils/               # 工具函数
│   │   ├── http/            # HTTP 请求封装
│   │   └── index.js         # 通用工具函数
│   ├── views/               # 页面组件
│   │   ├── dashboard/       # 首页/文章列表
│   │   ├── article/         # 文章详情页
│   │   ├── archive/         # 文章归档页
│   │   ├── about/           # 关于页面
│   │   └── board/           # 留言板
│   ├── App.vue              # 根组件
│   └── main.js              # 应用入口
├── scripts/                 # 构建脚本
│   └── generate-sitemap.js  # 站点地图生成脚本
├── vite.config.js           # Vite 配置
├── package.json             # 项目依赖
└── README.md                # 项目说明
```

## 🚀 快速开始

### 环境要求

- **Node.js**：^20.19.0 或 >=22.12.0
- **包管理器**：pnpm（推荐）
- **IDE**：VSCode + Volar 插件

### 安装依赖

```bash
# 使用 pnpm 安装依赖（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发环境启动

```bash
# 启动开发服务器
pnpm dev

# 服务器将在 http://localhost:816 启动
```

### 构建部署

```bash
# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 仅构建（不生成 sitemap）
pnpm build:basic
```

### 代码规范

```bash
# 代码格式化
pnpm format

# 代码检查和修复
pnpm lint

# 生成站点地图
pnpm sitemap
```

## 🔧 配置说明

### 基础配置

在 `src/config/index.js` 中配置基础参数：

```javascript
export default {
  // Pinia 持久化存储类型
  PINIASTORY: localStorage,
  // API 代理地址
  BASEURL: '/api'
}
```

### SEO 配置

在 `src/config/seo.js` 中配置 SEO 信息：

```javascript
export const seoConfig = {
  siteName: '你的网站名称',
  siteDescription: '网站描述',
  author: '作者名称',
  siteUrl: 'https://yourdomain.com'
  // ... 更多配置
}
```

### 开发服务器配置

在 `vite.config.js` 中配置开发服务器：

```javascript
server: {
  port: 816,                    // 开发服务器端口
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',  // 后端 API 地址
      changeOrigin: true
    }
  }
}
```

## 🌐 功能特性

### 📝 文章系统

- **文章列表**：支持分页加载、分类筛选、标签过滤
- **文章详情**：Markdown 渲染、目录生成、代码高亮
- **文章归档**：按时间归档文章
- **分类管理**：文章分类展示和统计
- **标签系统**：文章标签管理和筛选

### 💬 评论系统

- **评论展示**：嵌套评论和回复功能
- **表情支持**：内置表情选择器
- **XSS 防护**：安全的内容过滤
- **点赞功能**：评论点赞交互
- **分页支持**：评论列表分页

### 🎨 用户界面

- **响应式布局**：桌面端/移动端自适应
- **主题切换**：明暗主题支持
- **页面过渡**：流畅的路由切换动画
- **加载状态**：页面加载进度条
- **返回顶部**：滚动监听和快速返回

### 🔍 SEO 优化

- **元数据管理**：动态 title、description、keywords
- **Open Graph**：社交媒体分享优化
- **结构化数据**：搜索引擎友好
- **站点地图**：自动生成 sitemap.xml
- **robots.txt**：搜索引擎爬虫配置

## 🛠️ 开发指南

### 组件开发

项目采用组件化开发模式，新组件应遵循以下规范：

1. **文件命名**：使用 kebab-case 命名
2. **组件结构**：template + script setup + style scoped
3. **props 定义**：使用 defineProps 定义属性类型
4. **方法暴露**：使用 defineExpose 暴露必要的方法
5. **样式隔离**：使用 scoped 样式或 CSS Modules

### API 接口

所有 API 接口统一在 `src/api/` 目录下管理：

```javascript
// 示例：src/api/article.js
import http from '@/utils/http'

// 获取文章列表
export const getArticleList = (params) => {
  return http.get('/article/list', { params })
}

// 获取文章详情
export const getArticleDetail = (id) => {
  return http.get(`/article/${id}`)
}
```

### 状态管理

使用 Pinia 进行状态管理，支持持久化存储：

```javascript
// 示例：src/stores/modules/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    token: ''
  }),
  
  actions: {
    setUser(data) {
      this.userInfo = data
    }
  },
  
  persist: {
    key: 'user-store',
    storage: localStorage
  }
})
```

## 📱 部署指南

### 静态部署

项目支持静态部署到各种平台：

```bash
# 构建静态文件
pnpm build

# 构建产物在 dist 目录
# 可以直接部署到 Nginx、Vercel、Netlify 等平台
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/blog/dist;
    index index.html;
    
    # 处理 SPA 路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
    
    # API 代理（如果需要）
    location /api/ {
        proxy_pass http://your-backend-api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 环境变量

在项目根目录创建环境变量文件：

```bash
# .env.production
VITE_API_BASE_URL=https://your-api-domain.com
VITE_SITE_URL=https://yourdomain.com
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 打开 Pull Request

### 代码规范

- 遵循 ESLint 和 Prettier 规则
- 提交前运行 `pnpm lint` 检查代码
- 使用语义化的 commit 信息

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源协议。

## 📞 联系方式

- 作者：游荡de蝌蚪
- 网站：[www.yddekd.com](https://www.yddekd.com)
- GitHub：[ltadpoles](https://github.com/ltadpoles)

---

⭐ 如果这个项目对你有帮助，请给它一个 star！
