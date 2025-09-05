<!--
  布局组件 - 整体页面结构
  包含头部、主内容区域、底部和返回顶部按钮
  支持路由切换动画和滚动监听
-->
<template>
  <div class="layout">
    <!-- 加载状态 -->
    <div v-if="isInitializing" class="layout-loading">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">正在加载网站信息...</div>
      </div>
    </div>

    <!-- 主要内容 -->
    <template v-else>
      <!-- 页面头部 -->
      <layout-header />

      <!-- 主内容区域 -->
      <div class="layout-main">
        <div class="layout-main-content">
          <!-- 路由出口，支持切换动画 -->
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>

      <!-- 页面底部 -->
      <layout-footer />

      <!-- 返回顶部按钮 -->
      <SvgIcon
        name="scrollTop"
        width="50px"
        height="50px"
        class="scroll-top"
        v-show="isShowScrollTop"
        @click="scrollToTop"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import layoutHeader from './header/index.vue'
import layoutFooter from './footer/index.vue'
import { countArticlesByType, websiteInfo } from '@/api'
import { useWebsiteStore } from '@/stores/modules/website'

const websiteStore = useWebsiteStore()

// 初始化状态
const isInitializing = ref(true)
// 返回顶部按钮显示状态
const isShowScrollTop = ref(false)

/**
 * 获取网站信息
 */
const getWebsiteInfo = async () => {
  try {
    const { data } = await websiteInfo()
    websiteStore.setInfo(data.data)
  } catch {
    // 获取网站信息失败，使用默认值或空值
  }
}

/**
 * 获取文章/分类/标签统计
 */
const getArticleStats = async () => {
  try {
    const { data } = await countArticlesByType()
    websiteStore.setArticleStats(data.data)
  } catch {
    // 获取文章统计失败，使用默认值或空值
  }
}

/**
 * 初始化网站数据
 */
const initializeWebsite = async () => {
  try {
    isInitializing.value = true
    // 并行获取网站信息和文章统计
    await Promise.all([getWebsiteInfo(), getArticleStats()])
  } catch {
    // 初始化网站数据失败
  } finally {
    isInitializing.value = false
  }
}

/**
 * 返回顶部功能
 * 平滑滚动到页面顶部
 */
const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/**
 * 滚动监听器
 * 滚动超过 10px 时显示返回顶部按钮
 */
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop
  if (scrollTop > 10) {
    isShowScrollTop.value = true
  } else {
    isShowScrollTop.value = false
  }
}

// 组件生命周期管理
onMounted(async () => {
  // 初始化网站数据
  await initializeWebsite()

  // 添加滚动监听
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
