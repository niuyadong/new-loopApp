import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取token
  const token = localStorage.getItem('token');
  
  // 如果不是登录页面且没有token，则跳转到登录页面
  if (to.path !== '/login' && !token) {
    next('/login');
  } else {
    next();
  }
})

export default router