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
│   │   ├── 📄 seo.js                # SEO 配置
│   │   └── 📄 sitemap.js            # 站点地图配置
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
├── 📁 env/                          # 环境变量配置
│   ├── 📄 .env                      # 基础环境变量
│   ├── 📄 .env.development          # 开发环境变量
│   └── 📄 .env.production           # 生产环境变量
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
pnpm build:prod

# 构建开发版本（包含 sitemap 生成）
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

```

## 🔧 配置说明

### 基础配置

项目使用环境变量来配置不同环境下的参数，配置文件位于 `env/` 目录下：

- `.env.development`: 开发环境配置
- `.env.production`: 生产环境配置

### 环境变量说明

```bash
# API基础URL
VITE_API_BASE_URL=http://127.0.0.1:3000
```

### Vite 配置

Vite 配置文件位于 `vite.config.js`，包含以下主要配置：

1. **别名配置**：`@` 指向 `src` 目录
2. **代理配置**：将 `/api` 请求代理到后端服务器
3. **插件配置**：
   - Vue 3 支持
   - Element Plus 自动导入
   - SVG 图标系统
   - 站点地图生成

### SEO 配置

SEO 配置文件位于 `src/config/seo.js`，包含：

1. 网站基础信息配置
2. 页面特定 SEO 配置
3. SEO 数据生成函数

### 站点地图配置

站点地图配置文件位于 `src/config/sitemap.js`，包含：

1. 静态路由配置
2. 动态路由生成函数
3. robots.txt 配置

## 🌐 功能特性

### 📝 文章管理

- 文章列表展示（支持分页加载）
- 文章详情页（Markdown 渲染）
- 文章分类浏览
- 文章标签筛选
- 文章归档功能
- 文章搜索功能

### 💬 评论系统

- 文章评论功能
- 留言板功能
- 评论回复功能
- 表情支持
- 点赞功能
- 用户信息持久化

### 🎨 主题系统

- 明暗主题切换
- 主题持久化存储
- 响应式设计

### 🔍 SEO 优化

- 页面级 SEO 配置
- 动态 SEO 元数据管理
- 站点地图自动生成
- robots.txt 生成

### 🛠️ 其他功能

- 网站运行时间统计
- 访问量统计
- 维护模式支持
- 错误页面处理（404、500）
- 响应式布局

## 🛠️ 开发指南

### 组件开发

项目采用组件化开发模式，所有组件位于 `src/components/` 目录下。

#### 组件规范

1. 使用 `<script setup>` 语法糖
2. 组件命名采用 PascalCase
3. 组件文件命名采用 kebab-case
4. 使用 defineProps 和 defineEmits 定义组件接口
5. 使用 defineExpose 暴露组件方法

#### 组件示例

```vue
<template>
  <div class="example-component">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 定义组件属性
const props = defineProps({
  title: { type: String, default: '' },
  content: { type: String, default: '' }
})

// 定义事件
const emit = defineEmits(['click'])

// 组件方法
const handleClick = () => {
  emit('click')
}

// 暴露方法给父组件
defineExpose({
  handleClick
})
</script>
```

### 状态管理

项目使用 Pinia 进行状态管理，配置文件位于 `src/stores/` 目录下。

#### 状态模块

1. `setting.js`: 系统设置状态（主题等）
2. `user.js`: 用户状态（用户信息等）
3. `website.js`: 网站状态（网站信息、统计数据等）

#### 状态使用示例

```javascript
import { useSettingStore } from '@/stores/modules/setting'

// 获取状态
const settingStore = useSettingStore()

// 读取状态
console.log(settingStore.theme)

// 修改状态
settingStore.setTheme('dark')
```

### 路由配置

路由配置文件位于 `src/router/index.js`，采用 Vue Router 4。

#### 路由结构

- 主布局路由（包含头部、底部）
- 页面路由（首页、归档、关于、留言板等）
- 错误路由（404、500、维护页面）

### API 接口

API 接口封装位于 `src/api/` 目录下，使用 Axios 进行 HTTP 请求。

#### 接口调用示例

```javascript
import { articlepage } from '@/api/article'

// 调用接口
const { data } = await articlepage({
  pageNum: 1,
  pageSize: 10
})
```

### 工具函数

工具函数位于 `src/utils/` 目录下，包含：

1. HTTP 请求封装
2. 防抖函数
3. XSS 防护工具
4. 静态资源获取函数

## 📱 部署指南

### 构建项目

```bash
# 构建生产版本
pnpm build:prod

# 构建开发版本
pnpm build
```

构建完成后，产物位于 `dist/` 目录下。

### 部署方式

#### 静态部署

将 `dist/` 目录下的所有文件部署到静态服务器即可。

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://backend-server:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 环境变量配置

在生产环境中，需要配置以下环境变量：

```bash
VITE_API_BASE_URL=https://api.your-domain.com
```

## 🤝 贡献指南

欢迎任何形式的贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查：

```bash
# 代码格式化
pnpm format

# 代码检查
pnpm lint
```

### 提交规范

请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 bug
- `chore`: 构建过程或辅助工具的变动
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关

## 📄 开源协议

本项目采用 MIT 协议，详情请查看 [LICENSE](LICENSE) 文件。

---