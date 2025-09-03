# 🌟 Vue 3 博客系统

> 基于 Vue 3 + Vite + Element Plus 构建的现代化博客前端系统，支持 SSR/SSG、响应式布局、文章管理、评论系统等功能。

[![Vue](https://img.shields.io/badge/Vue-3.5.18-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.10.5-409EFF?style=flat-square&logo=element)](https://element-plus.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.19.0-brightgreen?style=flat-square&logo=node.js)](https://nodejs.org/)

## 📖 目录

- [✨ 项目特色](#-项目特色)
- [🏗️ 技术架构](#️-技术架构)
- [📁 项目结构](#-项目结构)
- [🚀 快速开始](#-快速开始)
- [🔧 配置说明](#-配置说明)
- [🌐 功能特性](#-功能特性)
- [🛠️ 开发指南](#️-开发指南)
- [📱 部署指南](#-部署指南)
- [🤝 贡献指南](#-贡献指南)
- [📄 开源协议](#-开源协议)

## ✨ 项目特色

- 🚀 **现代化技术栈**：Vue 3.5 + Vite 7.0 + Element Plus 2.10
- 📱 **响应式设计**：桌面端/移动端自适应布局，支持多种断点
- 🔧 **SSR/SSG 支持**：基于 vite-ssg 的静态站点生成，SEO 友好
- 🎨 **主题系统**：支持明暗主题切换，主题持久化存储
- 💬 **评论系统**：完整的评论和回复功能，支持表情和点赞
- 🏷️ **内容管理**：文章分类、标签管理，支持归档和搜索
- 📊 **数据统计**：文章、分类、标签统计，访问量统计
- 🔍 **SEO 优化**：完善的 SEO 配置、sitemap 生成、结构化数据
- 📦 **组件化架构**：高度可复用的 Vue 组件设计
- 🛠️ **开发体验**：ESLint + Prettier + 自动导入 + 热更新
- 🚧 **维护模式**：支持网站维护状态管理，自动阻止 API 调用
- 🚨 **错误处理**：404、500 错误页面，全局错误拦截和处理

## 🏗️ 技术架构

### 核心技术栈

| 技术 | 版本 | 说明 | 官网 |
|------|------|------|------|
| [Vue](https://vuejs.org/) | 3.5.18 | 渐进式 JavaScript 框架 | [vuejs.org](https://vuejs.org/) |
| [Vite](https://vitejs.dev/) | 7.0.6 | 下一代前端构建工具 | [vitejs.dev](https://vitejs.dev/) |
| [Vue Router](https://router.vuejs.org/) | 4.5.1 | Vue.js 官方路由管理器 | [router.vuejs.org](https://router.vuejs.org/) |
| [Pinia](https://pinia.vuejs.org/) | 3.0.3 | Vue 状态管理库 | [pinia.vuejs.org](https://pinia.vuejs.org/) |
| [Element Plus](https://element-plus.org/) | 2.10.5 | Vue 3 组件库 | [element-plus.org](https://element-plus.org/) |
| [Sass](https://sass-lang.com/) | 1.89.2 | CSS 预处理器 | [sass-lang.com](https://sass-lang.com/) |
| [Axios](https://axios-http.com/) | 1.11.0 | HTTP 客户端 | [axios-http.com](https://axios-http.com/) |
| [vite-ssg](https://github.com/antfu/vite-ssg) | 28.0.0 | Vite 静态站点生成器 | [github.com/antfu/vite-ssg](https://github.com/antfu/vite-ssg) |

### 开发工具链

| 工具 | 版本 | 说明 |
|------|------|------|
| **代码规范** | ESLint 9.31 + Prettier 3.6 | 代码质量检查和格式化 |
| **自动导入** | unplugin-auto-import + unplugin-vue-components | 自动导入 Vue 和 Element Plus 组件 |
| **图标系统** | vite-plugin-svg-icons | SVG 图标自动注册和管理 |
| **Markdown 渲染** | md-editor-v3 | Markdown 内容渲染 |
| **进度条** | nprogress | 路由切换进度条 |
| **SEO 管理** | @unhead/vue | 动态 SEO 元数据管理 |
| **站点地图** | vite-plugin-sitemap | 自动生成 sitemap.xml |

## 📁 项目结构

```
blog/
├── 📁 src/                          # 源代码目录
│   ├── 📁 api/                      # API 接口封装
│   │   ├── 📄 article.js            # 文章相关接口
│   │   ├── 📄 board.js              # 留言板接口
│   │   ├── 📄 comment.js            # 评论相关接口
│   │   ├── 📄 like.js               # 点赞相关接口
│   │   ├── 📄 user.js               # 用户相关接口
│   │   └── 📄 index.js              # 通用接口
│   ├── 📁 assets/                   # 静态资源
│   │   ├── 📁 fonts/                # 字体文件
│   │   ├── 📁 images/               # 图片资源
│   │   ├── 📁 styles/               # 样式文件
│   │   │   ├── 📄 base.scss         # 基础样式
│   │   │   ├── 📄 element.scss      # Element Plus 样式
│   │   │   ├── 📄 index.scss        # 主样式文件
│   │   │   └── 📄 transition.scss   # 过渡动画样式
│   │   └── 📁 svg/                  # SVG 图标
│   ├── 📁 components/               # 可复用组件
│   │   ├── 📁 article/              # 文章列表组件
│   │   ├── 📁 comment-form/         # 评论表单组件
│   │   ├── 📁 comment-list/         # 评论列表组件
│   │   ├── 📁 emoji-picker/         # 表情选择器组件
│   │   ├── 📁 svgIcon/              # SVG 图标组件
│   │   └── 📁 user/                 # 用户信息组件
│   ├── 📁 config/                   # 配置文件
│   │   ├── 📄 index.js              # 基础配置
│   │   └── 📄 seo.js                # SEO 配置
│   ├── 📁 layout/                   # 布局组件
│   │   ├── 📁 header/               # 页面头部
│   │   ├── 📁 footer/               # 页面底部
│   │   ├── 📄 index.vue             # 主布局
│   │   └── 📄 index.scss            # 布局样式
│   ├── 📁 router/                   # 路由配置
│   │   └── 📄 index.js              # 路由定义
│   ├── 📁 stores/                   # Pinia 状态管理
│   │   ├── 📁 modules/              # 状态模块
│   │   │   ├── 📄 setting.js        # 设置状态
│   │   │   └── 📄 user.js           # 用户状态
│   │   └── 📄 index.js              # 状态管理入口
│   ├── 📁 utils/                    # 工具函数
│   │   ├── 📁 http/                 # HTTP 请求封装
│   │   │   └── 📄 index.js          # Axios 配置和拦截器
│   │   └── 📄 index.js              # 通用工具函数
│   ├── 📁 views/                    # 页面组件
│   │   ├── 📁 dashboard/            # 首页/文章列表
│   │   ├── 📁 article/              # 文章详情页
│   │   ├── 📁 archive/              # 文章归档页
│   │   ├── 📁 about/                # 关于页面
│   │   ├── 📁 board/                # 留言板
│   │   └── 📁 error/                # 错误页面
│   │       ├── 📁 maintenance/      # 维护页面
│   │       ├── 📁 not-found/        # 404 页面
│   │       └── 📁 server-error/     # 500 页面
│   ├── 📄 App.vue                   # 根组件
│   └── 📄 main.js                   # 应用入口
├── 📁 scripts/                      # 构建脚本
│   └── 📄 generate-sitemap.js       # 站点地图生成脚本
├── 📁 dist/                         # 构建产物目录
├── 📁 public/                       # 公共静态资源
├── 📄 .eslintrc.js                  # ESLint 配置
├── 📄 .prettierrc                   # Prettier 配置
├── 📄 vite.config.js                # Vite 配置
├── 📄 package.json                  # 项目依赖
├── 📄 pnpm-lock.yaml                # 依赖锁定文件
└── 📄 README.md                     # 项目说明
```

## 🚀 快速开始

### 环境要求

- **Node.js**: ^20.19.0 或 >=22.12.0
- **包管理器**: pnpm（推荐）、npm 或 yarn
- **IDE**: VSCode + Volar 插件（推荐）
- **浏览器**: 支持 ES6+ 的现代浏览器

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
# 支持热更新和自动重载
```

### 构建部署

```bash
# 构建生产版本（包含 sitemap 生成）
pnpm build

# 预览生产构建
pnpm preview

# 仅构建（不生成 sitemap）
pnpm build:basic

# 生成站点地图
pnpm sitemap
```

### 代码规范

```bash
# 代码格式化
pnpm format

# 代码检查和修复
pnpm lint

# 类型检查（如果配置了 TypeScript）
pnpm type-check
```

## 🔧 配置说明

### 基础配置

在 `src/config/index.js` 中配置基础参数：

```javascript
export default {
  // Pinia 持久化存储类型
  PINIASTORY: localStorage,  // 或 sessionStorage
  
  // API 代理地址
  BASEURL: '/api'
}
```

### SEO 配置

在 `src/config/seo.js` 中配置 SEO 信息：

```javascript
export const seoConfig = {
  siteName: '游荡de蝌蚪的博客',
  siteDescription: '分享技术、记录生活',
  author: '游荡de蝌蚪',
  siteUrl: 'https://www.yddekd.com',
  keywords: ['Vue', 'JavaScript', '前端开发', '技术博客'],
  // ... 更多配置
}
```

### 开发服务器配置

在 `vite.config.js` 中配置开发服务器：

```javascript
export default defineConfig({
  server: {
    port: 816,                    // 开发服务器端口
    host: '0.0.0.0',             // 允许外部访问
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',  // 后端 API 地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 构建配置

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 文件命名规则
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1500,  // 代码分割警告阈值
    sourcemap: false               // 生产环境不生成 sourcemap
  }
})
```

## 🌐 功能特性

### 📝 文章系统

- **文章列表**: 支持分页加载、分类筛选、标签过滤、搜索功能
- **文章详情**: Markdown 渲染、目录生成、代码高亮、阅读进度
- **文章归档**: 按时间归档文章，支持年份和月份分组
- **分类管理**: 文章分类展示、统计和筛选
- **标签系统**: 文章标签管理、标签云展示、相关文章推荐

### 💬 评论系统

- **评论展示**: 嵌套评论和回复功能，支持多级回复
- **表情支持**: 内置表情选择器，丰富的表情包
- **XSS 防护**: 安全的内容过滤和转义
- **点赞功能**: 评论点赞交互，用户点赞记录
- **分页支持**: 评论列表分页，性能优化

### 🎨 用户界面

- **响应式布局**: 桌面端/移动端自适应，支持多种断点
- **主题切换**: 明暗主题支持，主题持久化存储
- **页面过渡**: 流畅的路由切换动画，加载状态指示
- **加载状态**: 页面加载进度条，骨架屏加载
- **返回顶部**: 滚动监听和快速返回，用户体验优化

### 🔍 SEO 优化

- **元数据管理**: 动态 title、description、keywords 设置
- **Open Graph**: 社交媒体分享优化，图片和描述
- **结构化数据**: 搜索引擎友好的结构化标记
- **站点地图**: 自动生成 sitemap.xml 和 robots.txt
- **页面预加载**: 路由预加载，提升用户体验

### 🚧 维护模式

- **全局状态管理**: 维护状态全局管理，支持动态切换
- **API 拦截**: 自动阻止维护期间的 API 调用
- **路由保护**: 维护期间的路由重定向和访问控制
- **用户提示**: 友好的维护提示和状态说明

### 🚨 错误处理

- **404 页面**: 页面未找到的友好提示和导航
- **500 页面**: 服务器错误的详细信息和操作指引
- **全局拦截**: HTTP 错误全局拦截和处理
- **错误日志**: 错误信息记录和用户反馈

## 🛠️ 开发指南

### 组件开发规范

项目采用组件化开发模式，新组件应遵循以下规范：

1. **文件命名**: 使用 kebab-case 命名，如 `comment-list.vue`
2. **组件结构**: template + script setup + style scoped
3. **Props 定义**: 使用 defineProps 定义属性类型和默认值
4. **事件定义**: 使用 defineEmits 定义组件事件
5. **方法暴露**: 使用 defineExpose 暴露必要的方法给父组件
6. **样式隔离**: 使用 scoped 样式或 CSS Modules 避免样式冲突

```vue
<template>
  <div class="component-name">
    <!-- 组件模板 -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props 定义
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})

// 事件定义
const emit = defineEmits(['update', 'delete'])

// 响应式数据
const loading = ref(false)

// 计算属性
const displayTitle = computed(() => `${props.title} (${props.count})`)

// 方法
const handleClick = () => {
  emit('update', props.count + 1)
}

// 暴露方法给父组件
defineExpose({
  reset: () => {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.component-name {
  // 组件样式
}
</style>
```

### API 接口管理

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

// 创建文章
export const createArticle = (data) => {
  return http.post('/article/create', data)
}

// 更新文章
export const updateArticle = (id, data) => {
  return http.put(`/article/${id}`, data)
}

// 删除文章
export const deleteArticle = (id) => {
  return http.delete(`/article/${id}`)
}
```

### 状态管理

使用 Pinia 进行状态管理，支持持久化存储：

```javascript
// 示例：src/stores/modules/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref({})
  const token = ref('')
  const isLoggedIn = ref(false)

  // 计算属性
  const userName = computed(() => userInfo.value.name || '游客')
  const userAvatar = computed(() => userInfo.value.avatar || '/default-avatar.png')

  // 方法
  const setUser = (data) => {
    userInfo.value = data
    isLoggedIn.value = true
  }

  const setToken = (newToken) => {
    token.value = newToken
  }

  const logout = () => {
    userInfo.value = {}
    token.value = ''
    isLoggedIn.value = false
  }

  const updateUserInfo = (updates) => {
    Object.assign(userInfo.value, updates)
  }

  return {
    // 状态
    userInfo,
    token,
    isLoggedIn,
    
    // 计算属性
    userName,
    userAvatar,
    
    // 方法
    setUser,
    setToken,
    logout,
    updateUserInfo
  }
}, {
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['userInfo', 'token', 'isLoggedIn']
  }
})
```

### 路由配置

路由配置支持嵌套路由、路由守卫和元数据：

```javascript
// 示例：src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          description: '博客首页',
          requiresAuth: false
        }
      },
      {
        path: 'article/:id',
        name: 'Article',
        component: Article,
        meta: {
          title: '文章详情',
          description: '阅读文章',
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false
    }
  }
]

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 博客系统`
  }
  
  // 权限检查
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})
```

### 样式管理

使用 SCSS 进行样式管理，支持变量、混入和函数：

```scss
// 示例：src/assets/styles/base.scss

// 变量定义
:root {
  --primary-color: #409eff;
  --success-color: #67c23a;
  --warning-color: #e6a23c;
  --danger-color: #f56c6c;
  --info-color: #909399;
  
  --text-color-primary: #303133;
  --text-color-regular: #606266;
  --text-color-secondary: #909399;
  
  --border-color: #dcdfe6;
  --border-color-light: #e4e7ed;
  
  --bg-color: #ffffff;
  --bg-color-page: #f2f3f5;
}

// 暗色主题
.dark {
  --primary-color: #409eff;
  --text-color-primary: #e5eaf3;
  --text-color-regular: #cfd3dc;
  --bg-color: #141414;
  --bg-color-page: #0a0a0a;
}

// 混入
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin responsive($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: 768px) { @content; }
  } @else if $breakpoint == tablet {
    @media (min-width: 769px) and (max-width: 1024px) { @content; }
  } @else if $breakpoint == desktop {
    @media (min-width: 1025px) { @content; }
  }
}

// 通用样式
.card {
  background: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  
  @include responsive(mobile) {
    padding: 16px;
  }
}

.btn {
  @include flex-center;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
```

## 📱 部署指南

### 静态部署

项目支持静态部署到各种平台：

```bash
# 构建静态文件
pnpm build

# 构建产物在 dist 目录
# 可以直接部署到以下平台：
# - Nginx
# - Apache
# - Vercel
# - Netlify
# - GitHub Pages
# - 阿里云 OSS
# - 腾讯云 COS
```

### 环境变量配置

在项目根目录创建环境变量文件：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_SITE_URL=http://localhost:816
VITE_APP_TITLE=博客系统 - 开发环境

# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_SITE_URL=https://www.yourdomain.com
VITE_APP_TITLE=博客系统
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

### 贡献流程

1. **Fork 本项目**
2. **创建特性分支**: `git checkout -b feature/AmazingFeature`
3. **提交更改**: `git commit -m 'Add some AmazingFeature'`
4. **推送到分支**: `git push origin feature/AmazingFeature`
5. **打开 Pull Request**

### 代码规范

- 遵循 ESLint 和 Prettier 规则
- 提交前运行 `pnpm lint` 检查代码
- 使用语义化的 commit 信息
- 添加必要的注释和文档

### Commit 信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

### 问题反馈

如果你发现了 bug 或有功能建议，请：

1. 查看 [Issues](https://github.com/your-repo/issues) 是否已有相关问题
2. 创建新的 Issue，详细描述问题或建议
3. 提供复现步骤和环境信息

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源协议。

MIT License 是一个宽松的许可证，允许你：

- 自由使用、修改和分发代码
- 用于商业项目
- 修改源代码
- 分发修改后的代码

唯一的条件是保留原始的许可证和版权声明。

## 📞 联系方式

- **作者**: 游荡de蝌蚪
- **网站**: [www.yddekd.com](https://www.yddekd.com)
- **GitHub**: [ltadpoles](https://github.com/ltadpoles)

⭐ **如果这个项目对你有帮助，请给它一个 star！**

⭐ **欢迎提交 Issue 和 Pull Request！**
