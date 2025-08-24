<template>
  <div class="view">
    <div class="view-content">
      <!-- 留言表单卡片 -->
      <div class="card">
        <div class="card-header">
          <div class="card-header-left">
            <SvgIcon name="board" />
            <span>留言板</span>
          </div>
        </div>
        <el-divider />
        <comment-form v-model="form" :loading="submitting" @submit="handleSubmit" @reset="handleReset" />
      </div>

      <!-- 留言列表卡片 -->
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
                <!-- 留言头部信息 -->
                <div class="board-header">
                  <h4 class="board-nickname">
                    <a v-if="item.website" @click="formatWebsite(item.website)" class="nickname-link">
                      {{ item.nickname }}
                    </a>
                    <span v-else>{{ item.nickname }}</span>
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

                <!-- 回复输入框 -->
                <div v-if="replying[item.id]" class="reply-box">
                  <el-input
                    v-model="replyContent[item.id]"
                    type="textarea"
                    :rows="3"
                    maxlength="500"
                    show-word-limit
                    placeholder="回复内容"
                  />
                  <emoji-picker @select="e => insertReplyEmoji(item.id, e)" />
                  <div class="reply-actions">
                    <el-button size="small" type="primary" @click="submitReply(item.id)">提交回复</el-button>
                  </div>
                </div>

                <!-- 回复列表 -->
                <div v-if="item.replies && item.replies.length" class="reply-list">
                  <div v-for="reply in getDisplayReplies(item)" :key="reply.id" class="reply-list-item">
                    <el-avatar class="reply-avatar" :src="reply.avatar || defaultAvatar" :size="24" />
                    <div class="reply-content-wrapper">
                      <div class="reply-header">
                        <span class="reply-nickname">{{ reply.nickname }}</span>
                        <span class="reply-reply-to">回复 {{ item.nickname }}</span>
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

                      <!-- 回复的回复输入框 -->
                      <div v-if="replyingToReply[`${item.id}-${reply.id}`]" class="reply-box">
                        <el-input
                          v-model="replyToReplyContent[`${item.id}-${reply.id}`]"
                          type="textarea"
                          :rows="3"
                          maxlength="500"
                          show-word-limit
                          placeholder="回复内容"
                        />
                        <emoji-picker @select="e => insertReplyToReplyEmoji(item.id, reply.id, e)" />
                        <div class="reply-actions">
                          <el-button size="small" type="primary" @click="submitReplyToReply(item.id, reply.id)">
                            提交回复
                          </el-button>
                        </div>
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
import { ElMessage } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.jpg'
import CommentForm from '@/components/comment-form/index.vue'
import EmojiPicker from '@/components/emoji-picker/index.vue'

const submitting = ref(false)

const form = reactive({
  nickname: '',
  email: '',
  website: '',
  content: ''
})

// 模拟留言数据
const messages = ref([
  {
    id: 1,
    nickname: '小明',
    website: 'https://example.com',
    content: '博客很棒！🚀',
    createdAt: '2024-10-01 12:30',
    location: '四川 成都',
    avatar: '',
    likes: 2,
    liked: false,
    replies: [
      {
        id: 11,
        nickname: '作者',
        content: '谢谢支持！😊',
        createdAt: '2024-10-01 13:00',
        location: '四川 成都',
        avatar: '',
        likes: 1,
        liked: false,
        replies: []
      },
      {
        id: 12,
        nickname: '游荡de蝌蚪',
        content: '这个就是厉害的',
        createdAt: '2024-10-01 14:00',
        location: '北京',
        avatar: '',
        likes: 0,
        liked: false,
        replies: []
      }
    ]
  },
  {
    id: 2,
    nickname: 'Alice',
    website: '',
    content: '学到了很多，感谢分享！🎉',
    createdAt: '2024-10-02 09:20',
    location: '北京',
    avatar: '',
    likes: 0,
    liked: false,
    replies: []
  }
])

// 响应式状态
const replying = reactive({})
const replyContent = reactive({})
const repliesExpanded = reactive({})
const maxCollapsedReplies = 3

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

// 插入表情到回复
const insertReplyEmoji = (id, e) => {
  replyContent[id] = (replyContent[id] || '') + e
}

// 提交回复
const submitReply = id => {
  const content = (replyContent[id] || '').trim()
  if (!content) {
    ElMessage.warning('请输入回复内容')
    return
  }

  const target = messages.value.find(m => m.id === id)
  if (!target) {
    return
  }

  const newReply = {
    id: Date.now(),
    nickname: '我',
    content,
    createdAt: new Date().toLocaleString(),
    likes: 0,
    liked: false,
    replies: []
  }

  if (!Array.isArray(target.replies)) {
    target.replies = []
  }
  target.replies.unshift(newReply)
  replyContent[id] = ''
  replying[id] = false
  ElMessage.success('回复成功')
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

// 插入表情到回复的回复
const insertReplyToReplyEmoji = (messageId, replyId, e) => {
  replyToReplyContent[`${messageId}-${replyId}`] = (replyToReplyContent[`${messageId}-${replyId}`] || '') + e
}

// 提交回复的回复
const submitReplyToReply = (messageId, replyId) => {
  const content = (replyToReplyContent[`${messageId}-${replyId}`] || '').trim()
  if (!content) {
    ElMessage.warning('请输入回复内容')
    return
  }

  const message = messages.value.find(m => m.id === messageId)
  if (!message) {
    return
  }

  const reply = message.replies.find(r => r.id === replyId)
  if (!reply) {
    return
  }

  const newReply = {
    id: Date.now(),
    nickname: '我',
    content,
    createdAt: new Date().toLocaleString(),
    likes: 0,
    liked: false
  }

  if (!Array.isArray(reply.replies)) {
    reply.replies = []
  }
  reply.replies.unshift(newReply)
  replyToReplyContent[`${messageId}-${replyId}`] = ''
  replyingToReply[`${messageId}-${replyId}`] = false
  ElMessage.success('回复成功')
}

// 提交留言
const handleSubmit = async () => {
  submitting.value = true
  try {
    const newItem = {
      id: Date.now(),
      nickname: form.nickname,
      website: form.website,
      content: form.content,
      createdAt: new Date().toLocaleString(),
      location: '四川 成都',
      avatar: '',
      likes: 0,
      liked: false,
      replies: []
    }
    messages.value.unshift(newItem)
    ElMessage.success('留言成功')
    handleReset()
  } catch {
    ElMessage.error('提交失败')
  } finally {
    submitting.value = false
  }
}

// 重置表单
const handleReset = () => {
  form.nickname = ''
  form.email = ''
  form.website = ''
  form.content = ''
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
