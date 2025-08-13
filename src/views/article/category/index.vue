<template>
  <div class="view">
    <div class="view-content">
      <div class="category-list">
        <div class="category-list-item category-list-item-active">生活记录</div>
        <div class="category-list-item">生活记录</div>
      </div>
      <el-divider />
      <div class="category-info">
        <div class="category-info-left">生活记录</div>
        <div class="category-info-right">12篇</div>
      </div>
      <article-list />
    </div>
  </div>
</template>

<script setup>
import articleList from '@/components/article/index.vue'
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
