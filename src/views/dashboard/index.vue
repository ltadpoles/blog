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
              <SvgIcon name="component" />
              <span>分类</span>
            </div>
            <div class="card-header-right">
              <SvgIcon name="more" @click="toCategory('')" />
            </div>
          </div>
          <el-divider />
          <div class="categories-list">
            <div
              class="categories-list-item"
              v-for="category in categoryList"
              :key="category.id"
              @click="toCategory(category.id)"
            >
              <div class="categories-title">{{ category.name }}</div>
              <div class="categories-count">{{ category.articleCount }}</div>
            </div>
          </div>
        </div>

        <div class="tags card">
          <div class="card-header">
            <div class="card-header-left">
              <SvgIcon name="tag" />
              <span>标签</span>
            </div>
            <div class="card-header-right">
              <SvgIcon name="more" @click="toTag('')" />
            </div>
          </div>
          <el-divider />
          <div class="tags-content">
            <div class="tags-content-item" v-for="tag in tagList" :key="tag.id" @click="toTag(tag.id)">
              <span>{{ tag.name }}</span>
              <sup>{{ tag.articleCount }}</sup>
            </div>
          </div>
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import user from '@/components/user/index.vue'
import articleList from '@/components/article/index.vue'
import { useRouter } from 'vue-router'
import { categoryStatistics, tagStatistics } from '@/api'

const router = useRouter()

const categoryList = ref([])
const tagList = ref([])
const getCategoryStats = async () => {
  let { data } = await categoryStatistics()
  categoryList.value = data.data
}
const getTagStats = async () => {
  let { data } = await tagStatistics()
  tagList.value = data.data
}
const toCategory = id => {
  router.push(`/category/${id}`)
}
const toTag = id => {
  router.push(`/tag/${id}`)
}

const articleRef = ref(null)
onMounted(() => {
  articleRef.value.getList({ category: '', tags: [] })
  getCategoryStats()
  getTagStats()
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
