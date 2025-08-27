<template>
  <div class="login-container">
    <!-- 语言切换组件 -->
    <div class="language-switcher">
      <LanguageSwitch />
    </div>
    
    <!-- 应用图标 -->
    <div class="app-logo">
      <img src="/vite.svg" alt="应用图标" class="logo-image" />
      <h1 class="app-name">{{ t('message.projectName') }}</h1>
    </div>
    
    <!-- 登录卡片 - 使用自定义 div 替代 van-card -->
    <div class="login-card">
      <!-- 登录标题 -->
      <h2 class="login-title">{{ t('message.login') }}</h2>
      
      <!-- 登录表单 -->
      <van-form @submit="handleLogin" ref="loginFormRef">
        <!-- 用户名输入框 -->
        <van-field
          v-model="username"
          name="username"
          :label="t('message.username')"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: t('message.username') + t('message.required') }]"
          class="form-field"
          :validate-event="false"
        />
        
        <!-- 密码输入框 -->
        <van-field
          v-model="password"
          type="password"
          name="password"
          :label="t('message.password')"
          placeholder="请输入密码"
          :rules="[{ required: true, message: t('message.password') + t('message.required') }]"
          show-password
          class="form-field"
          :validate-event="false"
        />
        
        <!-- 记住密码选项 -->
        <div class="remember-container">
          <van-checkbox v-model="rememberPassword" class="remember-checkbox">
            {{ t('message.rememberPassword') }}
          </van-checkbox>
          
          <!-- 忘记密码链接 -->
          <a type="text" @click="handleForgotPassword" class="forgot-password-btn">
            {{ t('message.forgotPassword') }}
          </a>
        </div>
        
        <!-- 登录按钮 -->
        <div class="form-actions">
          <van-button
            type="primary"
            size="large"
            block
            native-type="submit"
            :loading="loading"
            :disabled="loading"
            class="login-button"
          >
            {{ t('message.loginBtn') }}
          </van-button>
        </div>
        
        <!-- 注册账号链接 -->
        <div class="register-container">
          <span>{{ t('message.noAccount') }} </span>
          <a type="text" @click="handleRegister" class="register-btn">
            {{ t('message.register') }}
          </a>
        </div>
      </van-form>
    </div>
    
    <!-- 版权信息 -->
    <div class="copyright">
      <p>&copy; {{ new Date().getFullYear() }} {{ t('message.projectName') }}. {{ t('message.allRightsReserved') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/modules/user';
import { useI18n } from 'vue-i18n';
import { showToast } from 'vant';
import LanguageSwitch from '../components/LanguageSwitch.vue';

// 表单数据
const username = ref('');
const password = ref('');
const loading = ref(false);
const rememberPassword = ref(false);
const loginFormRef = ref(null);

// 引入相关模块
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();

// 组件挂载时检查是否有记住的密码
onMounted(() => {
  // 从本地存储获取记住的用户名密码
  const savedUsername = localStorage.getItem('rememberedUsername');
  // 注意：在实际生产环境中，密码不应明文存储在localStorage中
  const savedPassword = localStorage.getItem('rememberedPassword');
  
  if (savedUsername && savedPassword) {
    username.value = savedUsername;
    password.value = savedPassword;
    rememberPassword.value = true;
  }
  
  // 自动聚焦到第一个输入框
  nextTick(() => {
    const usernameInput = document.querySelector('input[name="username"]');
    if (usernameInput) {
      usernameInput.focus();
    }
  });
});

// 登录处理函数
const handleLogin = async () => {
  try {
    loading.value = true;
    
    // 表单验证
    if (!loginFormRef.value) return;
    
    const validateResult = await loginFormRef.value.validate();
    if (!validateResult.valid) {
      // 使用国际化的错误提示
      const firstError = validateResult.errors[0];
      showToast(firstError.message || t('message.formValidateFailed'));
      return;
    }
    
    // 调用登录API
    const result = await userStore.login({
      username: username.value,
      password: password.value
    });
    
    // 记住密码 - 注意：在实际生产环境中应考虑更安全的存储方式
    if (rememberPassword.value) {
      localStorage.setItem('rememberedUsername', username.value);
      localStorage.setItem('rememberedPassword', password.value);
    } else {
      localStorage.removeItem('rememberedUsername');
      localStorage.removeItem('rememberedPassword');
    }
    
    // 登录成功后跳转到首页
    router.push('/');
    showToast(t('message.loginSuccess'));
  } catch (error) {
    console.error('登录失败:', error);
    // 智能错误处理
    const errorMessage = error?.response?.data?.message || 
                        error?.message || 
                        t('message.loginFailed');
    showToast(errorMessage);
  } finally {
    loading.value = false;
  }
};

// 忘记密码处理函数
const handleForgotPassword = () => {
  showToast(t('message.forgotPasswordHint'));
};

// 注册账号处理函数
const handleRegister = () => {
  // 这里可以跳转到注册页面，当前项目可能没有注册页面，所以只显示提示
  showToast(t('message.registerHint'));
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--bg-color);
  position: relative;
  transition: background-color 0.3s ease;
}

.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.app-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInUp 0.6s ease forwards;
}

.logo-image {
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
}

.app-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
}

/* 自定义登录卡片样式，替代 van-card */
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 30px 24px;
  background-color: var(--card-bg-color);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease 0.2s forwards;
  /* 增强的卡片样式 */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-title {
  text-align: center;
  color: var(--text-color);
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
}

.form-field {
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.form-field:focus-within {
  transform: translateY(-2px);
}

.remember-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.remember-checkbox {
  --checkbox-color: var(--primary-color);
  --text-color: var(--text-color);
}

.forgot-password-btn {
  font-size: 14px;
  color: var(--primary-color);
  padding: 8px;
  transition: color 0.3s ease;
}

.forgot-password-btn:active {
  opacity: 0.7;
}

.form-actions {
  margin-bottom: 20px;
}

.login-button {
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  height: 48px;
  transition: all 0.3s ease;
}

.register-container {
  text-align: center;
  font-size: 14px;
  color: var(--text-color-secondary);
}

.register-btn {
  font-size: 14px;
  padding: 5px 6px;
  color: var(--primary-color);
  transition: color 0.3s ease;
}

.register-btn:active {
  opacity: 0.7;
}

.copyright {
  margin-top: auto;
  margin-bottom: 20px;
  text-align: center;
  font-size: 12px;
  color: var(--text-color-tertiary);
  opacity: 0;
  animation: fadeInUp 0.6s ease 0.4s forwards;
}

/* 适配主题 */
.van-field__label {
  color: var(--text-color);
}

.van-field__input {
  color: var(--text-color);
  background-color: var(--field-bg-color);
  border-radius: 6px;
}

.van-cell {
  background-color: transparent;
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-card {
    padding: 20px 16px;
    margin-top: 20px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  }
  
  .login-title {
    font-size: 20px;
  }
  
  .app-name {
    font-size: 24px;
  }
  
  .logo-image {
    width: 60px;
    height: 60px;
  }
}

/* 深色模式下的特殊样式 */
@media (prefers-color-scheme: dark) {
  .login-card {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
}
</style>