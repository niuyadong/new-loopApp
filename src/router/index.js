import { createRouter, createWebHistory } from 'vue-router'
import { useI18n } from 'vue-i18n'

// 异步导入组件
const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const LoginView = () => import('../views/LoginView.vue')

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/login', name: 'login', component: LoginView }
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