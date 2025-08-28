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
        ref="textareaRef"
        v-model="localForm.content"
        type="textarea"
        :rows="rows"
        resize="none"
        maxlength="500"
        :placeholder="getPlaceholder()"
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
import { ref, reactive, onMounted, nextTick } from 'vue'
import EmojiPicker from '@/components/emoji-picker/index.vue'
import { addBoard } from '@/api/board'
import { useUserStore } from '@/stores/modules/user'
import { ElNotification } from 'element-plus'
import { xssUtils } from '@/utils'

const userStore = useUserStore()

const props = defineProps({
  parentId: { type: Number, default: 0 },
  rows: { type: Number, default: 5 },
  loading: { type: Boolean, default: false },
  replyToUserName: { type: String, default: '' }
})

const formRef = ref(null)
const textareaRef = ref(null)
const localForm = reactive({ name: '', email: '', website: '', content: '' })

const validateContent = (rule, value, callback) => {
  if (!value || !String(value).trim()) {
    return callback(new Error('请输入留言内容'))
  }

  // XSS防护验证
  const validation = xssUtils.validateInput(value)
  if (!validation.isValid) {
    return callback(new Error(validation.message))
  }

  callback()
}

const validateName = (rule, value, callback) => {
  if (!value || !String(value).trim()) {
    return callback(new Error('请输入昵称'))
  }

  // XSS防护验证
  const validation = xssUtils.validateInput(value)
  if (!validation.isValid) {
    return callback(new Error(validation.message))
  }

  callback()
}

const validateEmail = (rule, value, callback) => {
  if (!value) {
    return callback()
  }

  // 邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return callback(new Error('邮箱格式不正确'))
  }

  // XSS防护验证
  const validation = xssUtils.validateInput(value)
  if (!validation.isValid) {
    return callback(new Error(validation.message))
  }

  callback()
}

const validateWebsite = (rule, value, callback) => {
  if (!value) {
    return callback()
  }

  // XSS防护验证
  const validation = xssUtils.validateInput(value)
  if (!validation.isValid) {
    return callback(new Error(validation.message))
  }

  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
    new URL(withProtocol)
    callback()
  } catch {
    callback(new Error('网址格式不正确'))
  }
}

const rules = {
  name: [{ required: true, validator: validateName, trigger: 'blur' }],
  email: [{ validator: validateEmail, trigger: 'blur' }],
  website: [{ validator: validateWebsite, trigger: 'blur' }],
  content: [{ required: true, validator: validateContent, trigger: 'blur' }]
}

const appendEmoji = e => {
  localForm.content += e
}

const getPlaceholder = () => {
  if (props.replyToUserName) {
    return `回复 ${props.replyToUserName}...`
  }
  return '留言内容（必填，支持 Emoji）'
}

const onSubmit = () => {
  formRef.value?.validate(async valid => {
    if (!valid) {
      return
    }

    // 对提交的数据进行XSS防护处理
    const sanitizedData = {
      ...userStore.message,
      name: xssUtils.sanitize(localForm.name),
      email: xssUtils.sanitize(localForm.email),
      website: xssUtils.sanitize(localForm.website),
      content: xssUtils.sanitize(localForm.content),
      parentId: props.parentId,
      replyToUserName: xssUtils.sanitize(props.replyToUserName)
    }

    let { data } = await addBoard(sanitizedData)

    userStore.setMessage({
      ...data.data,
      email: sanitizedData.email,
      name: sanitizedData.name,
      website: sanitizedData.website
    })

    // 如果是回复，传递父级ID；如果是主留言，不传递参数
    if (props.parentId) {
      emit('submit', props.parentId)
    } else {
      emit('submit')
    }

    ElNotification({
      message: '留言成功',
      type: 'success'
    })
    reset()
  })
}

const emit = defineEmits(['submit'])

// 暴露给父组件的方法
const focus = () => {
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.focus()
    }
  })
}

const reset = () => {
  Object.assign(localForm, { ...userStore.message })
  localForm.content = ''
}

onMounted(() => {
  Object.assign(localForm, { ...userStore.message })

  // 如果是回复组件，自动获取焦点
  if (props.parentId) {
    nextTick(() => {
      setTimeout(() => {
        if (textareaRef.value) {
          textareaRef.value.focus()
        }
      }, 100)
    })
  }
})

// 暴露方法给父组件
defineExpose({
  focus
})
</script>

<style lang="scss">
@use './index.scss' as *;
</style>
