<!--
  网站维护中页面
  用于显示网站维护状态
-->
<template>
  <div class="maintenance-page">
    <div class="maintenance-container">
      <div class="maintenance-icon">
        <SvgIcon name="maintenance" width="120px" height="120px" />
      </div>

      <h1 class="maintenance-title">网站维护中</h1>

      <div class="maintenance-message">
        <p>请稍后再访问。</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
