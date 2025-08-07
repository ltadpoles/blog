<template>
  <div class="layout">
    <layout-header />
    <div class="layout-main">
      <div class="layout-main-content">
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <layout-footer />

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

const isShowScrollTop = ref(false)

const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop
  if (scrollTop > 10) {
    isShowScrollTop.value = true
  } else {
    isShowScrollTop.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
