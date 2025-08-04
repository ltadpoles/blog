<template>
  <div>
    <n-card title="卡片"> 卡片内容 </n-card>

    <div class="test">这个是测试</div>
    <n-button type="primary"> Primary </n-button>

    <n-button @click="info"> 信息（Hover不消失） </n-button>

    <div class="text">jfowejiofwofhe</div>
  </div>
</template>

<script setup>
import { createDiscreteApi } from 'naive-ui'
const { message } = createDiscreteApi(['message'])
const info = () => {
  message.info("I don't know why nobody told you how to unfold your love", {
    keepAliveOnHover: true
  })
}
</script>

<style lang="scss" scoped>
.test {
  // color: var(--primary-color);
  background-color: var(--bg-color);
  padding: 20px;
  margin: 20px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}
</style>
