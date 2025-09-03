<template>
  <div class="view">
    <div class="view-content">
      <article-list ref="articleRef" />
    </div>
    <div class="view-sidebar hidden-mini">
      <user />
      <el-affix :offset="64">
        <div class="categories card">
          <div class="card-header">
            <div class="card-header-left">
              <SvgIcon name="component" width="0.85rem" height="0.85rem" />
              <span>分类</span>
            </div>
            <div class="card-header-right">
              <SvgIcon name="more" @click="toCategory('')" />
            </div>
          </div>
          <el-divider />
          <div class="categories-list">
            <!-- 加载状态 -->
            <div v-if="loading" class="loading-state">
              <el-skeleton :rows="3" animated />
            </div>
            <!-- 有数据时显示分类列表 -->
            <template v-else-if="websiteStore.articleStats?.categories?.length">
              <div
                class="categories-list-item"
                v-for="category in websiteStore.articleStats.categories"
                :key="category.id"
                @click="toCategory(category.id)"
              >
                <div class="categories-title">{{ category.name }}</div>
                <div class="categories-count">{{ category.articleCount }}</div>
              </div>
            </template>
            <!-- 空数据状态 -->
            <div v-else class="empty-state">
              <div class="empty-text">暂无分类数据</div>
            </div>
          </div>
        </div>

        <div class="tags card">
          <div class="card-header">
            <div class="card-header-left">
              <SvgIcon name="tag" width="0.85rem" height="0.85rem" />
              <span>标签</span>
            </div>
            <div class="card-header-right">
              <SvgIcon name="more" @click="toTag('')" />
            </div>
          </div>
          <el-divider />
          <div class="tags-content">
            <!-- 加载状态 -->
            <div v-if="loading" class="loading-state">
              <el-skeleton :rows="2" animated />
            </div>
            <!-- 有数据时显示标签列表 -->
            <template v-else-if="websiteStore.articleStats?.tags?.length">
              <div
                class="tags-content-item"
                v-for="tag in websiteStore.articleStats.tags"
                :key="tag.id"
                @click="toTag(tag.id)"
              >
                <span>{{ tag.name }}</span>
                <sup>{{ tag.articleCount }}</sup>
              </div>
            </template>
            <!-- 空数据状态 -->
            <div v-else class="empty-state">
              <div class="empty-text">暂无标签数据</div>
            </div>
          </div>
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import user from '@/components/user/index.vue'
import articleList from '@/components/article/index.vue'
import { useRouter } from 'vue-router'
import { generatePageSeo } from '@/config/seo'
import { useSeoMeta } from '@unhead/vue'
import { useWebsiteStore } from '@/stores/modules/website'

// SEO配置
const seoData = generatePageSeo('home')
useSeoMeta({
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ogTitle: seoData.title,
  ogDescription: seoData.description,
  ogImage: seoData.image,
  ogUrl: seoData.url,
  twitterTitle: seoData.title,
  twitterDescription: seoData.description,
  twitterImage: seoData.image
})

const websiteStore = useWebsiteStore()
const router = useRouter()

// 计算加载状态
const loading = computed(() => {
  return !websiteStore.articleStats || (!websiteStore.articleStats.categories && !websiteStore.articleStats.tags)
})

const toCategory = id => {
  router.push(`/category/${id}`)
}
const toTag = id => {
  router.push(`/tag/${id}`)
}

const articleRef = ref(null)
onMounted(() => {
  articleRef.value.getList({ category: '', tags: [] })
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
