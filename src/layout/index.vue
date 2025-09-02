<!--
  布局组件 - 整体页面结构
  包含头部、主内容区域、底部和返回顶部按钮
  支持路由切换动画和滚动监听
-->
<template>
  <div class="layout">
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import layoutHeader from './header/index.vue'
import layoutFooter from './footer/index.vue'
import { useUserStore } from '@/stores/modules/user'
import { websiteInfo } from '@/api'

// 返回顶部按钮显示状态
const isShowScrollTop = ref(false)

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

/**
 * 获取用户信息
 * 页面初始化时获取用户数据并存储到 store
 */
const userStore = useUserStore()
const getWebSiteInfo = async () => {
  let { data } = await websiteInfo()
  userStore.setWebsite(data.data)
}

// 组件生命周期管理
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  getWebSiteInfo()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
