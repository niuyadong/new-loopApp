<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'

const { locale } = useI18n()
const currentLang = ref(locale.value)

// 切换语言
const switchLanguage = (lang) => {
  currentLang.value = lang
  locale.value = lang
  localStorage.setItem('language', lang)
}

// 语言列表
const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: '中文(简体)' }
]
</script>

<template>
  <div class="language-switch">
    <select v-model="currentLang" @change="switchLanguage(currentLang)">
      <option v-for="lang in languages" :key="lang.code" :value="lang.code">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.language-switch {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;

  select {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-color);
    color: var(--text-color);
    cursor: pointer;
  }
}
</style>