<template>
  <header class="header">
    <div class="header-left hidden-mini" @click="toLink('/', 0)">
      <SvgIcon name="logo" width="2.2rem" height="2.2rem" />
      <h1 class="header-logo-title">{{ userStore.user.name }}</h1>
    </div>

    <div class="header-menu hidden-mini">
      <div
        class="header-menu-item"
        :class="activeIndex === index ? 'header-menu-item-active' : ''"
        v-for="(item, index) in menuList"
        :key="item.path"
        @click="toLink(item.path, index)"
      >
        <SvgIcon :name="item.icon" />
        <span>{{ item.name }}</span>
      </div>
    </div>

    <el-dropdown trigger="click" class="hidden hidden-large" @command="command">
      <SvgIcon name="catalogue" width="2rem" height="2rem" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            :command="index"
            class="dropdown-menu-item"
            v-for="(item, index) in menuList"
            :key="item.path"
          >
            <SvgIcon :name="item.icon" />
            <span>{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <h1 class="hidden hidden-large" @click="toLink('/', 0)">{{ userStore.user.name }}</h1>

    <div class="header-right">
      <transition name="theme">
        <SvgIcon
          v-if="settingStore.theme === 'light'"
          name="sun"
          width="2rem"
          height="2rem"
          @click="themeChange('dark')"
        />
        <SvgIcon v-else name="moon" width="2rem" height="2rem" @click="themeChange('light')" />
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSettingStore } from '@/stores/modules/setting'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

const settingStore = useSettingStore()
const userStore = useUserStore()

const themeChange = theme => {
  settingStore.setTheme(theme)
  document.documentElement.classList.toggle('dark')
}

const router = useRouter()
const route = useRoute()
const menuList = [
  { path: '/', name: '首页', icon: 'home' },
  { path: '/archive', name: '归档', icon: 'archive' },
  { path: '/about', name: '关于', icon: 'about' }
]
const activeIndex = ref(0)

const toLink = (path, index) => {
  activeIndex.value = index
  router.push(path)
}
const command = i => {
  const path = menuList.find((item, index) => index === i).path
  activeIndex.value = i
  router.push(path)
}

onMounted(() => {
  activeIndex.value = menuList.findIndex(menu => menu.path === route.path)
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
