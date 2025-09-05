<template>
  <div class="user">
    <div class="user-img">
      <img :src="websiteStore.info.avatar || getImageUrl('avatar.jpg')" alt="" />
    </div>
    <div class="user-motto">{{ websiteStore.info.siteNotice || '欢迎来到我的博客' }}</div>
    <div class="user-statistics">
      <div class="user-statistics-item">
        <div class="item-count">{{ websiteStore.articleStats?.articles }}</div>
        <div class="item-title">文章</div>
      </div>
      <el-divider direction="vertical" />
      <div class="user-statistics-item">
        <div class="item-count">{{ websiteStore.articleStats?.categories?.length }}</div>
        <div class="item-title">分类</div>
      </div>
      <el-divider direction="vertical" />
      <div class="user-statistics-item">
        <div class="item-count">{{ websiteStore.articleStats?.tags?.length }}</div>
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
import { useWebsiteStore } from '@/stores/modules/website'

const websiteStore = useWebsiteStore()
</script>

<style lang="scss" scoped>
@use 'index' as *;
</style>
