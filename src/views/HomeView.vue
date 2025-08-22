<template>
  <div class="home">
    <h1>{{ t('message.welcome') }}</h1>
    <van-button type="primary" @click="showToast">{{ t('message.hello') }}</van-button>
    <van-toast v-model:show="show" :message="t('message.welcome')" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'

const show = ref(false)
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    color: var(--text-color);
    font-size: 2rem;
    margin-bottom: 30px;
  }

  // 自定义按钮样式（覆盖Vant默认样式）
  .van-button {
    margin-bottom: 20px;
  }
}
</style>