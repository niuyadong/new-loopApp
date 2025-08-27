<template>
  <div class="home">
    <van-card class="welcome-card" :bordered="false">
      <h1 class="welcome-title">{{ t('message.welcome') }}</h1>
      <div class="action-buttons">
        <van-button type="primary" @click="showCustomToast" size="large">
          {{ t('message.hello') }}
        </van-button>
      </div>
    </van-card>
    
    <!-- 功能卡片示例 -->
    <div class="feature-cards">
      <van-card
        class="feature-card"
        :title="t('message.i18nExample')"
        :bordered="false"
        shadow="sm"
      >
        <p class="card-content">{{ t('message.welcome') }}</p>
        <LanguageSwitch />
      </van-card>
      
      <van-card
        class="feature-card"
        :title="t('message.themeSwitch')"
        :bordered="false"
        shadow="sm"
      >
        <p class="card-content">{{ t('message.currentTheme') }} {{ isDark ? t('message.darkTheme') : t('message.lightTheme') }}</p>
        <van-switch
          v-model="isDark"
          active-color="var(--primary-color)"
          @change="toggleTheme"
        />
      </van-card>
    </div>
    
    <van-toast v-model:show="showToastVisible" :message="t('message.welcome')" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '../store/modules/theme';
import LanguageSwitch from '../components/LanguageSwitch.vue';

const showToastVisible = ref(false);
const { t } = useI18n();
const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

// 重命名本地函数，避免与导入的Vant函数冲突
const showCustomToast = () => {
  showToastVisible.value = true;
  setTimeout(() => {
    showToastVisible.value = false;
  }, 2000);
};

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
}

.welcome-card {
  margin-bottom: 30px;
  text-align: center;
}

.welcome-title {
  color: var(--text-color);
  font-size: 1.8rem;
  margin-bottom: 30px;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.feature-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-card {
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
}

.card-content {
  color: var(--text-color);
  margin-bottom: 15px;
}

// 适配主题
.van-card__title {
  color: var(--text-color);
}
</style>