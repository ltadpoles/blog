import Layout from '../layout/index.vue'
import Dashboard from '../views/dashboard/index.vue'

export const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'archive',
        name: 'Archive',
        component: () => import('@/views/archive/index.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/index.vue')
      },
      {
        path: 'article/:id',
        name: 'Article',
        component: () => import('@/views/article/index.vue')
      },
      {
        path: 'category/:id',
        name: 'Category',
        component: () => import('@/views/article/category/index.vue')
      },
      {
        path: 'tag/:id',
        name: 'tag',
        component: () => import('@/views/article/tag/index.vue')
      }
    ]
  }
]
