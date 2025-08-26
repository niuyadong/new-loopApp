import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // 默认使用系统主题
    isDark: window.matchMedia('(prefers-color-scheme: dark)').matches
  }),
  actions: {
    // 切换主题
    toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
    },
    // 应用主题
    applyTheme() {
      // 修改后：添加到html和body
      const htmlElement = document.documentElement;
      const bodyElement = document.body;

      htmlElement.classList.remove('theme-light', 'theme-dark');
      bodyElement.classList.remove('theme-light', 'theme-dark');

      const themeClass = this.isDark ? 'theme-dark' : 'theme-light';
      htmlElement.classList.add(themeClass);
      bodyElement.classList.add(themeClass);

      // 存储主题偏好
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    },
    // 初始化主题
    initTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDark = savedTheme === 'dark';
      }
      this.applyTheme();
    }
  }
})