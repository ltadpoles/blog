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
        <comment-form />
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-header-left">
            <SvgIcon name="more" />
            <span>留言列表</span>
          </div>
        </div>
        <el-divider />

        <ul class="board-list">
          <li class="board-item" v-for="item in messages" :key="item.id">
            <div class="board-item-inner">
              <el-avatar class="board-avatar" :src="item.avatar || defaultAvatar" :size="32" />
              <div class="board-body">
                <div class="board-header">
                  <h4 class="board-name">
                    <a v-if="item.website" @click="formatWebsite(item.website)" class="name-link">
                      {{ item.name }}
                    </a>
                    <span v-else>{{ item.name }}</span>
                  </h4>
                  <div class="board-meta">
                    <span v-if="item.location" class="board-location">{{ item.location }}</span>
                  </div>
                </div>

                <!-- 留言内容 -->
                <p class="board-content">{{ item.content }}</p>

                <!-- 留言操作 -->
                <div class="board-actions">
                  <span class="board-time">{{ item.createdAt }}</span>
                  <div class="board-action-item" @click="toggleLike(item.id)" :class="{ liked: item.liked }">
                    <SvgIcon name="like" :class="{ liked: item.liked }" />
                    <span>{{ item.likes || 0 }}</span>
                  </div>
                  <div
                    class="board-action-item"
                    @click="toggleReply(item.id)"
                    :class="{ 'reply-active': replying[item.id] }"
                  >
                    <SvgIcon name="message" :class="{ 'reply-active': replying[item.id] }" />
                    <span>{{ replying[item.id] ? '取消回复' : '回复' }}</span>
                  </div>
                </div>

                <!-- 回复输入框组件 -->
                <div class="reply-box">
                  <comment-form :rows="2" v-if="replying[item.id]" />
                </div>

                <!-- 回复列表 -->
                <div v-if="item.replies && item.replies.length" class="reply-list">
                  <div v-for="reply in getDisplayReplies(item)" :key="reply.id" class="reply-list-item">
                    <el-avatar class="reply-avatar" :src="reply.avatar || defaultAvatar" :size="24" />
                    <div class="reply-content-wrapper">
                      <div class="reply-header">
                        <span class="reply-name">{{ reply.name }}</span>
                        <span class="reply-reply-to">回复 {{ item.name }}</span>
                        <span class="reply-time">{{ reply.createdAt }}</span>
                      </div>
                      <div class="reply-content">{{ reply.content }}</div>
                      <div class="reply-actions">
                        <div
                          class="board-action-item"
                          @click="toggleLikeReply(item.id, reply.id)"
                          :class="{ liked: reply.liked }"
                        >
                          <SvgIcon name="like" :class="{ liked: reply.liked }" />
                          <span>{{ reply.likes || 0 }}</span>
                        </div>
                        <div
                          class="board-action-item"
                          @click="toggleReplyToReply(item.id, reply.id)"
                          :class="{ 'reply-active': replyingToReply[`${item.id}-${reply.id}`] }"
                        >
                          <SvgIcon
                            name="message"
                            :class="{ 'reply-active': replyingToReply[`${item.id}-${reply.id}`] }"
                          />
                          <span>{{ replyingToReply[`${item.id}-${reply.id}`] ? '取消回复' : '回复' }}</span>
                        </div>
                      </div>

                      <div class="reply-box">
                        <comment-form :rows="2" v-if="replyingToReply[`${item.id}-${reply.id}`]" />
                      </div>
                    </div>
                  </div>

                  <!-- 展开/收起更多回复 -->
                  <div v-if="item.replies.length > maxCollapsedReplies" class="reply-more">
                    <el-button type="text" size="small" @click="toggleRepliesExpand(item.id)">
                      {{ getMoreLabel(item) }}
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import defaultAvatar from '@/assets/images/avatar.jpg'
import CommentForm from '@/components/comment-form/index.vue'

// 留言数据
const messages = ref([])

// 响应式状态
const replying = reactive({})
const replyContent = reactive({})
const repliesExpanded = reactive({})
const maxCollapsedReplies = 2

// 回复的回复状态
const replyingToReply = reactive({})
const replyToReplyContent = reactive({})

// 格式化网站链接
const formatWebsite = website => {
  if (!website) {
    return
  }
  window.open(/^https?:\/\//i.test(website) ? website : `https://${website}`, '_blank')
}

// 切换回复输入框
const toggleReply = id => {
  replying[id] = !replying[id]
  if (replying[id] && !replyContent[id]) {
    replyContent[id] = ''
  }
}

// 切换回复展开状态
const toggleRepliesExpand = id => {
  repliesExpanded[id] = !repliesExpanded[id]
}

// 获取显示的回复列表
const getDisplayReplies = item => {
  if (!item.replies || !item.replies.length) {
    return []
  }

  if (repliesExpanded[item.id] || item.replies.length <= maxCollapsedReplies) {
    return item.replies
  }

  return item.replies.slice(0, maxCollapsedReplies)
}

// 获取更多回复的标签
const getMoreLabel = item => {
  return repliesExpanded[item.id] ? '收起' : `展开更多 ${item.replies.length - maxCollapsedReplies} 条`
}

// 切换点赞状态
const toggleLike = id => {
  const item = messages.value.find(m => m.id === id)
  if (item) {
    item.liked = !item.liked
    item.likes = item.liked ? (item.likes || 0) + 1 : Math.max(0, (item.likes || 0) - 1)
  }
}

// 切换回复点赞状态
const toggleLikeReply = (messageId, replyId) => {
  const message = messages.value.find(m => m.id === messageId)
  if (message && message.replies) {
    const reply = message.replies.find(r => r.id === replyId)
    if (reply) {
      reply.liked = !reply.liked
      reply.likes = reply.liked ? (reply.likes || 0) + 1 : Math.max(0, (reply.likes || 0) - 1)
    }
  }
}

// 切换回复到回复输入框
const toggleReplyToReply = (messageId, replyId) => {
  replyingToReply[`${messageId}-${replyId}`] = !replyingToReply[`${messageId}-${replyId}`]
  if (replyingToReply[`${messageId}-${replyId}`] && !replyToReplyContent[`${messageId}-${replyId}`]) {
    replyToReplyContent[`${messageId}-${replyId}`] = ''
  }
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
