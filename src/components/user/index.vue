<template>
  <div class="user">
    <div class="user-img">
      <img :src="getImageUrl('avatar.jpg')" alt="" />
    </div>
    <div class="user-motto">给这个世界的留言给这个世界的留言给这个世界的留言</div>
    <div class="user-statistics">
      <div class="user-statistics-item">
        <div class="item-count">19</div>
        <div class="item-title">文章</div>
      </div>
      <el-divider direction="vertical" />
      <div class="user-statistics-item">
        <div class="item-count">19</div>
        <div class="item-title">分类</div>
      </div>
      <el-divider direction="vertical" />
      <div class="user-statistics-item">
        <div class="item-count">39</div>
        <div class="item-title">标签</div>
      </div>
    </div>
    <el-divider />
    <div class="user-information">
      <div class="user-information-item">
        <SvgIcon name="github" width="2.4rem" height="2.4rem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getImageUrl } from '@/utils'
</script>

<style lang="scss" scoped>
@use 'index' as *;
</style>
