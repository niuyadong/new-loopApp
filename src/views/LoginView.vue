<template>
  <div class="login-container">
    <h2>{{ t('message.login') }}</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">{{ t('message.username') }}</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">{{ t('message.password') }}</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="login-btn">{{ t('message.loginBtn') }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/modules/user';
import { useI18n } from 'vue-i18n'

defineProps({});

defineEmits([]);

const username = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n()

const handleLogin = async () => {
  try {
    // 调用登录API
    await userStore.login({ username: username.value, password: password.value });
    // 登录成功后跳转到首页
    router.push('/');
  } catch (error) {
    console.error('登录失败:', error);
    alert('登录失败，请检查用户名和密码');
  }
};
</script>

<style lang="scss" scoped>
// 使用主题变量和SCSS变量
$primary-color: #42b983;

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  margin-top: 100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--card-bg);

  h2 {
    color: var(--text-color);
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      color: var(--text-color);
    }

    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--bg-color);
      color: var(--text-color);

      &:focus {
        outline: none;
        border-color: $primary-color;
        box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 10px;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}
</style>