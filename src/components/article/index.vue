<!--
  文章列表组件
  显示文章列表、支持分页加载、分类筛选、标签过滤
  对外暴露 getList、resetList 等方法和 loading、hasMore 状态
-->
<template>
  <div class="article">
    <!-- 文章列表 -->
    <div class="article-item" v-for="article in list" :key="article.id">
      <div class="article-content" @click="getInfo(article.id)">
        <!-- 移动端封面图 -->
        <div class="article-image hidden-large">
          <img :src="ImgUrl + article.coverImgId" alt="" />
        </div>

        <!-- 文章主体内容 -->
        <div class="article-main">
          <div class="article-content-title">
            <!-- 置顶标识 -->
            <div class="article-content-title-top" v-if="article.top === '1'">
              <span>置顶</span>
            </div>
            <h1>{{ article.title }}</h1>
          </div>

          <!-- 文章摘要 -->
          <div class="article-content-description">
            <el-text line-clamp="3">
              {{ article.description }}
            </el-text>
          </div>
        </div>

        <!-- 桌面端封面图 -->
        <div class="article-image hidden hidden-mini">
          <img :src="ImgUrl + article.coverImgId" alt="" />
        </div>
      </div>

      <el-divider />

      <!-- 文章信息底部 -->
      <div class="article-content-footer">
        <div class="article-content-footer-left">
          <SvgIcon name="calendar" />
          <span>{{ dayjs(article.createTime).format('YYYY-MM-DD') }}</span>
        </div>
        <div class="article-content-footer-right">{{ article.category[0]?.name }}</div>
      </div>
    </div>

    <!-- 加载更多按钮 -->
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

// 图片资源基础路径
const ImgUrl = config.BASEURL + '/file/download?fileId='
const router = useRouter()

// 组件状态
const list = ref([]) // 文章列表数据
const loading = ref(false) // 加载状态
const hasMore = ref(true) // 是否还有更多数据
const total = ref(0) // 数据总数

// 查询参数
const query = reactive({
  pageNum: 1,
  pageSize: 10,
  param: {
    category: '',
    tags: []
  }
})

/**
 * 计算是否还可以加载更多
 * @returns {boolean} 是否可以加载更多
 */
const canLoadMore = computed(() => {
  return !loading.value && hasMore.value && list.value.length < total.value
})

/**
 * 获取文章列表
 * @param {Object} options - 查询参数
 * @param {number} options.pageNum - 页码，默认 1
 * @param {string} options.category - 分类 ID
 * @param {Array} options.tags - 标签数组
 * @returns {Promise<number>} 返回数据总数
 */
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

/**
 * 加载更多数据
 * 获取下一页数据并追加到列表末尾
 */
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

/**
 * 重置列表
 * 用于切换分类/标签时清空现有数据
 */
const resetList = () => {
  list.value = []
  query.pageNum = 1
  hasMore.value = true
}

/**
 * 跳转到文章详情页
 * @param {string|number} id - 文章 ID
 */
const getInfo = id => {
  router.push('/article/' + id)
}

/**
 * 对外暴露的方法和属性
 * 供父组件调用
 */
defineExpose({
  getList, // 获取文章列表方法
  resetList, // 重置列表方法
  loading: computed(() => loading.value), // 加载状态
  hasMore: computed(() => hasMore.value) // 是否还有更多数据
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
