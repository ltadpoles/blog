<template>
  <div class="view">
    <div class="view-content">
      <div class="card">
        <div class="card-header">
          <div class="card-header-left">
            <SvgIcon name="board" />
            <span>留言板</span>
          </div>
        </div>
        <el-divider />
        <comment-form @submit="onMainSubmit" />
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-header-left">
            <SvgIcon name="more" />
            <span>留言列表</span>
            <span class="message-count">（共 {{ pagination.total }} 条）</span>
          </div>
        </div>
        <el-divider />

        <comment-list
          :comments="messages"
          :pagination="pagination"
          @current-change="handleCurrentChange"
          @reply-submit="onReplySubmit"
          @like-change="onLikeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import CommentForm from '@/components/comment-form/index.vue'
import CommentList from '@/components/comment-list/index.vue'
import { getBoardPage } from '@/api/board'

// 留言数据
const messages = ref([])

// 分页配置
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 获取留言列表
const getList = async () => {
  try {
    const { data } = await getBoardPage({
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    messages.value = data.data.list
    pagination.total = data.data.total
  } catch {
    // 获取留言列表失败
  }
}

// 主留言提交处理
const onMainSubmit = async () => {
  pagination.pageNum = 1
  await getList()

  // 提交留言后，滚动到留言列表开始位置
  await nextTick()
  scrollToMessageList()
}

// 回复提交处理
const onReplySubmit = async ({ parentId, replies }) => {
  const mainMessage = messages.value.find(m => m.id === parentId)
  if (mainMessage) {
    mainMessage.list = [...replies]
  }
}

// 当前页改变
const handleCurrentChange = async current => {
  pagination.pageNum = current
  await getList()

  // 页码变化后，滚动到留言列表开始位置
  await nextTick()
  scrollToMessageList()
}

// 点赞状态变化处理
const onLikeChange = () => {
  // 可以在这里处理点赞状态变化的逻辑
}

// 滚动到留言列表开始位置
const scrollToMessageList = () => {
  try {
    // 优先查找留言列表容器
    const messageListElement = document.querySelector('.board-list')
    if (!messageListElement) {
      return
    }

    // 计算留言列表相对于视口的位置
    const rect = messageListElement.getBoundingClientRect()
    const headerHeight = 105 //头部高度为105px
    const offset = 20 // 额外偏移量，让用户看到一些上下文

    // 如果留言列表不在视口顶部，则滚动到合适位置
    if (rect.top > headerHeight + offset) {
      const targetPosition = rect.top + window.scrollY - headerHeight - offset

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    } else {
      // 如果留言列表已经在视口顶部附近，确保第一个留言可见
      const firstMessage = messageListElement.querySelector('.board-item')
      if (firstMessage) {
        const firstMessageRect = firstMessage.getBoundingClientRect()
        if (firstMessageRect.top < headerHeight) {
          const targetPosition = firstMessageRect.top + window.scrollY - headerHeight - offset
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }
    }
  } catch {
    // 滚动失败时静默处理，不影响用户体验
  }
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
