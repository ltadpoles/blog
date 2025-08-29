import Layout from '../layout/index.vue'
import Dashboard from '../views/dashboard/index.vue'
import { seoConfig } from '../config/seo'

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
          title: seoConfig.pages.home.title,
          description: seoConfig.pages.home.description
        }
      },
      {
        path: 'archive',
        name: 'Archive',
        component: () => import('@/views/archive/index.vue'),
        meta: {
          title: seoConfig.pages.archive.title,
          description: seoConfig.pages.archive.description
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: seoConfig.pages.about.title,
          description: seoConfig.pages.about.description
        }
      },
      {
        path: 'article/:id',
        name: 'Article',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '文章详情',
          description: '阅读文章的详细信息'
        }
      },
      {
        path: 'category/:id?',
        name: 'Category',
        component: () => import('@/views/article/category/index.vue'),
        meta: {
          title: seoConfig.pages.category.title,
          description: seoConfig.pages.category.description
        }
      },
      {
        path: 'tag/:id?',
        name: 'tag',
        component: () => import('@/views/article/tag/index.vue'),
        meta: {
          title: seoConfig.pages.tag.title,
          description: seoConfig.pages.tag.description
        }
      },
      {
        path: 'board',
        name: 'Board',
        component: () => import('@/views/board/index.vue'),
        meta: {
          title: seoConfig.pages.board.title,
          description: seoConfig.pages.board.description
        }
      }
    ]
  }
]
