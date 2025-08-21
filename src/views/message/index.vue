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

        <el-form ref="formRef" :model="form" :rules="rules" label-width="0">
          <div class="form-row">
            <el-form-item prop="nickname" class="form-col">
              <el-input v-model="form.nickname" placeholder="昵称（必填）" maxlength="30" show-word-limit />
            </el-form-item>

            <el-form-item prop="email" class="form-col">
              <el-input v-model="form.email" placeholder="邮箱（可选）" />
            </el-form-item>

            <el-form-item prop="website" class="form-col">
              <el-input v-model="form.website" placeholder="网站（可选）" />
            </el-form-item>
          </div>

          <el-form-item prop="content" class="content-field">
            <el-input
              v-model="form.content"
              type="textarea"
              :rows="5"
              maxlength="500"
              show-word-limit
              placeholder="留言内容（必填，支持 Emoji）"
            />
            <el-popover placement="bottom" width="260" trigger="click">
              <template #reference>
                <el-button link type="primary" class="emoji-trigger">😀</el-button>
              </template>
              <div class="emoji-box">
                <span class="emoji-item" v-for="e in emojiList" :key="e" @click="insertEmoji(e)">{{ e }}</span>
              </div>
            </el-popover>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :loading="submitting" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-header-left">
            <SvgIcon name="more" />
            <span>留言列表</span>
          </div>
        </div>
        <el-divider />

        <div class="message-list">
          <div class="message-item" v-for="item in messages" :key="item.id">
            <div class="message-item-header">
              <div class="message-header-left">
                <el-avatar class="message-avatar" :src="item.avatar || defaultAvatar" :size="32" />
                <div class="message-nickname">
                  <a v-if="item.website" :href="formatWebsite(item.website)" target="_blank" rel="noopener">
                    {{ item.nickname }}
                  </a>
                  <span v-else>{{ item.nickname }}</span>
                </div>
              </div>
              <div class="message-time">{{ item.createdAt }}</div>
            </div>
            <div class="message-content">{{ item.content }}</div>
            <div class="message-actions">
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

              <el-popover placement="bottom" width="260" trigger="click">
                <template #reference>
                  <el-button link type="primary" class="emoji-trigger">😀</el-button>
                </template>
                <div class="emoji-box">
                  <span class="emoji-item" v-for="e in emojiList" :key="e" @click="insertReplyEmoji(item.id, e)">
                    {{ e }}
                  </span>
                </div>
              </el-popover>

              <div class="reply-actions">
                <el-button size="small" type="primary" @click="submitReply(item.id)">提交回复</el-button>
                <el-button size="small" @click="toggleReply(item.id)">取消</el-button>
              </div>
            </div>

            <div v-if="item.replies && item.replies.length" class="reply-list">
              <ReplyItem
                v-for="rep in item.replies"
                :key="rep.id"
                :node="rep"
                :emoji-list="emojiList"
                @add-reply="onAddReply"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.jpg'

const formRef = ref(null)
const submitting = ref(false)

const form = reactive({
  nickname: '',
  email: '',
  website: '',
  content: ''
})

const validateContent = (rule, value, callback) => {
  if (!value || !value.trim()) {
    return callback(new Error('请输入留言内容'))
  }
  if (value.length < 2) {
    return callback(new Error('留言内容至少 2 个字符'))
  }
  callback()
}

const rules = {
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
  website: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback()
        }
        try {
          // 允许用户输入不带协议的域名，这里做宽松校验
          const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
          new URL(withProtocol)
          callback()
        } catch {
          callback(new Error('网址格式不正确'))
        }
      },
      trigger: 'blur'
    }
  ],
  content: [{ required: true, validator: validateContent, trigger: 'change' }]
}

const emojiList = ['😀', '😁', '😂', '🤣', '😊', '😍', '🤔', '👍', '🎉', '🔥', '🌟', '💡', '🚀', '🙏', '🙌', '😎']

const insertEmoji = e => {
  form.content += e
}

const messages = ref([
  {
    id: 1,
    nickname: '小明',
    website: 'https://example.com',
    content: '博客很棒！🚀',
    createdAt: '2024-10-01 12:30',
    avatar: '',
    replies: [
      {
        id: 11,
        nickname: '作者',
        content: '谢谢支持！😊',
        createdAt: '2024-10-01 13:00',
        avatar: ''
      }
    ]
  },
  {
    id: 2,
    nickname: 'Alice',
    website: '',
    content: '学到了很多，感谢分享！🎉',
    createdAt: '2024-10-02 09:20',
    avatar: '',
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
    createdAt: new Date().toLocaleString()
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
    replies: []
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

const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) {
      return
    }
    submitting.value = true
    try {
      // 使用本地模拟数据，直接更新列表
      const newItem = {
        id: Date.now(),
        nickname: form.nickname,
        website: form.website,
        content: form.content,
        createdAt: new Date().toLocaleString()
      }
      messages.value.unshift(newItem)
      ElMessage.success('留言成功')
      handleReset()
    } catch {
      // 错误提示已在拦截器处理，这里无需重复提示
    } finally {
      submitting.value = false
    }
  })
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
.emoji-trigger {
  position: absolute;
  right: 8px;
  bottom: 8px;
}

.emoji-box {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 240px;
}

.emoji-item {
  cursor: pointer;
  font-size: 20px;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  padding: 6px 0;
  border-bottom: 1px dashed var(--el-border-color);
}

.message-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}

.message-nickname a {
  color: var(--el-color-primary);
}

.message-time {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.message-content {
  white-space: pre-wrap;
  line-height: 1.7;
}

.message-actions {
  margin-top: 6px;
}

.reply-box {
  position: relative;
  margin-top: 10px;
}

.reply-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.reply-list {
  margin-top: 10px;
  padding-left: 12px;
  border-left: 2px solid var(--el-border-color-light);
}

.reply-item {
  padding: 6px 0;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.reply-nickname {
  color: var(--el-color-primary);
}

.reply-content {
  white-space: pre-wrap;
  line-height: 1.6;
}

.content-field {
  position: relative;
}

.form-row {
  display: flex;
  gap: 10px;
}

.form-col {
  flex: 1;
}

@media screen and (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
