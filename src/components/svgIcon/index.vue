<!--
  SVG 图标组件
  统一管理项目中的 SVG 图标资源
  支持自定义尺寸、颜色、间距等样式
-->
<template>
  <svg
    aria-hidden="false"
    class="svg-icon"
    :style="{ marginRight: marginRight, cursor: cursor, minWidth: width, minHeight: height }"
    :width="width"
    :height="height"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

/**
 * SVG 图标组件属性定义
 */
const props = defineProps({
  // 图标前缀，默认为 'icon'
  prefix: {
    type: String,
    default: 'icon'
  },
  // 图标名称（必填）
  name: {
    type: String,
    required: true
  },
  // 图标颜色
  color: {
    type: String,
    default: 'currentcolor'
  },
  // 图标宽度
  width: {
    type: String,
    default: '0.85rem'
  },
  // 图标高度
  height: {
    type: String,
    default: '0.85rem'
  },
  // 右侧间距
  marginRight: {
    type: String,
    default: '0px'
  },
  // 鼠标样式
  cursor: {
    type: String,
    default: 'pointer'
  }
})

/**
 * 生成 SVG symbol ID
 * 格式：#prefix-name
 */
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
