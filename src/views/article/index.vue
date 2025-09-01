<template>
  <div class="view">
    <!-- 左侧浮动操作按钮 -->
    <div class="article-floating-actions">
      <!-- 点赞按钮 -->
      <div class="floating-action-item">
        <el-badge
          :value="info.likeCount || 0"
          :max="999"
          :hidden="(info.likeCount || 0) === 0"
          class="floating-like-badge"
        >
          <div class="floating-like-button" @click="toggleArticleLike" :class="{ liked: isArticleLiked }">
            <SvgIcon width="1.2rem" height="1.2rem" name="like" :class="{ liked: isArticleLiked }" />
          </div>
        </el-badge>
      </div>

      <!-- 评论按钮 -->
      <div class="floating-action-item">
        <el-badge
          :value="commentPagination.total || 0"
          :max="999"
          :hidden="(commentPagination.total || 0) === 0"
          class="floating-comment-badge"
        >
          <div class="floating-comment-button" @click="scrollToCommentList">
            <SvgIcon width="1.2rem" height="1.2rem" name="message" />
          </div>
        </el-badge>
      </div>
    </div>

    <div class="view-content">
      <h1 class="article-title">{{ info.title }}</h1>
      <div class="article-info">
        <div class="article-info-left">
          <SvgIcon name="calendar" />
          <span>{{ dayjs(info.createTime).format('YYYY-MM-DD') }}</span>
        </div>
        <div class="article-info-right">{{ info.category[0]?.name }}</div>
      </div>
      <el-divider />
      <div class="article-content">
        <MdPreview :theme="settingStore.theme" :modelValue="info.content" @onGetCatalog="onGetCatalog" />
      </div>
      <div class="article-tags">
        <SvgIcon name="tag" />
        <el-tag type="primary" v-for="tag in info.tag" :key="tag.id">{{ tag.name }}</el-tag>
      </div>

      <!-- 文章点赞区域 -->
      <div class="article-like-section">
        <div class="article-like-button" @click="toggleArticleLike" :class="{ liked: isArticleLiked }">
          <SvgIcon width="1.2rem" height="1.2rem" name="like" :class="{ liked: isArticleLiked }" />
          <span>{{ info.likeCount || 0 }}</span>
        </div>
      </div>

      <!-- 评论区域 -->
      <div class="article-comments">
        <el-divider />
        <div class="comment-section">
          <div class="comment-header">
            <div class="comment-header-left">
              <span>发表评论</span>
            </div>
          </div>
          <comment-form :type="'comment'" :articleId="Number(route.params.id)" @submit="onCommentSubmit" />
        </div>

        <div class="comment-list-section">
          <div class="comment-header">
            <div class="comment-header-left">
              <SvgIcon name="more" />
              <span>全部评论</span>
              <span class="comment-count">（共 {{ commentPagination.total }} 条）</span>
            </div>
          </div>
          <comment-list
            :comments="comments"
            :pagination="commentPagination"
            :type="'comment'"
            :articleId="Number(route.params.id)"
            @current-change="handleCommentPageChange"
            @reply-submit="onReplySubmit"
            @like-change="onLikeChange"
          />
        </div>
      </div>
    </div>
    <div class="view-sidebar hidden-mini hidden">
      <el-affix :offset="64">
        <div class="card">
          <div class="card-header">
            <div class="card-header-left">
              <SvgIcon name="menu" />
              <span>目录</span>
            </div>
          </div>
          <el-divider />
          <div class="article-menu">
            <div
              class="menu-item"
              v-for="item in info.catalogList"
              :key="item.line"
              :class="{ 'menu-item-active': info.activeId === item.line }"
              @click="goToAnchor(item.line)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, nextTick, ref } from 'vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { useSettingStore } from '@/stores/modules/setting'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'
import { getCommentPage } from '@/api/comment'
import { dayjs } from 'element-plus'
import { ElMessage } from 'element-plus'
import CommentForm from '@/components/comment-form/index.vue'
import CommentList from '@/components/comment-list/index.vue'
import { generateArticleSeo } from '@/config/seo'
import { debounce } from '@/utils'
import { useSeoMeta } from '@unhead/vue'
import { likeUserLikes, toggleLike } from '@/api/like'
import { useUserStore } from '@/stores/modules/user'

