<template>
  <div class="language-switch">
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="currentLang"
        :options="languages"
        @change="switchLanguage"
        class="lang-dropdown"
      />
    </van-dropdown-menu>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';

const { locale } = useI18n();
const currentLang = ref('zh-CN');

// 语言选项
const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh-CN', label: '中文(简体)' }
];

// 切换语言
const switchLanguage = (lang) => {
  currentLang.value = lang;
  locale.value = lang;
  localStorage.setItem('language', lang);
};

onMounted(() => {
  // 从本地存储或i18n实例获取当前语言
  const savedLang = localStorage.getItem('language') || locale.value;
  currentLang.value = savedLang;
});
</script>

<style lang="scss" scoped>
.language-switch {
  margin-right: 10px;
}

.lang-dropdown {
  // 覆盖默认宽度
  --van-dropdown-menu-item-active-bg-color: rgba(66, 185, 131, 0.1);
  --van-dropdown-menu-title-color: var(--text-color);
}
</style>