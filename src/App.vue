<script setup>
import { RouterView } from 'vue-router';
import { ref, onMounted } from 'vue';
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
  // 初始化主题
  themeStore.initTheme();
});
</script>

<template>
  <div id="app">
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
  transition: background-color 0.3s ease;
}
</style>
