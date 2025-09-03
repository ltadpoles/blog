<!--
  500页面 - 服务器错误
  用于显示服务器内部错误的情况
-->
<template>
  <div class="server-error-page">
    <div class="server-error-container">
      <div class="server-error-icon">
        <SvgIcon name="500" width="120px" height="120px" />
      </div>

      <h1 class="server-error-title">服务器错误</h1>

      <div class="server-error-message">
        <p>抱歉，服务器出现了问题。</p>
        <p>我们正在努力修复，请稍后再试。</p>
        <p>如果问题持续存在，请联系管理员。</p>
      </div>

      <div class="server-error-actions">
        <el-button @click="goHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/svgIcon/index.vue'

const router = useRouter()

// 状态管理
const errorTime = ref('')
const errorId = ref('')

// 返回首页
const goHome = () => {
  router.push('/')
}

// 生成错误ID
const generateErrorId = () => {
  return 'ERR_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
}

onMounted(() => {
  // 设置错误时间
  errorTime.value = new Date().toLocaleString('zh-CN')
  // 生成错误ID
  errorId.value = generateErrorId()
})
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
