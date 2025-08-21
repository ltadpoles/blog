<template>
  <div class="view">
    <div class="view-content">
      <div class="card">
        <div class="card-header">
          <div class="card-header-left">
            <SvgIcon name="component" />
            <span>留言板</span>
          </div>
        </div>
        <el-divider />

        <comment-form v-model="form" :loading="submitting" @submit="handleSubmit" @reset="handleReset" />
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-header-left">
            <SvgIcon name="more" />
            <span>留言列表</span>
          </div>
        </div>
        <el-divider />

        <ul class="message-list">
          <li class="message-item" v-for="item in messages" :key="item.id">
            <div class="message-item-inner">
              <el-avatar class="message-avatar" :src="item.avatar || defaultAvatar" :size="40" />
              <div class="message-body">
                <header class="message-header">
                  <h4 class="message-nickname">
                    <a v-if="item.website" :href="formatWebsite(item.website)" target="_blank" rel="noopener">
                      {{ item.nickname }}
                    </a>
                    <span v-else>
                      {{ item.nickname }}
                    </span>
                  </h4>
                  <div class="message-meta">
                    <time class="message-time" :datetime="item.createdAt">{{ item.createdAt }}</time>
                    <span v-if="item.location" class="message-dot">·</span>
                    <span v-if="item.location" class="message-location">{{ item.location }}</span>
                  </div>
                </header>

                <p class="message-content">{{ item.content }}</p>

                <div class="message-actions">
                  <el-button
                    link
                    :type="item.liked ? 'primary' : 'default'"
                    class="action-like"
                    @click="toggleLikeMessage(item.id)"
                  >
                    赞 {{ item.likes || 0 }}
                  </el-button>
                  <el-button link type="primary" @click="toggleReply(item.id)">回复</el-button>
                </div>

                <div v-if="replying[item.id]" class="reply-box">
                  <el-input
                    v-model="replyContent[item.id]"
                    type="textarea"
                    :rows="3"
                    maxlength="300"
                    show-word-limit
                    placeholder="回复内容"
                  />
                  <emoji-picker @select="e => insertReplyEmoji(item.id, e)" />
                  <div class="reply-actions">
                    <el-button size="small" type="primary" @click="submitReply(item.id)">提交回复</el-button>
                    <el-button size="small" @click="toggleReply(item.id)">取消</el-button>
                  </div>
                </div>

                <div v-if="item.replies && item.replies.length" class="reply-list">
                  <ReplyItem v-for="rep in getVisibleReplies(item)" :key="rep.id" :node="rep" @add-reply="onAddReply" />
                  <div v-if="item.replies.length > maxCollapsedReplies" class="reply-more">
                    <el-button link type="primary" @click="toggleRepliesExpand(item.id)">
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

// 使用 emoji-picker 内置的默认表情集合，无需在此定义精简列表

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
        liked: false
      },
      {
        id: 11,
        nickname: '作者',
        content: '谢谢支持！😊',
        createdAt: '2024-10-01 13:00',
        location: '四川 成都',
        avatar: '',
        likes: 1,
        liked: false
      },
      {
        id: 11,
        nickname: '作者',
        content: '谢谢支持！😊',
        createdAt: '2024-10-01 13:00',
        location: '四川 成都',
        avatar: '',
        likes: 1,
        liked: false
      },
      {
        id: 11,
        nickname: '作者',
        content: '谢谢支持！😊',
        createdAt: '2024-10-01 13:00',
        location: '四川 成都',
        avatar: '',
        likes: 1,
        liked: false
      },
      {
        id: 11,
        nickname: '作者',
        content: '谢谢支持！😊',
        createdAt: '2024-10-01 13:00',
        location: '四川 成都',
        avatar: '',
        likes: 1,
        liked: false
      },
      {
        id: 11,
        nickname: '作者',
        content: '谢谢支持！😊',
        createdAt: '2024-10-01 13:00',
        location: '四川 成都',
        avatar: '',
        likes: 1,
        liked: false
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

const formatWebsite = website => {
  if (!website) {
    return ''
  }
  return /^https?:\/\//i.test(website) ? website : `https://${website}`
}

const replying = reactive({})
const replyContent = reactive({})
const repliesExpanded = reactive({})
const maxCollapsedReplies = 3

const toggleReply = id => {
  replying[id] = !replying[id]
  if (replying[id] && !replyContent[id]) {
    replyContent[id] = ''
  }
}

const insertReplyEmoji = (id, e) => {
  replyContent[id] = (replyContent[id] || '') + e
}

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
    liked: false
  }
  if (!Array.isArray(target.replies)) {
    target.replies = []
  }
  target.replies.unshift(newReply)
  replyContent[id] = ''
  replying[id] = false
  ElMessage.success('回复成功')
}

const onAddReply = (targetId, content) => {
  const target = findNodeById(messages.value, targetId)
  if (!target) {
    return
  }
  const newReply = {
    id: Date.now(),
    nickname: '我',
    avatar: '',
    content,
    createdAt: new Date().toLocaleString(),
    replies: [],
    likes: 0,
    liked: false
  }
  if (!Array.isArray(target.replies)) {
    target.replies = []
  }
  target.replies.unshift(newReply)
}

const findNodeById = (list, id) => {
  for (const item of list) {
    if (item.id === id) {
      return item
    }
    if (Array.isArray(item.replies) && item.replies.length) {
      const found = findNodeById(item.replies, id)
      if (found) {
        return found
      }
    }
  }
  return null
}

const toggleRepliesExpand = id => {
  repliesExpanded[id] = !repliesExpanded[id]
}

const getVisibleReplies = item => {
  if (!Array.isArray(item.replies)) {
    return []
  }
  if (repliesExpanded[item.id]) {
    return item.replies
  }
  return item.replies.slice(0, maxCollapsedReplies)
}

const toggleLikeMessage = id => {
  const target = messages.value.find(m => m.id === id)
  if (!target) {
    return
  }
  target.liked = !target.liked
  if (typeof target.likes !== 'number') {
    target.likes = 0
  }
  target.likes += target.liked ? 1 : -1
  if (target.likes < 0) {
    target.likes = 0
  }
}

const getMoreLabel = item => {
  return repliesExpanded[item.id] ? '收起' : `展开更多 ${item.replies.length - maxCollapsedReplies} 条`
}

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
      likes: 0,
      liked: false
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
