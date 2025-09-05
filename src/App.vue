<!--
  根组件 - 应用程序入口
  提供 Element Plus 全局配置和路由容器
-->
<template>
  <el-config-provider>
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { useSettingStore } from './stores/modules/setting'

const settingStore = useSettingStore()

/**
 * 组件挂载后初始化主题
 * 根据存储的主题设置应用暗色模式
 */
onMounted(() => {
  if (settingStore.theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
})
</script>
