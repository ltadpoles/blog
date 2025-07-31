import Layout from '../layout/index.vue'
import Dashboard from '../views/dashboard/index.vue'

export const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  }
]
