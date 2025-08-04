<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
    data-theme="dark"
  >
    <RouterView />
    <n-global-style />
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { darkTheme } from 'naive-ui'
import { lightThemeOverrides, darkThemeOverrides } from './utils/theme'

const theme = ref(darkTheme)
</script>
