<template>
  <div class="home">
    <h1>首页</h1>
    <van-button type="primary" @click="showToast">点击显示提示</van-button>
    <van-toast v-model:show="show" message="这是一个提示" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'

const show = ref(false)
</script>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 30px;
  }

  // 自定义按钮样式（覆盖Vant默认样式）
  .van-button {
    margin-bottom: 20px;
  }
}
</style>