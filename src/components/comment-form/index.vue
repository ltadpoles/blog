<template>
  <el-form ref="formRef" :model="localForm" :rules="rules" label-width="0">
    <div class="form-row">
      <el-form-item prop="name" class="form-col">
        <el-input v-model="localForm.name" placeholder="昵称（必填）" maxlength="30" show-word-limit />
      </el-form-item>

      <el-form-item prop="email" class="form-col">
        <el-input v-model="localForm.email" placeholder="邮箱（可选）" />
      </el-form-item>

      <el-form-item prop="website" class="form-col">
        <el-input v-model="localForm.website" placeholder="网站（可选）" />
      </el-form-item>
    </div>

    <el-form-item prop="content" class="content-field">
      <el-input
        v-model="localForm.content"
        type="textarea"
        :rows="rows"
        resize="none"
        maxlength="500"
        placeholder="留言内容（必填，支持 Emoji）"
      />
      <div class="form-wrapper">
        <emoji-picker @select="appendEmoji" />
        <div class="form-btn">
          <span>{{ localForm.content.length }} / 500</span>
          <el-button type="primary" :loading="loading" @click="onSubmit" :disabled="!localForm.content">提交</el-button>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import EmojiPicker from '@/components/emoji-picker/index.vue'
import { addBoard } from '@/api/board'

defineProps({
  rows: { type: Number, default: 5 },
  loading: { type: Boolean, default: false }
})

const formRef = ref(null)
const localForm = reactive({ name: '', email: '', website: '', content: '' })

const validateContent = (rule, value, callback) => {
  if (!value || !String(value).trim()) {
    return callback(new Error('请输入留言内容'))
  }
  callback()
}

const rules = {
  name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
  website: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback()
        }
        try {
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
  content: [{ required: true, validator: validateContent, trigger: 'blur' }]
}

const appendEmoji = e => {
  localForm.content += e
}

const onSubmit = () => {
  formRef.value?.validate(async valid => {
    if (!valid) {
      return
    }
    await addBoard({ ...localForm })

    reset()
  })
}

const reset = () => {
  Object.assign(localForm, { name: '', email: '', website: '', content: '' })
  formRef.value?.clearValidate()
}
</script>

<style lang="scss">
@use './index.scss' as *;
</style>
