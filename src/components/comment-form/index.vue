<template>
  <el-form ref="formRef" :model="localForm" :rules="rules" label-width="0">
    <div class="form-row">
      <el-form-item prop="nickname" class="form-col">
        <el-input v-model="localForm.nickname" placeholder="昵称（必填）" maxlength="30" show-word-limit />
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
        :rows="5"
        maxlength="500"
        show-word-limit
        placeholder="留言内容（必填，支持 Emoji）"
      />
      <emoji-picker :emoji-list="emojiList" @select="appendEmoji" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="onSubmit">提交</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import EmojiPicker from '@/components/emoji-picker/index.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ nickname: '', email: '', website: '', content: '' })
  },
  loading: { type: Boolean, default: false },
  emojiList: { type: Array, default: null }
})

const emit = defineEmits(['update:modelValue', 'submit', 'reset'])

const formRef = ref(null)
const localForm = reactive({ nickname: '', email: '', website: '', content: '' })

watch(
  () => props.modelValue,
  val => {
    Object.assign(localForm, val || { nickname: '', email: '', website: '', content: '' })
  },
  { immediate: true, deep: true }
)

watch(
  localForm,
  val => {
    emit('update:modelValue', { ...val })
  },
  { deep: true }
)

const validateContent = (rule, value, callback) => {
  if (!value || !String(value).trim()) {
    return callback(new Error('请输入留言内容'))
  }
  if (String(value).length < 2) {
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

const appendEmoji = e => {
  localForm.content += e
}

const onSubmit = () => {
  formRef.value?.validate(valid => {
    if (!valid) {
      return
    }
    emit('submit', { ...localForm })
  })
}

const onReset = () => {
  Object.assign(localForm, { nickname: '', email: '', website: '', content: '' })
  formRef.value?.clearValidate()
  emit('reset')
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