const settingStore = useSettingStore()
const userStore = useUserStore()
const route = useRoute()

// 创建响应式的SEO数据
const seoData = ref({
  title: '文章详情 - 游荡de蝌蚪',
  description: '正在加载文章内容...',
  keywords: '文章详情,技术文章,博客文章',
  ogTitle: '文章详情 - 游荡de蝌蚪',
  ogDescription: '正在加载文章内容...',
  ogType: 'article'
})

// 使用响应式的SEO数据
useSeoMeta(seoData)

let info = reactive({
  content: '',
  category: [],
  tag: [],
  catalogList: [],
  activeId: null,
  likeCount: 0 // 初始化点赞数量
})

// 评论相关数据
const comments = ref([])
const commentPagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 文章点赞相关数据
const isArticleLiked = ref(false) // 明确设置初始值为false

const onGetCatalog = list => {
  info.catalogList = list
  // 等待DOM渲染完成后再计算偏移量
  nextTick(() => {
    setTimeout(calculateOffsets, 100)
  })
}

const calculateOffsets = () => {
  if (info.catalogList.length === 0) {
    return
  }

  let hasValidElements = false

  info.catalogList.forEach(item => {
    const el = document.querySelector(`[data-line="${item.line}"]`)
    if (el) {
      try {
        // 获取元素相对于文档的绝对位置
        const rect = el.getBoundingClientRect()
        item.offsetTop = rect.top + window.scrollY - 64
        hasValidElements = true
      } catch {
        // 计算锚点偏移量失败，设置为null
        item.offsetTop = null
      }
    } else {
      item.offsetTop = null
    }
  })

  // 只有在有有效元素时才处理滚动
  if (hasValidElements) {
    handleScroll()
  }
}

const handleScroll = debounce(() => {
  if (info.catalogList.length === 0) {
    return
  }

  const scrollPosition = window.scrollY + 100
  let activeFound = false

  for (let i = info.catalogList.length - 1; i >= 0; i--) {
    const item = info.catalogList[i]

    if (typeof item.offsetTop === 'number') {
      if (scrollPosition >= item.offsetTop) {
        info.activeId = item.line
        activeFound = true
        break
      }
    }
  }

  if (!activeFound && info.catalogList.length > 0) {
    if (scrollPosition < info.catalogList[0]?.offsetTop) {
      info.activeId = null
    }
  }
}, 16) // 约60fps的防抖

