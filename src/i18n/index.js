import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zhCN from './locales/zh-CN'

// 从本地存储获取语言偏好，如果没有则使用浏览器语言
const savedLang = localStorage.getItem('language')
const browserLang = navigator.language.toLowerCase()

// 确定初始语言
const initialLang = savedLang || (browserLang.includes('zh') ? 'zh-CN' : 'en')

const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: initialLang,
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-CN': zhCN
  }
})

export default i18n