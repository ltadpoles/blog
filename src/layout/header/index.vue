<template>
  <header class="header">
    <div class="header-left hidden-mini">
      <SvgIcon name="logo" width="2.2rem" height="2.2rem" />
      <h1 class="header-logo-title">游荡de蝌蚪</h1>
    </div>

    <div class="header-menu hidden-mini">
      <div class="header-menu-item">
        <SvgIcon name="home" />
        <span>首页</span>
      </div>
      <div class="header-menu-item">
        <SvgIcon name="archive" />
        <span>归档</span>
      </div>
      <div class="header-menu-item">
        <SvgIcon name="about" />
        <span>关于</span>
      </div>
    </div>

    <SvgIcon class="hidden" name="catalogue" width="2rem" height="2rem" @click="themeChange" />

    <h1 class="hidden">游荡de蝌蚪</h1>

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
import { useSettingStore } from '@/stores/modules/setting'

const settingStore = useSettingStore()

const themeChange = theme => {
  settingStore.setTheme(theme)
  document.documentElement.classList.toggle('dark')
}
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
