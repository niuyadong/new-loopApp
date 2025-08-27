import 'amfe-flexible'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore, useThemeStore } from './store'
import i18n from './i18n'

// 简化导入：只导入 style.scss，让它内部导入其他必要的文件
import '@/assets/styles/style.scss'

// 确保在应用挂载前先初始化主题，确保页面加载时就应用正确的主题
const app = createApp(App)
setupStore(app)
app.use(router)
app.use(i18n)

const themeStore = useThemeStore();

// 检测系统主题设置并应用
const initializeApp = async () => {
  themeStore.initTheme();
  await router.isReady();
  app.mount('#app');
};

initializeApp();
