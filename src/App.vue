<script setup>
import { RouterView } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import Layout from './components/Layout.vue';
import { useThemeStore } from './store/modules/theme';

// 认证相关逻辑
const isAuthenticated = ref(false);
const themeStore = useThemeStore();

// 检查用户是否已登录
const checkAuthentication = () => {
  const token = localStorage.getItem('token');
  isAuthenticated.value = !!token;
};

onMounted(() => {
  checkAuthentication();
  // 主题已经在main.js中初始化，这里不需要再次初始化
  
  // 监听认证状态变化，动态调整主题显示
  const handleAuthChange = () => {
    checkAuthentication();
  };
  
  // 可以添加认证状态变化的监听
  window.addEventListener('authChanged', handleAuthChange);
});

// 清理监听器 - 移到外部
onUnmounted(() => {
  window.removeEventListener('authChanged', handleAuthChange);
});
</script>

<template>
  <div id="app" class="theme-transition">
    <!-- 非登录页面使用Layout组件 -->
    <Layout v-if="isAuthenticated" />
    
    <!-- 登录页面直接使用RouterView -->
    <RouterView v-else />
  </div>
</template>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  background-color: var(--bg-color);
  transition: var(--transition-all);
}
</style>
