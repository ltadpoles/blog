<template>
  <div class="article">
    <div class="article-item" v-for="article in list" :key="article.id">
      <div class="article-content" @click="getInfo(article.id)">
        <div class="article-image hidden-large">
          <img :src="ImgUrl + article.coverImgId" alt="" />
        </div>
        <div class="article-main">
          <div class="article-content-title">
            <div class="article-content-title-top" v-if="article.top === '1'">
              <span>置顶</span>
            </div>
            <h1>{{ article.title }}</h1>
          </div>
          <div class="article-content-description">
            <el-text line-clamp="3">
              {{ article.description }}
            </el-text>
          </div>
        </div>
        <div class="article-image hidden hidden-mini">
          <img :src="ImgUrl + article.coverImgId" alt="" />
        </div>
      </div>
      <el-divider />
      <div class="article-content-footer">
        <div class="article-content-footer-left">
          <SvgIcon name="calendar" />
          <span>{{ dayjs(article.createTime).format('YYYY-MM-DD') }}</span>
        </div>
        <div class="article-content-footer-right">{{ article.category[0]?.name }}</div>
      </div>
    </div>

    <div class="article-footer">
      <div class="load-more" @click="loadMore" v-if="canLoadMore" :class="{ loading: loading }">
        {{ loading ? '加载中...' : '查看更多' }}
      </div>
      <div v-else-if="list.length > 0" class="no-more">没有更多了</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { articlepage } from '@/api/article'
import { dayjs } from 'element-plus'
import { useRouter } from 'vue-router'
import config from '@/config'

const ImgUrl = config.BASEURL + '/file/download?fileId='

const router = useRouter()

// 文章列表数据
const list = ref([])
const loading = ref(false)
const hasMore = ref(true)

// 查询参数
const query = reactive({
  pageNum: 1,
  pageSize: 10,
  param: {
    category: '',
    tags: []
  }
})

// 总数统计
const total = ref(0)

// 计算是否还有更多数据
const canLoadMore = computed(() => {
  return !loading.value && hasMore.value && list.value.length < total.value
})

// 获取文章列表
const getList = async ({ pageNum = 1, category = '', tags = [] }) => {
  try {
    loading.value = true

    // 更新查询参数
    query.pageNum = pageNum
    query.param.category = category
    query.param.tags = tags

    const { data } = await articlepage(query)

    // 处理分页数据
    if (pageNum === 1) {
      list.value = data.data.list || []
    } else {
      list.value.push(...data.data.list)
    }

    total.value = data.data.total || 0
    hasMore.value = list.value.length < total.value

    return data.data.total || 0
  } catch {
    // 获取文章列表失败
    return 0
  } finally {
    loading.value = false
  }
}

// 加载更多
const loadMore = async () => {
  if (!canLoadMore.value) {
    return
  }

  query.pageNum += 1
  await getList({
    pageNum: query.pageNum,
    category: query.param.category,
    tags: query.param.tags
  })
}

// 重置列表（用于切换分类/标签时）
const resetList = () => {
  list.value = []
  query.pageNum = 1
  hasMore.value = true
}

// 跳转到文章详情
const getInfo = id => {
  router.push('/article/' + id)
}

// 暴露方法给父组件
defineExpose({
  getList,
  resetList,
  loading: computed(() => loading.value),
  hasMore: computed(() => hasMore.value)
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
