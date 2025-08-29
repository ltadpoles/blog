<template>
  <div class="view">
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
    <div class="view-sidebar hidden-mini">
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
import CommentForm from '@/components/comment-form/index.vue'
import CommentList from '@/components/comment-list/index.vue'

const settingStore = useSettingStore()

let info = reactive({
  content: '',
  category: [],
  tag: [],
  catalogList: [],
  activeId: null
})

// 评论相关数据
const comments = ref([])
const commentPagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

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

const debounce = (func, delay) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
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

const route = useRoute()
const getInfo = async () => {
  const id = route.params.id
  let { data } = await articleDetail({ id })
  info.content = data.data.content
  info = Object.assign(info, data.data)
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

onMounted(async () => {
  await getInfo()
  await getCommentList()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)

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
