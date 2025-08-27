<template>
  <div class="app-layout">
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
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '../store/modules/theme';
import LanguageSwitch from './LanguageSwitch.vue';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const themeStore = useThemeStore();

// 当前激活的标签页
const activeTab = ref('home');

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
const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-color);
}

.app-header {
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  z-index: 100;
}

.app-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.app-footer {
  background-color: var(--card-bg);
  border-top: 1px solid var(--border-color);
}

.theme-toggle {
  margin-left: 10px;
}

// Vant组件样式覆盖
.van-nav-bar {
  background-color: var(--card-bg);
}

.van-nav-bar__title {
  color: var(--text-color);
}

.van-tabbar {
  background-color: var(--card-bg);
}
</style>