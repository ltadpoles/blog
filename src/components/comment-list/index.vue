<template>
  <div class="comment-list">
    <ul class="comment-list-container">
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

            <!-- 评论内容 -->
            <p class="comment-content">{{ item.content }}</p>

            <!-- 评论操作 -->
            <div class="comment-actions">
              <span class="comment-time">{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
              <div class="comment-action-item" @click="likeChange(item.id)" :class="{ liked: isMessageLiked(item.id) }">
                <SvgIcon name="like" :class="{ liked: isMessageLiked(item.id) }" />
                <span>{{ item.likeCount || 0 }}</span>
              </div>
              <div
                class="comment-action-item"
                @click="toggleReply(item.id)"
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
                      @click="toggleLikeReply(item.id, reply.id)"
                      :class="{ liked: isReplyLiked(reply.id) }"
                    >
                      <SvgIcon name="like" :class="{ liked: isReplyLiked(reply.id) }" />
                      <span>{{ reply.likeCount || 0 }}</span>
                    </div>
                    <div
                      class="comment-action-item"
                      @click="toggleReplyToReply(item.id, reply.id)"
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

    <!-- 分页组件 -->
    <div v-if="showPagination" class="pagination-wrapper">
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
import { dayjs } from 'element-plus'
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
  }
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

// 格式化网站链接
const formatWebsite = website => {
  if (!website) {
    return
  }
  window.open(/^https?:\/\//i.test(website) ? website : `https://${website}`, '_blank')
}

// 关闭所有回复框的通用函数
const closeAllReplyBoxes = () => {
  Object.keys(replying).forEach(id => {
    replying[id] = false
  })

  Object.keys(replyingToReply).forEach(key => {
    replyingToReply[key] = false
  })
}

// 切换回复输入框
const toggleReply = id => {
  if (replying[id]) {
    replying[id] = false
    return
  }

  closeAllReplyBoxes()
  replying[id] = true
  focusElement(id)
}

// 回复提交处理
const onReplySubmit = async parentId => {
  try {
    closeAllReplyBoxes()

    const { data } = await getBoardList({ parentId })

    // 通知父组件更新数据
    emit('reply-submit', { parentId, replies: data.data.list })
  } catch {
    // 获取回复列表失败
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
const toggleLikeEntity = async (entityId, entityType, isLiked, updateLikeCount) => {
  try {
    const { data } = await toggleLike({
      entityId,
      entityType,
      isLike: !isLiked,
      userId: userStore.message.userId
    })

    userStore.setMessage({ userId: data.data?.userId })

    // 更新本地点赞状态
    if (isLiked) {
      userLikedEntities.value.delete(entityId)
    } else {
      userLikedEntities.value.add(entityId)
    }

    // 更新点赞数量
    updateLikeCount(!isLiked)
  } catch {
    // 切换点赞状态失败
  }
}

// 切换评论点赞状态
const likeChange = async id => {
  const item = props.comments.find(m => m.id === id)
  if (!item) {
    return
  }

  const isCurrentlyLiked = isMessageLiked(id)

  await toggleLikeEntity(id, 'comment', isCurrentlyLiked, isLiked => {
    item.likeCount = isLiked ? (item.likeCount || 0) + 1 : Math.max(0, (item.likeCount || 0) - 1)
  })

  // 通知父组件点赞状态变化
  emit('like-change', { id, isLiked: !isCurrentlyLiked })
}

// 切换回复点赞状态
const toggleLikeReply = async (messageId, replyId) => {
  const message = props.comments.find(m => m.id === messageId)
  if (!message?.list) {
    return
  }

  const reply = message.list.find(r => r.id === replyId)
  if (!reply) {
    return
  }

  const isCurrentlyLiked = isReplyLiked(replyId)

  await toggleLikeEntity(replyId, 'comment', isCurrentlyLiked, isLiked => {
    reply.likeCount = isLiked ? (reply.likeCount || 0) + 1 : Math.max(0, (reply.likeCount || 0) - 1)
  })

  // 通知父组件点赞状态变化
  emit('like-change', { id: replyId, isLiked: !isCurrentlyLiked })
}

// 切换回复到回复输入框
const toggleReplyToReply = (messageId, replyId) => {
  const key = `${messageId}-${replyId}`

  if (replyingToReply[key]) {
    replyingToReply[key] = false
    return
  }

  closeAllReplyBoxes()
  replyingToReply[key] = true
  focusElement(key)
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

// 获取用户点赞列表
const getUserLikedEntities = async () => {
  try {
    const { data } = await likeUserLikes({ userId: userStore.message.userId })
    const commentLikes = data.data?.filter(like => like.entityType === 'comment') || []
    userLikedEntities.value = new Set(commentLikes.map(like => like.entityId))
  } catch {
    // 获取用户点赞列表失败
  }
}

// 检查留言是否被用户点赞
const isMessageLiked = messageId => {
  return userLikedEntities.value.has(messageId)
}

// 检查回复是否被用户点赞
const isReplyLiked = replyId => {
  return userLikedEntities.value.has(replyId)
}

onMounted(() => {
  if (userStore.message.userId) {
    getUserLikedEntities()
  }
})
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
