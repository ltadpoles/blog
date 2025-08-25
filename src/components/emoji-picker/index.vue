<template>
  <el-popover placement="bottom" width="380" trigger="click" popper-class="emoji-popper">
    <template #reference>
      <SvgIcon name="emote" width="1.2rem" height="1.2rem" />
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
const groupedEmojis = [
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
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
