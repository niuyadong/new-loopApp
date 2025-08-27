<template>
  <div class="about">
    <van-card class="about-card" :bordered="false">
      <template #title>
        <h1 class="about-title">{{ t('message.about') }}</h1>
      </template>
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
        <van-cell :title="t('message.projectName')" :value="appInfo.name" />
        <van-cell :title="t('message.version')" :value="appInfo.version" />
        <van-cell :title="t('message.techStack')" :value="appInfo.techStack" />
        <van-cell :title="t('message.description')" :value="appInfo.description" show-arrow />
      </van-list>
      
      <div class="about-features">
        <van-divider :content="t('message.features')" content-position="left" />
        <van-grid :column-num="2" class="features-grid">
          <van-grid-item icon="i18n" :text="t('message.internationalization')" />
          <van-grid-item icon="moon" :text="t('message.themeSwitching')" />
          <van-grid-item icon="user" :text="t('message.userAuthentication')" />
          <van-grid-item icon="layout" :text="t('message.responsiveDesign')" />
        </van-grid>
      </div>
    </van-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const loading = ref(false);
const finished = ref(true);
const appInfo = ref({
  name: 'Vue 3 + Vite + Vant',
  version: '1.0.0',
  techStack: 'Vue 3, Vite, Vant, Pinia, Vue Router',
  description: '一个现代化的Vue 3项目模板'
});

onMounted(() => {
  // 模拟数据加载
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 500);
});
</script>

<style lang="scss" scoped>
.about {
  padding: 20px;
}

.about-card {
  margin-bottom: 20px;
}

.about-title {
  color: var(--text-color);
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0;
}

.about-features {
  margin-top: 30px;
}

.features-grid {
  margin-top: 15px;
}

// 适配主题
.van-cell {
  color: var(--text-color);
  background-color: var(--card-bg);
}

.van-divider__text {
  color: var(--text-color);
}

.van-grid-item__text {
  color: var(--text-color);
}
</style>