const goToAnchor = line => {
  const el = document.querySelector(`[data-line="${line}"]`)
  if (el) {
    try {
      const headerHeight = 64
      const rect = el.getBoundingClientRect()
      const targetPosition = rect.top + window.scrollY - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    } catch {
      // 跳转到锚点失败，降级处理：直接跳转到元素位置
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  // 未找到锚点元素时静默处理
}

const handleResize = debounce(() => {
  calculateOffsets()
}, 200)

// SEO配置（当文章信息加载后动态更新）
const updateSEO = articleData => {
  if (articleData) {
    const generatedSeoData = generateArticleSeo({
      id: articleData.id,
      title: articleData.title,
      description: articleData.description,
      content: articleData.content,
      tags: articleData.tag || [],
      createTime: articleData.createTime,
      updateTime: articleData.updateTime
    })

    // 更新响应式的SEO数据
    seoData.value = {
      title: generatedSeoData.title,
      description: generatedSeoData.description,
      keywords: generatedSeoData.keywords,
      ogTitle: generatedSeoData.title,
      ogDescription: generatedSeoData.description,
      ogImage: generatedSeoData.image,
      ogUrl: generatedSeoData.url,
      ogType: 'article',
      'article:author': generatedSeoData.author,
      'article:published_time': generatedSeoData.publishedTime,
      'article:modified_time': generatedSeoData.modifiedTime,
      twitterTitle: generatedSeoData.title,
      twitterDescription: generatedSeoData.description,
      twitterImage: generatedSeoData.image
    }
  }
}

const getInfo = async () => {
  const id = route.params.id
  let { data } = await articleDetail({ id })

  // 更新文章信息
  info.content = data.data.content
  info = Object.assign(info, data.data)

  // 确保 likeCount 有默认值
  if (typeof info.likeCount === 'undefined' || info.likeCount === null) {
    info.likeCount = 0
  }

  // 文章信息加载完成后更新SEO
  updateSEO(data.data)

  // 获取用户点赞状态（在文章信息加载完成后）
  await getUserArticleLikeStatus()
}

// 获取评论列表
const getCommentList = async () => {
  try {
    const articleId = route.params.id
    const { data } = await getCommentPage({
      pageNum: commentPagination.pageNum,
      pageSize: commentPagination.pageSize,
      param: { articleId: Number(articleId) }
    })

    comments.value = data.data.list
    commentPagination.total = data.data.total
  } catch {
    // 获取评论列表失败
  }
}

// 评论提交处理
const onCommentSubmit = async () => {
  commentPagination.pageNum = 1
  await getCommentList()

  // 提交评论后，滚动到评论列表开始位置
  await nextTick()
  scrollToCommentList()
}

// 回复提交处理
const onReplySubmit = async ({ parentId, replies }) => {
  const mainComment = comments.value.find(c => c.id === parentId)
  if (mainComment) {
    mainComment.list = [...replies]
    // 更新回复数量
    if (replies && replies.length > 0) {
      mainComment.replyCount = replies.length
    }
  }
}

// 评论分页改变
const handleCommentPageChange = async current => {
  commentPagination.pageNum = current
  await getCommentList()

  // 页码变化后，滚动到评论列表开始位置
  await nextTick()
  scrollToCommentList()
}

// 点赞状态变化处理
const onLikeChange = () => {
  // 可以在这里处理点赞状态变化的逻辑
}

// 滚动到评论列表开始位置
const scrollToCommentList = () => {
  try {
    const commentListElement = document.querySelector('.comment-list-section')
    if (!commentListElement) {
      return
    }

    const rect = commentListElement.getBoundingClientRect()
    const headerHeight = 60 // 头部高度
    const offset = 20 // 额外偏移量

    // 计算目标滚动位置，确保评论列表在视口顶部可见
    const targetPosition = rect.top + window.scrollY - headerHeight - offset

    // 强制滚动到评论列表顶部，不管当前位置
    window.scrollTo({
      top: Math.max(0, targetPosition), // 确保不会滚动到负数位置
      behavior: 'smooth'
    })
  } catch {
    // 滚动失败时静默处理，不影响用户体验
  }
}

// 获取用户对文章的点赞状态
const getUserArticleLikeStatus = async () => {
  // 确保用户已登录且文章信息已加载
  if (!userStore.message.userId || !route.params.id) {
    isArticleLiked.value = false
    return
  }

  try {
    const { data } = await likeUserLikes({ userId: userStore.message.userId })
    const articleLikes = data.data?.filter(like => like.entityType === 'article') || []
    const articleId = Number(route.params.id)
    isArticleLiked.value = articleLikes.some(like => like.entityId === articleId)
  } catch {
    isArticleLiked.value = false
  }
}

// 切换文章点赞状态
const toggleArticleLike = async () => {
  if (!userStore.message.userId) {
    ElMessage.warning('请先登录后再点赞')
    return
  }

  try {
    const articleId = Number(route.params.id)
    const { data } = await toggleLike({
      entityId: articleId,
      entityType: 'article',
      isLike: !isArticleLiked.value,
      userId: userStore.message.userId
    })

    userStore.setMessage({ userId: data.data?.userId })

    // 更新本地点赞状态
    isArticleLiked.value = !isArticleLiked.value

    // 更新点赞数量
    info.likeCount = isArticleLiked.value ? (info.likeCount || 0) + 1 : Math.max(0, (info.likeCount || 0) - 1)
  } catch {
    ElMessage.error('点赞操作失败，请稍后重试')
  }
}

onMounted(async () => {
  // 添加事件监听器
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)

  // 加载文章信息（包括点赞状态）
  await getInfo()

  // 加载评论列表
  await getCommentList()

  // 等待文章内容渲染完成后再计算锚点
  setTimeout(calculateOffsets, 500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
