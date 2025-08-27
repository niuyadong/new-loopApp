import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // 默认使用系统主题
    isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    // 存储媒体查询对象，用于清理监听器
    mediaQuery: null,
    // 存储主题变化监听器函数引用
    themeChangeListener: null
  }),
  getters: {
    // 获取当前主题名称
    themeName: (state) => state.isDark ? 'dark' : 'light',
    // 获取主题变量（方便在组件中直接使用）
    themeVariables: (state) => ({
      textColor: state.isDark ? '#f5f5f5' : '#333',
      bgColor: state.isDark ? '#1a1a1a' : '#ffffff',
      borderColor: state.isDark ? '#333' : '#ddd',
      cardBg: state.isDark ? '#242424' : '#f5f5f5',
      primaryColor: '#42b983'
    })
  },
  actions: {
    // 切换主题
    toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
    },
    // 应用主题
    applyTheme() {
      // 应用到html和body元素
      const htmlElement = document.documentElement;
      const bodyElement = document.body;

      htmlElement.classList.remove('theme-light', 'theme-dark');
      bodyElement.classList.remove('theme-light', 'theme-dark');

      const themeClass = this.isDark ? 'theme-dark' : 'theme-light';
      htmlElement.classList.add(themeClass);
      bodyElement.classList.add(themeClass);

      // 存储主题偏好
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
      
      // 触发全局主题变化事件（方便组件响应）
      window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { isDark: this.isDark } 
      }));
    },
    // 初始化主题
    initTheme() {
      // 获取用户保存的主题偏好
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDark = savedTheme === 'dark';
      }
      
      // 设置系统主题变化监听
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // 保存监听器引用以便后续清理
      this.themeChangeListener = (e) => {
        // 只有当用户没有明确设置主题偏好时才响应系统变化
        if (!savedTheme) {
          this.isDark = e.matches;
          this.applyTheme();
        }
      };
      
      this.mediaQuery.addEventListener('change', this.themeChangeListener);
      this.applyTheme();
    },
    // 清理监听器
    cleanupTheme() {
      if (this.mediaQuery && this.themeChangeListener) {
        this.mediaQuery.removeEventListener('change', this.themeChangeListener);
        this.mediaQuery = null;
        this.themeChangeListener = null;
      }
    },
    // 直接设置主题
    setTheme(isDark) {
      this.isDark = isDark;
      this.applyTheme();
    },
    // 根据系统主题更新（即使已保存偏好也更新）
    updateFromSystem() {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDark = systemDark;
      // 删除保存的偏好，让系统决定
      localStorage.removeItem('theme');
      this.applyTheme();
    }
  }
})