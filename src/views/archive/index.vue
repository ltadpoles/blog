<template>
  <div class="view">
    <div class="view-content">
      <!-- 归档统计信息 -->
      <div class="archive-header">
        <div class="archive-stats">
          <div class="stat-item">
            <span class="stat-number">{{ totalArticles }}</span>
            <span class="stat-label">篇文章</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ totalYears }}</span>
            <span class="stat-label">年归档</span>
          </div>
        </div>

        <!-- 搜索框 -->
        <div class="archive-search">
          <el-input v-model="searchKeyword" placeholder="搜索文章标题..." clearable @input="handleSearch">
            <template #prefix>
              <SvgIcon name="search" />
            </template>
          </el-input>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>

      <!-- 归档内容 -->
      <div v-else-if="filteredActivities.length > 0">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in filteredActivities"
            :key="index"
            :hide-timestamp="true"
            placement="top"
            type="primary"
            size="large"
            :hollow="true"
          >
            <div class="time">
              {{ activity.year }}
              <span class="year-count">（{{ activity.list.length }} 篇）</span>
            </div>
            <div class="archive-list" v-for="item in activity.list" :key="item.id">
              <div class="archive-list-time">{{ dayjs(item.createTime).format('MM-DD') }}</div>
              <div class="archive-list-content" @click="getInfo(item.id)">
                {{ item.title }}
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 空状态 -->
      <div v-else-if="!loading" class="empty-state">
        <div class="empty-content">
          <SvgIcon name="archive" class="empty-icon" />
          <p class="empty-text">
            {{ searchKeyword ? '没有找到匹配的文章' : '暂无归档文章' }}
          </p>
          <el-button v-if="searchKeyword" @click="clearSearch" type="primary" plain> 清除搜索 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { articleArchive } from '@/api/article'
import { dayjs } from 'element-plus'
import { debounce } from '@/utils'
import { generatePageSeo } from '@/config/seo'
import { useSeoMeta } from '@unhead/vue'

// SEO配置
const seoData = generatePageSeo('archive')
useSeoMeta({
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ogTitle: seoData.title,
  ogDescription: seoData.description,
  ogImage: seoData.image,
  ogUrl: `${seoData.url}/archive`,
  twitterTitle: seoData.title,
  twitterDescription: seoData.description
})

const router = useRouter()

// 响应式数据
const activities = ref([])
const loading = ref(true)
const searchKeyword = ref('')

// 计算属性
const totalArticles = computed(() => {
  return activities.value.reduce((total, activity) => total + activity.list.length, 0)
})

const totalYears = computed(() => {
  return activities.value.length
})

const filteredActivities = computed(() => {
  if (!searchKeyword.value.trim()) {
    return activities.value
  }

  const keyword = searchKeyword.value.toLowerCase().trim()
  return activities.value
    .map(activity => ({
      ...activity,
      list: activity.list.filter(item => item.title.toLowerCase().includes(keyword))
    }))
    .filter(activity => activity.list.length > 0)
})

// 方法
const getInfo = id => {
  router.push(`/article/${id}`)
}

const getArchiveList = async () => {
  try {
    loading.value = true
    const { data } = await articleArchive()
    activities.value = data.data || []
  } finally {
    loading.value = false
  }
}

// 防抖搜索
const handleSearch = debounce(() => {
  // 搜索逻辑由计算属性处理
}, 300)

const clearSearch = () => {
  searchKeyword.value = ''
}

onMounted(() => {
  getArchiveList()
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
