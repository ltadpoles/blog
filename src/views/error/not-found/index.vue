<!--
  404页面 - 页面未找到
  用于显示页面不存在的情况
-->
<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <div class="not-found-icon">
        <SvgIcon name="404" width="120px" height="120px" />
      </div>

      <h1 class="not-found-title">页面未找到</h1>

      <div class="not-found-message">
        <p>抱歉，您访问的页面不存在。</p>
        <p>可能的原因：</p>
        <ul>
          <li>页面已被删除或移动</li>
          <li>链接地址输入错误</li>
          <li>页面正在建设中</li>
        </ul>
      </div>

      <div class="not-found-actions">
        <el-button type="primary" @click="goHome">返回首页</el-button>
        <el-button @click="goBack">返回上页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/svgIcon/index.vue'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}

// 返回上一页
const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
