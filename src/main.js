import 'amfe-flexible'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore, useThemeStore } from './store'
import i18n from './i18n'
import './assets/styles/style.scss'
import './assets/styles/theme.scss'

const app = createApp(App)
setupStore(app)
app.use(router)
app.use(i18n)

// 初始化主题
const themeStore = useThemeStore();
themeStore.initTheme();

app.mount('#app')
