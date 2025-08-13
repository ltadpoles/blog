<template>
  <div class="view">
    <div class="view-content">
      <div class="tag-list">
        <div class="tag-list-item tag-list-item-active">Vue</div>
        <div class="tag-list-item">React</div>
      </div>
      <el-divider />
      <div class="tag-info">
        <div class="tag-info-left">Vue</div>
        <div class="tag-info-right">12篇</div>
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
