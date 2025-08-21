<template>
  <div class="reply-item">
    <div class="reply-header">
      <el-avatar class="reply-avatar" :src="node.avatar || defaultAvatar" :size="24" />
      <span class="reply-nickname">{{ node.nickname }}</span>
      <span class="reply-time">{{ node.createdAt }}</span>
      <el-button link type="primary" class="reply-action" @click="toggle">回复</el-button>
    </div>
    <div class="reply-content">{{ node.content }}</div>

    <div v-if="isReplying" class="reply-box reply-content-field">
      <el-input v-model="text" type="textarea" :rows="3" :maxlength="300" show-word-limit placeholder="回复内容" />
      <el-popover placement="bottom" width="260" trigger="click">
        <template #reference>
          <el-button link type="primary" class="reply-emoji-trigger">😀</el-button>
        </template>
        <div class="emoji-box">
          <span class="emoji-item" v-for="e in emojiList" :key="e" @click="insert(e)">{{ e }}</span>
        </div>
      </el-popover>
      <div class="reply-actions">
        <el-button size="small" type="primary" @click="submit">提交回复</el-button>
        <el-button size="small" @click="toggle">取消</el-button>
      </div>
    </div>

    <div v-if="Array.isArray(node.replies) && node.replies.length" class="reply-list">
      <ReplyItem
        v-for="child in node.replies"
        :key="child.id"
        :node="child"
        :emoji-list="emojiList"
        @add-reply="(id, content) => emit('add-reply', id, content)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import defaultAvatar from '@/assets/images/avatar.jpg'

const props = defineProps({
  node: { type: Object, required: true },
  emojiList: { type: Array, default: () => [] }
})
const emit = defineEmits(['add-reply'])

const isReplying = ref(false)
const text = ref('')

const toggle = () => {
  isReplying.value = !isReplying.value
}

const insert = e => {
  text.value += e
}

const submit = () => {
  const content = text.value.trim()
  if (!content) {
    ElMessage.warning('请输入回复内容')
    return
  }
  emit('add-reply', props.node.id, content)
  text.value = ''
  isReplying.value = false
  ElMessage.success('回复成功')
}
</script>

<style scoped>
.reply-action {
  margin-left: 6px;
}
</style>
