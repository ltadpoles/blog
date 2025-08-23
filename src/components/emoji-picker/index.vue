<template>
  <el-popover placement="bottom" width="380" trigger="click" popper-class="emoji-popper">
    <template #reference>
      <el-button link type="primary">😀</el-button>
    </template>
    <div class="emoji-container">
      <div class="emoji-tabs">
        <el-tabs v-model="activeTab" stretch class="emoji-tab-group">
          <el-tab-pane v-for="(list, key) in groupedEmojis" :key="key" :label="key" :name="key">
            <div class="emoji-box">
              <button class="emoji-item" v-for="e in list" :key="e" type="button" @click="$emit('select', e)">
                {{ e }}
              </button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
import { computed, ref } from 'vue'

// 三个分组：情感 | 手势 | 物件 (使用emoji作为标签)
const groups = {
  '😀': [
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
    '👽'
  ],
  '👋': [
    // 手势
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
    '💪'
  ],
  '❤️': [
    // 心形
    '❤️',
    '🧡',
    '💛',
    '💚',
    '💙',
    '💜',
    '🖤',
    '💔'
  ]
}

const groupedEmojis = computed(() => groups)
const activeTab = ref('😀') // 默认选中表情分组
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
