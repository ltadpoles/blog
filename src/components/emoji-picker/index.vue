<template>
  <el-popover placement="bottom" width="380" trigger="click" popper-class="emoji-popper">
    <template #reference>
      <el-button link type="primary" class="emoji-trigger">😀</el-button>
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
    '😀',
    '😃',
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
    '😮',
    '😧',
    '😲',
    '😦',
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
.emoji-container {
  background: #ffffff; /* 纯白色背景 */
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.emoji-tab-group {
  background: #f9f9f9;
  padding: 6px 10px 0;
}

:deep(.el-tabs__nav-wrap::after) {
  display: none; /* 去除底部边框 */
}

:deep(.el-tabs__item) {
  font-size: 24px; /* 增大标签表情大小 */
  padding: 0 12px !important;
  transition: all 0.2s;
  border-radius: 4px 4px 0 0;

  &.is-active {
    background: #fff;
  }

  &:hover {
    background: #f0f0f0;
  }
}

.emoji-box {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  padding: 12px;
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #d0d0d0;
  }
}

.emoji-item {
  font-size: 28px; /* 增大表情大小 */
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%; /* 圆形设计 */
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  /* 模拟黄色背景效果 */
  background: linear-gradient(145deg, #fff9d0, #ffeb3b);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: scale(1.25); /* 悬停放大 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }

  &:active {
    transform: scale(1.15);
  }
}

.emoji-trigger {
  font-size: 22px;
  padding: 6px 10px;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
