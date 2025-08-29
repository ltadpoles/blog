<template>
  <div class="view">
    <div class="view-content">
      <div class="tag-list">
        <div
          class="tag-list-item"
          :class="{ 'tag-list-item-active': route.params.id === String(item.id) }"
          v-for="item in tagList"
          :key="item.id"
          @click="getTag(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <el-divider />
      <div class="tag-info">
        <div class="tag-info-left">{{ currentTag.name }}</div>
        <div class="tag-info-right">{{ currentTag.articleCount }}篇</div>
      </div>
      <article-list ref="articleRef" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed, watch, nextTick } from 'vue'
import articleList from '@/components/article/index.vue'
import { useRoute } from 'vue-router'
import { tagStatistics, statistics } from '@/api'
import { useRouter } from 'vue-router'
import { generateTagSeo, generatePageSeo } from '@/config/seo'
import { useSeoMeta } from '@unhead/vue'

const route = useRoute()
const router = useRouter()

// 当前标签信息
const currentTag = reactive({
  articleCount: 0,
  name: '',
  id: ''
})

// 标签列表数据
const tagList = ref([])
const loading = ref(false)

// 文章列表引用
const articleRef = ref(null)

// 计算当前选中的标签
const selectedTag = computed(() => {
  if (tagList.value.length === 0) {
    return null
  }
  const tagId = route.params.id
  return tagList.value.find(item => String(item.id) === tagId) || tagList.value[0]
})

// 获取标签统计信息
const getTagStats = async () => {
  try {
    loading.value = true

    // 并行获取标签统计和总文章数
    const [tagRes, statsRes] = await Promise.all([tagStatistics(), statistics()])

    // 构建标签列表，包含"全部"选项
    tagList.value = [
      {
        name: '全部',
        id: '',
        articleCount: statsRes.data.data?.articles || 0 // 使用总文章数
      },
      ...tagRes.data.data
    ]

    // 初始化当前标签信息
    const currentTag = selectedTag.value
    if (currentTag) {
      updateCurrentTag(currentTag)

      // 等待组件渲染完成后初始化文章列表
      await nextTick()
      if (articleRef.value) {
        articleRef.value.getList({ tags: currentTag.id ? [currentTag.id] : [] })
      }
    }
  } catch {
    // 获取标签统计失败
  } finally {
    loading.value = false
  }
}

// 更新当前标签信息
const updateCurrentTag = tag => {
  if (tag) {
    currentTag.articleCount = tag.articleCount
    currentTag.name = tag.name
    currentTag.id = tag.id

    // 更新SEO信息
    updateSEO(tag)
  }
}

// SEO配置（动态更新）
const updateSEO = tag => {
  if (tag && tag.id) {
    // 具体标签页面
    const seoData = generateTagSeo(tag)
    useSeoMeta({
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      ogTitle: seoData.title,
      ogDescription: seoData.description,
      ogImage: seoData.image,
      ogUrl: seoData.url,
      twitterTitle: seoData.title,
      twitterDescription: seoData.description
    })
  } else {
    // “全部”标签页面
    const seoData = generatePageSeo('tag')
    useSeoMeta({
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      ogTitle: seoData.title,
      ogDescription: seoData.description,
      ogImage: seoData.image,
      ogUrl: `${seoData.url}/tag`,
      twitterTitle: seoData.title,
      twitterDescription: seoData.description
    })
  }
}

// 点击标签切换
const getTag = item => {
  router.push('/tag/' + item.id)
  // 只更新标签信息，文章列表的加载由路由监听器处理
  updateCurrentTag(item)
}

// 监听路由变化
watch(
  () => route.params.id,
  newId => {
    const tag = tagList.value.find(item => String(item.id) === newId)
    if (tag) {
      updateCurrentTag(tag)
      if (articleRef.value) {
        articleRef.value.resetList()
        articleRef.value.getList({ tags: tag.id ? [tag.id] : [] })
      }
    }
  }
)

onMounted(() => {
  getTagStats()
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
