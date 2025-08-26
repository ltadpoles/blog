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
import { ref, reactive, onMounted, nextTick } from 'vue'
import EmojiPicker from '@/components/emoji-picker/index.vue'
import { addBoard } from '@/api/board'
import { useUserStore } from '@/stores/modules/user'
import { ElNotification } from 'element-plus'

const userStore = useUserStore()

const props = defineProps({
  parentId: { type: Number, default: 0 },
  rows: { type: Number, default: 5 },
  loading: { type: Boolean, default: false }
})

const formRef = ref(null)
const textareaRef = ref(null)
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
    let { data } = await addBoard({ ...userStore.message, ...localForm, parentId: props.parentId })

    userStore.setMessage({
      ...data.data,
      email: localForm.email,
      name: localForm.name,
      website: localForm.website
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
