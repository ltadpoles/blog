<template>
  <el-popover placement="bottom" width="380" trigger="click" popper-class="emoji-popper">
    <template #reference>
      <el-button link type="primary">😀</el-button>
    </template>
    <div class="emoji-container">
      <div class="emoji-box">
        <button class="emoji-item" v-for="e in groupedEmojis" :key="e" type="button" @click="$emit('select', e)">
          {{ e }}
        </button>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
import { computed } from 'vue'

const groups = [
  // 表情
  '😄',
  '😁',
  '😆',
  '😊',
  '🙂',
  '😉',
  '🤩',
  '🥳',
  '🥰',
  '😍',
  '😘',
  '😗',
  '😚',
  '🤗',
  '😎',
  '🤓',
  '🥺',
  '🤠',
  '😡',
  '😠',
  '🤬',
  '😤',
  '😢',
  '😭',
  '🥲',
  '😟',
  '😣',
  '🤧',
  '😱',
  '😨',
  '😰',
  '😥',
  '😓',
  '😖',
  '😞',
  '🤯',
  '😱',
  '😳',
  '😧',
  '😲',
  '😵',
  '😴',
  '🤤',
  '😪',
  '🥱',
  '🥴',
  '🤮',
  '🤢',
  '😷',
  '🤒',
  '🤕',
  '👿',
  '💀',
  '👻',
  '💩',
  '🤖',
  '👽',
  '👊',
  '👏',
  '🤝',
  '👍',
  '👎',
  '🙌',
  '🤲',
  '👐',
  '💅',
  '🤳',
  '💪',
  '❤️',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '🖤',
  '💔'
]

const groupedEmojis = computed(() => groups)
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
