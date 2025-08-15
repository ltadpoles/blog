<template>
  <div class="user">
    <div class="user-img">
      <img :src="userStore.user.avatar || getImageUrl('avatar.jpg')" alt="" />
    </div>
    <div class="user-motto">{{ userStore.user.remark }}</div>
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
import { useUserStore } from '@/stores/modules/user'
import { getImageUrl } from '@/utils'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
@use 'index' as *;
</style>
