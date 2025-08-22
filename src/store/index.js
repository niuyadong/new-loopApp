import { createPinia } from 'pinia';
// 导出创建 Pinia 实例的函数
export function setupStore(app) {
  const pinia = createPinia();
  app.use(pinia);
}

// 导出主题 Store
export * from './modules/theme';
// 导出用户 Store
export * from './modules/user';