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
import { useRouter } from 'vue-router'
import { generateTagSeo, generatePageSeo } from '@/config/seo'
import { useSeoMeta } from '@unhead/vue'
import { useWebsiteStore } from '@/stores/modules/website'

const route = useRoute()
const router = useRouter()
const websiteStore = useWebsiteStore()

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

// 创建响应式的SEO数据
const seoData = ref({
  title: '标签页 - 游荡de蝌蚪',
  description: '按标签浏览游荡de蝌蚪博客的文章',
  keywords: '文章标签,技术标签,博客标签,生活标签',
  ogTitle: '标签页 - 游荡de蝌蚪',
  ogDescription: '按标签浏览游荡de蝌蚪博客的文章',
  ogImage: '/logo.svg',
  ogUrl: 'https://www.yddekd.com/tag',
  twitterTitle: '标签页 - 游荡de蝌蚪',
  twitterDescription: '按标签浏览游荡de蝌蚪博客的文章'
})

// 使用响应式的SEO数据
useSeoMeta(seoData)

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

    // 直接从websiteStore获取已存储的统计数据
    const statsData = websiteStore.articleStats

    // 构建标签列表，包含"全部"选项
    tagList.value = [
      {
        name: '全部',
        id: '',
        articleCount: statsData?.articles || 0 // 使用总文章数
      },
      ...(statsData?.tags || []) // 使用返回的标签数据
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
    const generatedSeoData = generateTagSeo(tag)
    seoData.value = {
      title: generatedSeoData.title,
      description: generatedSeoData.description,
      keywords: generatedSeoData.keywords,
      ogTitle: generatedSeoData.title,
      ogDescription: generatedSeoData.description,
      ogImage: generatedSeoData.image,
      ogUrl: generatedSeoData.url,
      twitterTitle: generatedSeoData.title,
      twitterDescription: generatedSeoData.description
    }
  } else {
    // “全部”标签页面
    const generatedSeoData = generatePageSeo('tag')
    seoData.value = {
      title: generatedSeoData.title,
      description: generatedSeoData.description,
      keywords: generatedSeoData.keywords,
      ogTitle: generatedSeoData.title,
      ogDescription: generatedSeoData.description,
      ogImage: generatedSeoData.image,
      ogUrl: `${generatedSeoData.url}/tag`,
      twitterTitle: generatedSeoData.title,
      twitterDescription: generatedSeoData.description
    }
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
  },
  { immediate: true } // 立即执行一次
)

onMounted(() => {
  getTagStats()
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
