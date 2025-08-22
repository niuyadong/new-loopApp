<template>
  <div class="about">
    <h1>{{ t('message.about') }}</h1>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// 页面逻辑
</script>

<style lang="scss" scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    color: var(--text-color);
    font-size: 2rem;
    margin-bottom: 20px;
    border-bottom: 2px solid #42b983;
    padding-bottom: 10px;
  }
}
</style>