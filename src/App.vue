<template>
  <n-config-provider
    :theme="theme === 'dark' ? darkTheme : null"
    :theme-overrides="theme === 'dark' ? darkThemeOverrides : lightThemeOverrides"
    :data-theme="theme"
  >
    <RouterView />
    <n-global-style />
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { darkTheme } from 'naive-ui'
import { lightThemeOverrides, darkThemeOverrides } from './utils/theme'
import { useSettingStore } from './stores/modules/setting'

const settingStore = useSettingStore()

const theme = computed(() => settingStore.theme)
</script>
