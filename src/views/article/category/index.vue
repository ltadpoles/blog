<template>
  <div class="view">
    <div class="view-content">
      <div class="category-list">
        <div
          class="category-list-item"
          :class="{ 'category-list-item-active': route.params.id === String(item.id) }"
          v-for="item in categoryList"
          :key="item.id"
          @click="getCategory(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <el-divider />
      <div class="category-info">
        <div class="category-info-left">{{ currentCategory.name }}</div>
        <div class="category-info-right">{{ currentCategory.articleCount }}篇</div>
      </div>
      <article-list ref="articleRef" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed, watch, nextTick } from 'vue'
import articleList from '@/components/article/index.vue'
import { useRoute } from 'vue-router'
import { categoryStatistics, statistics } from '@/api'
import { useRouter } from 'vue-router'
import { generateCategorySeo, generatePageSeo } from '@/config/seo'
import { useSeoMeta } from '@unhead/vue'

const route = useRoute()
const router = useRouter()

// 当前分类信息
const currentCategory = reactive({
  articleCount: 0,
  name: '',
  id: ''
})

// 分类列表数据
const categoryList = ref([])
const loading = ref(false)

// 文章列表引用
const articleRef = ref(null)

// 创建响应式的SEO数据
const seoData = ref({
  title: '分类页 - 游荡de蝌蚪',
  description: '按分类浏览游荡de蝌蚪博客的文章',
  keywords: '文章分类,技术分类,博客分类,生活分类',
  ogTitle: '分类页 - 游荡de蝌蚪',
  ogDescription: '按分类浏览游荡de蝌蚪博客的文章',
  ogImage: '/logo.svg',
  ogUrl: 'https://www.yddekd.com/category',
  twitterTitle: '分类页 - 游荡de蝌蚪',
  twitterDescription: '按分类浏览游荡de蝌蚪博客的文章'
})

// 使用响应式的SEO数据
useSeoMeta(seoData)

// 计算当前选中的分类
const selectedCategory = computed(() => {
  if (categoryList.value.length === 0) {
    return null
  }
  const categoryId = route.params.id
  return categoryList.value.find(item => String(item.id) === categoryId) || categoryList.value[0]
})

// 获取分类统计信息
const getCategoryStats = async () => {
  try {
    loading.value = true

    // 并行获取分类统计和总文章数
    const [categoryRes, statsRes] = await Promise.all([categoryStatistics(), statistics()])

    // 构建分类列表，包含"全部"选项
    categoryList.value = [
      {
        name: '全部',
        id: '',
        articleCount: statsRes.data.data?.articles || 0 // 使用总文章数
      },
      ...categoryRes.data.data
    ]

    // 初始化当前分类信息
    const currentCategory = selectedCategory.value
    if (currentCategory) {
      updateCurrentCategory(currentCategory)

      // 等待组件渲染完成后初始化文章列表
      await nextTick()
      if (articleRef.value) {
        articleRef.value.getList({ category: currentCategory.id })
      }
    }
  } catch {
    // 获取分类统计失败
  } finally {
    loading.value = false
  }
}

// 更新当前分类信息
const updateCurrentCategory = category => {
  if (category) {
    currentCategory.articleCount = category.articleCount
    currentCategory.name = category.name
    currentCategory.id = category.id

    // 更新SEO信息
    updateSEO(category)
  }
}

// SEO配置（动态更新）
const updateSEO = category => {
  if (category && category.id) {
    // 具体分类页面
    const generatedSeoData = generateCategorySeo(category)
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
    // “全部”分类页面
    const generatedSeoData = generatePageSeo('category')
    seoData.value = {
      title: generatedSeoData.title,
      description: generatedSeoData.description,
      keywords: generatedSeoData.keywords,
      ogTitle: generatedSeoData.title,
      ogDescription: generatedSeoData.description,
      ogImage: generatedSeoData.image,
      ogUrl: `${generatedSeoData.url}/category`,
      twitterTitle: generatedSeoData.title,
      twitterDescription: generatedSeoData.description
    }
  }
}

// 点击分类切换
const getCategory = item => {
  router.push('/category/' + item.id)
  // 只更新分类信息，文章列表的加载由路由监听器处理
  updateCurrentCategory(item)
}

// 监听路由变化
watch(
  () => route.params.id,
  newId => {
    const category = categoryList.value.find(item => String(item.id) === newId)
    if (category) {
      updateCurrentCategory(category)
      if (articleRef.value) {
        articleRef.value.resetList()
        articleRef.value.getList({ category: category.id })
      }
    }
  },
  { immediate: true } // 立即执行一次
)

onMounted(() => {
  getCategoryStats()
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
