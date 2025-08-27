<template>
  <div class="app-layout theme-transition">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      :title="currentTitle"
      :left-show="false"
      class="app-header"
      :safe-area-inset-top="true"
    >
      <template #right>
        <LanguageSwitch />
        <van-button
          type="text"
          size="small"
          :icon="isDark ? 'sun-o' : 'moon-o'"
          class="theme-toggle"
          @click="toggleTheme"
          :color="isDark ? '#f5f5f5' : '#333'"
          :loading="themeToggling"
        />
      </template>
    </van-nav-bar>

    <!-- 主内容区域 -->
    <main class="app-main">
      <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <router-view v-else />
    </main>

    <!-- 底部标签栏 -->
    <van-tabbar
      v-model="activeTab"
      class="app-footer"
      :active-color="activeColor"
      :inactive-color="isDark ? '#f5f5f5' : '#333'"
      :safe-area-inset-bottom="true"
    >
      <van-tabbar-item name="home" :icon="homeIcon">
        {{ t('message.home') }}
      </van-tabbar-item>
      <van-tabbar-item name="about" icon="info-o">
        {{ t('message.about') }}
      </van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o">
        {{ t('message.login') }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '../store/modules/theme';
import LanguageSwitch from './LanguageSwitch.vue';
import { showToast } from 'vant';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const themeStore = useThemeStore();

// 当前激活的标签页
const activeTab = ref('home');
// 主题切换状态（防止重复点击）
const themeToggling = ref(false);

// 主题状态
const isDark = computed(() => themeStore.isDark);

// 激活颜色（根据主题切换）
const activeColor = computed(() => 'var(--primary-color)');

// 当前页面标题
const currentTitle = computed(() => {
  const titles = {
    home: t('message.welcome'),
    about: t('message.about'),
    user: t('message.login')
  };
  return titles[activeTab.value] || 'App';
});

// 首页图标（根据主题切换）
const homeIcon = computed(() => {
  return isDark.value ? 'home' : 'home-o';
});

// 监听标签页变化，切换路由
watch(activeTab, (newVal) => {
  const routes = {
    home: '/',
    about: '/about',
    user: '/login'
  };
  router.push(routes[newVal]);
});

// 监听路由变化，更新标签页状态
watch(() => route.path, (newPath) => {
  const paths = {
    '/': 'home',
    '/about': 'about',
    '/login': 'user'
  };
  activeTab.value = paths[newPath] || 'home';
});

// 切换主题
const toggleTheme = async () => {
  // 防止重复点击
  if (themeToggling.value) return;
  
  themeToggling.value = true;
  
  try {
    // 添加主题切换的平滑过渡
    document.body.style.opacity = '0.8';
    
    themeStore.toggleTheme();
    
    // 显示主题切换成功的提示
    showToast({
      message: isDark.value ? t('message.switchToDark') : t('message.switchToLight'),
      icon: isDark.value ? 'moon-o' : 'sun-o',
      duration: 1000
    });
    
    // 等待短暂时间以显示过渡效果
    await new Promise(resolve => setTimeout(resolve, 100));
  } catch (error) {
    console.error('主题切换失败:', error);
  } finally {
    document.body.style.opacity = '1';
    themeToggling.value = false;
  }
};

// 监听全局主题变化事件（可选）
onMounted(() => {
  const handleThemeChange = () => {
    // 组件可以在这里响应主题变化
  };
  
  window.addEventListener('themeChanged', handleThemeChange);
  
  // 清理监听器
  onUnmounted(() => {
    window.removeEventListener('themeChanged', handleThemeChange);
  });
});

// 清理主题相关资源
onUnmounted(() => {
  // 如果在其他组件中需要，可以调用清理方法
  // themeStore.cleanupTheme();
});
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-color);
  transition: var(--transition-all);
}

.app-header {
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  z-index: 100;
  transition: var(--transition-all);
}

.app-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  transition: var(--transition-all);
}

.app-footer {
  background-color: var(--card-bg);
  border-top: 1px solid var(--border-color);
  transition: var(--transition-all);
}

.theme-toggle {
  margin-left: 10px;
  transition: var(--transition-all);
}

// Vant组件样式覆盖
.van-nav-bar {
  background-color: var(--card-bg);
  transition: var(--transition-all);
}

.van-nav-bar__title {
  color: var(--text-color);
  transition: var(--transition-all);
}

.van-tabbar {
  background-color: var(--card-bg);
  transition: var(--transition-all);
}

// 为所有Vant组件添加过渡效果
.van-button,
.van-tabbar-item,
.van-dropdown-menu {
  transition: var(--transition-all);
}
</style>