<script setup>
import { RouterView } from 'vue-router'
import { useThemeStore } from './store/modules/theme'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitch from './components/LanguageSwitch.vue'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const { t } = useI18n()

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <div id="app">
    <LanguageSwitch />
    <button @click="toggleTheme" class="theme-toggle-btn">
      {{ isDark ? t('message.switchToLight') : t('message.switchToDark') }}
    </button>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
$primary-color: #42b983;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  background-color: var(--bg-color);
  margin-top: 60px;
  min-height: 100vh;
  transition: color 0.3s, background-color 0.3s;
}

.theme-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
</style>
