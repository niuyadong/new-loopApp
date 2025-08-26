import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zhCN from './locales/zh-CN'

// 从本地存储获取语言偏好，如果没有则默认使用中文
const savedLang = localStorage.getItem('language')
// 修改初始语言逻辑，默认使用中文
const initialLang = savedLang || 'zh-CN'

const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: initialLang,
  fallbackLocale: 'zh-CN', // 将回退语言也改为中文
  messages: {
    en,
    'zh-CN': zhCN
  }
})

export default i18n