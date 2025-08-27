import { createRouter, createWebHistory } from 'vue-router'

// 异步导入组件
const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const LoginView = () => import('../views/LoginView.vue')

const routes = [
  {
    path: '/', 
    name: 'home', 
    component: HomeView,
    meta: {
      keepAlive: true,
      requiresAuth: true
    }
  },
  {
    path: '/about', 
    name: 'about', 
    component: AboutView,
    meta: {
      keepAlive: true,
      requiresAuth: true
    }
  },
  {
    path: '/login', 
    name: 'login', 
    component: LoginView,
    meta: {
      keepAlive: false,
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取token
  const token = localStorage.getItem('token')
  
  // 如果路由需要认证且没有token，则跳转到登录页面
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router