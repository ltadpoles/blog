/**
 * 路由配置
 * 定义博客系统的所有路由和 SEO 信息
 */

import Layout from '../layout/index.vue'
import Dashboard from '../views/dashboard/index.vue'
import { seoConfig } from '../config/seo'

/**
 * 路由配置数组
 * 包含所有页面路由、组件引用和 SEO 元数据
 */
export const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      // 首页 - 文章列表
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: seoConfig.pages.home.title,
          description: seoConfig.pages.home.description
        }
      },

      // 归档页面
      {
        path: 'archive',
        name: 'Archive',
        component: () => import('@/views/archive/index.vue'),
        meta: {
          title: seoConfig.pages.archive.title,
          description: seoConfig.pages.archive.description
        }
      },

      // 关于页面
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: seoConfig.pages.about.title,
          description: seoConfig.pages.about.description
        }
      },

      // 文章详情页
      {
        path: 'article/:id',
        name: 'Article',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '文章详情',
          description: '阅读文章的详细信息'
        }
      },

      // 分类页面
      {
        path: 'category/:id?',
        name: 'Category',
        component: () => import('@/views/article/category/index.vue'),
        meta: {
          title: seoConfig.pages.category.title,
          description: seoConfig.pages.category.description
        }
      },

      // 标签页面
      {
        path: 'tag/:id?',
        name: 'tag',
        component: () => import('@/views/article/tag/index.vue'),
        meta: {
          title: seoConfig.pages.tag.title,
          description: seoConfig.pages.tag.description
        }
      },

      // 留言板页面
      {
        path: 'board',
        name: 'Board',
        component: () => import('@/views/board/index.vue'),
        meta: {
          title: seoConfig.pages.board.title,
          description: seoConfig.pages.board.description
        }
      },

      // 维护页面
      {
        path: 'maintenance',
        name: 'Maintenance',
        component: () => import('@/views/error/Maintenance.vue'),
        meta: {
          title: '维护中 - 游荡de蝌蚪',
          description: '网站维护中，请稍后再访问'
        }
      }
    ]
  }
]
