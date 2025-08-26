<script setup>
import { RouterView } from 'vue-router'
import { useThemeStore } from './store/modules/theme'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const { t } = useI18n()

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <div id="app">
    <button @click="toggleTheme" class="theme-toggle-btn">
      {{ isDark ? t('message.switchToLight') : t('message.switchToDark') }}
    </button>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  background-color: var(--bg-color);
  // min-height: 100vh;
  margin: 0 auto;
  transition: color 0.3s, background-color 0.3s;
}

.theme-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: color.adjust(var(--primary-color), $lightness: -10%);
  }
}
</style>
