<template>
  <div class="comment-list">
    <ul class="comment-list-container" v-if="comments && comments.length > 0">
      <li class="comment-item" v-for="item in comments" :key="item.id">
        <div class="comment-item-inner">
          <el-avatar
            class="comment-avatar"
            @click="formatWebsite(item.user?.website)"
            :src="item.user?.avatar || defaultAvatar"
            :size="32"
          />
          <div class="comment-body">
            <div class="comment-header">
              <h4 class="comment-name">
                <span>{{ item.user?.name }}</span>
              </h4>
              <div class="comment-meta">
                <span v-if="item.ipCountry" class="comment-location">
                  {{ item.ipCountry + item.ipProvince + item.ipCity }}
                </span>
              </div>
            </div>

            <p class="comment-content">{{ item.content }}</p>
            <div class="comment-actions">
              <span class="comment-time">{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
              <div class="comment-action-item" @click="likeChange(item.id)" :class="{ liked: isLiked(item.id) }">
                <SvgIcon name="like" :class="{ liked: isLiked(item.id) }" />
                <span>{{ item.likeCount || 0 }}</span>
              </div>
              <div
                class="comment-action-item"
                @click="toggleReplyBox(item.id)"
                :class="{ 'reply-active': replying[item.id] }"
              >
                <SvgIcon name="message" :class="{ 'reply-active': replying[item.id] }" />
                <span>{{ replying[item.id] ? '取消回复' : '回复' }}</span>
              </div>
            </div>

            <!-- 回复输入框组件 -->
            <div class="reply-box">
              <comment-form
                :ref="
                  el => {
                    if (el) replyFormRefs[item.id] = el
                  }
                "
                :rows="2"
                :parentId="item.id"
                :replyToUserName="item.user?.name"
                :type="type"
                :articleId="articleId"
                v-if="replying[item.id]"
                @submit="onReplySubmit"
              />
            </div>

            <!-- 回复列表 -->
            <div v-if="item.list && item.list.length" class="reply-list">
              <div v-for="reply in getDisplayReplies(item)" :key="reply.id" class="reply-list-item">
                <el-avatar
                  class="reply-avatar"
                  @click="formatWebsite(reply.user?.website)"
                  :src="reply.user?.avatar || defaultAvatar"
                  :size="24"
                />
                <div class="reply-content-wrapper">
                  <div class="reply-header">
                    <span class="reply-name">{{ reply.user?.name }}</span>
                    <span class="reply-reply-to">回复 {{ reply.replyToUserName }}</span>
                  </div>
                  <div class="reply-content">{{ reply.content }}</div>

                  <div class="comment-actions">
                    <span class="comment-time">{{ dayjs(reply.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    <div
                      class="comment-action-item"
                      @click="likeChange(reply.id, true)"
                      :class="{ liked: isLiked(reply.id) }"
                    >
                      <SvgIcon name="like" :class="{ liked: isLiked(reply.id) }" />
                      <span>{{ reply.likeCount || 0 }}</span>
                    </div>
                    <div
                      class="comment-action-item"
                      @click="toggleReplyBox(`${item.id}-${reply.id}`)"
                      :class="{ 'reply-active': replyingToReply[`${item.id}-${reply.id}`] }"
                    >
                      <SvgIcon name="message" :class="{ 'reply-active': replyingToReply[`${item.id}-${reply.id}`] }" />
                      <span>{{ replyingToReply[`${item.id}-${reply.id}`] ? '取消回复' : '回复' }}</span>
                    </div>
                  </div>

                  <div class="reply-box">
                    <comment-form
                      :ref="
                        el => {
                          if (el) replyFormRefs[`${item.id}-${reply.id}`] = el
                        }
                      "
                      :rows="2"
                      :parentId="item.id"
                      :replyToUserName="reply.user?.name"
                      :type="type"
                      :articleId="articleId"
                      v-if="replyingToReply[`${item.id}-${reply.id}`]"
                      @submit="onReplySubmit"
                    />
                  </div>
                </div>
              </div>

              <!-- 展开/收起更多回复 -->
              <div v-if="item.list.length > maxCollapsedReplies" class="reply-more">
                <el-button type="text" size="small" @click="toggleRepliesExpand(item.id)">
                  {{ getMoreLabel(item) }}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div v-else class="no-comments">
      <div class="no-comments-content">
        <SvgIcon name="message" class="no-comments-icon" />
        <p class="no-comments-text">
          {{ type === 'comment' ? '暂无评论，快来发表第一条评论吧~' : '暂无留言，快来发表第一条留言吧~' }}
        </p>
      </div>
    </div>

    <div v-if="showPagination && comments && comments.length > 0" class="pagination-wrapper">
      <el-pagination
        :current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import defaultAvatar from '@/assets/images/avatar.jpg'
import CommentForm from '@/components/comment-form/index.vue'
import SvgIcon from '@/components/svgIcon/index.vue'
import { getBoardList } from '@/api/board'
import { getCommentList } from '@/api/comment'
import { dayjs, ElMessage } from 'element-plus'
import { likeUserLikes, toggleLike } from '@/api/like'
import { useUserStore } from '@/stores/modules/user'

const props = defineProps({
  comments: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => ({
      pageNum: 1,
      pageSize: 10,
      total: 0
    })
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  maxCollapsedReplies: {
    type: Number,
    default: 2
  },
  type: { type: String, default: 'board' }, // 类型：'board' 留言板，'comment' 文章评论
  articleId: { type: Number, default: null } // 文章ID
})

const emit = defineEmits(['current-change', 'reply-submit', 'like-change'])

const userStore = useUserStore()

// 响应式状态
const replying = reactive({})
const repliesExpanded = reactive({})
const replyingToReply = reactive({})
const replyFormRefs = reactive({})

// 用户点赞的实体ID集合
const userLikedEntities = ref(new Set())

const formatWebsite = website => {
  if (!website) {
    return
  }
  window.open(/^https?:\/\//i.test(website) ? website : `https://${website}`, '_blank')
}

const closeAllReplyBoxes = () => {
  Object.keys(replying).forEach(id => {
    replying[id] = false
  })

  Object.keys(replyingToReply).forEach(key => {
    replyingToReply[key] = false
  })
}

// 回复提交处理
const onReplySubmit = async parentId => {
  try {
    closeAllReplyBoxes()

    // 稍微延迟后获取最新回复，确保后端数据已更新
    await new Promise(resolve => setTimeout(resolve, 100))

    // 根据类型调用不同的API
    const info = { parentId, type: props.type }
    if (props.type === 'comment' && props.articleId) {
      info.articleId = props.articleId
    }

    const { data } = props.type === 'comment' ? await getCommentList(info) : await getBoardList(info)

    // 通知父组件更新数据
    emit('reply-submit', { parentId, replies: data.data.list })
  } catch {
    // 获取回复列表失败，即使失败也要通知父组件，避免界面卡住
    emit('reply-submit', { parentId, replies: [] })
  }
}

// 当前页改变
const handleCurrentChange = async current => {
  // 不直接修改prop，而是通过emit通知父组件
  emit('current-change', current)
}

// 切换回复展开状态
const toggleRepliesExpand = id => {
  repliesExpanded[id] = !repliesExpanded[id]
}

// 获取显示的回复列表
const getDisplayReplies = item => {
  if (!item.list || !item.list.length) {
    return []
  }

  if (repliesExpanded[item.id] || item.list.length <= props.maxCollapsedReplies) {
    return item.list
  }

  return item.list.slice(0, props.maxCollapsedReplies)
}

// 获取更多回复的标签
const getMoreLabel = item => {
  return repliesExpanded[item.id] ? '收起' : `展开更多 ${item.list.length - props.maxCollapsedReplies} 条`
}

// 切换点赞的通用函数
const toggleLikeEntity = async (entityId, entityType, item) => {
  try {
    const isCurrentlyLiked = userLikedEntities.value.has(entityId)

    const { data } = await toggleLike({
      entityId,
      entityType,
      isLike: !isCurrentlyLiked,
      userId: userStore.message.userId
    })

    // 更新用户信息，只更新userId，保留其他字段
    if (data.data?.userId) {
      userStore.setMessage({ ...userStore.message, userId: data.data.userId })
    }

    // 创建新的Set以确保响应式更新
    const newLikedEntities = new Set(userLikedEntities.value)

    // 直接切换状态
    if (isCurrentlyLiked) {
      newLikedEntities.delete(entityId)
      item.likeCount = Math.max(0, (item.likeCount || 0) - 1)
    } else {
      newLikedEntities.add(entityId)
      item.likeCount = (item.likeCount || 0) + 1
    }

    // 更新响应式引用
    userLikedEntities.value = newLikedEntities
    ElMessage.success(isCurrentlyLiked ? '取消点赞成功' : '点赞成功')
  } catch {
    ElMessage.error('点赞操作失败，请稍后重试')
  }
}

const handleLike = async (id, isReply = false) => {
  let item, entityType

  if (isReply) {
    const message = props.comments.find(m => m.list?.some(r => r.id === id))
    item = message?.list?.find(r => r.id === id)
    // 回复的类型与主评论保持一致
    entityType = props.type === 'board' ? 'board' : 'comment'
  } else {
    item = props.comments.find(m => m.id === id)
    entityType = props.type === 'board' ? 'board' : 'comment'
  }

  if (!item) {
    return
  }

  await toggleLikeEntity(id, entityType, item)

  emit('like-change', { id, isLiked: userLikedEntities.value.has(id) })
}

// 切换评论点赞状态
const likeChange = async (id, isReply = false) => {
  await handleLike(id, isReply)
}

// 切换回复框显示状态
const toggleReplyBox = key => {
  // 确保key是字符串类型
  const keyStr = String(key)
  // 判断key是否符合回复的回复的格式（包含连字符且能分割成两个部分）
  const parts = keyStr.split('-')
  if (parts.length === 2) {
    if (replyingToReply[keyStr]) {
      replyingToReply[keyStr] = false
      return
    }

    closeAllReplyBoxes()
    replyingToReply[keyStr] = true
  } else {
    if (replying[keyStr]) {
      replying[keyStr] = false
      return
    }

    closeAllReplyBoxes()
    replying[keyStr] = true
  }
  focusElement(keyStr)
}

// 自动获取焦点的通用函数
const focusElement = key => {
  nextTick(() => {
    setTimeout(() => {
      if (replyFormRefs[key]) {
        replyFormRefs[key].focus()
      }
    }, 50)
  })
}

// 监听回复状态变化，自动获取焦点
watch(
  replying,
  (newVal, oldVal) => {
    Object.keys(newVal).forEach(id => {
      if (newVal[id] && !oldVal[id]) {
        focusElement(id)
      }
    })
  },
  { deep: true }
)

// 监听嵌套回复状态变化，自动获取焦点
watch(
  replyingToReply,
  (newVal, oldVal) => {
    Object.keys(newVal).forEach(key => {
      if (newVal[key] && !oldVal[key]) {
        focusElement(key)
      }
    })
  },
  { deep: true }
)

const getUserLikedEntities = async () => {
  if (!userStore.message.userId) {
    return
  }

  try {
    const { data } = await likeUserLikes({ userId: userStore.message.userId })

    let relevantLikes = []
    if (props.type === 'board') {
      relevantLikes = data.data?.filter(like => like.entityType === 'board' || like.entityType === 'comment') || []
    } else {
      relevantLikes = data.data?.filter(like => like.entityType === 'comment') || []
    }

    userLikedEntities.value = new Set(relevantLikes.map(like => like.entityId))
  } catch {
    // 获取用户点赞列表失败
  }
}

const isLiked = entityId => {
  return userLikedEntities.value.has(entityId)
}

onMounted(() => {
  getUserLikedEntities()
})

// 监听用户ID变化，重新获取点赞状态
watch(
  () => userStore.message.userId,
  newUserId => {
    if (newUserId) {
      getUserLikedEntities()
    } else {
      // 用户登出时清空点赞状态
      userLikedEntities.value = new Set()
    }
  }
)
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
