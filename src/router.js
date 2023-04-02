import { createRouter, createWebHashHistory } from 'vue-router'
import ViewProfile from './components/ViewProfile.vue'

const routes = [
  {
	path: '/',
	component: { template: '<div><h1>HexaEight-Session Demo</h1></div>'  }
  },
  {
    path: '/dashboard',
    component: { template: '<div><h1>Welcome to the Dashboard</h1></div>' },
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    component: ViewProfile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router