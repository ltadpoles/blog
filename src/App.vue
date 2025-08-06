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

onMounted(() => {
  if (settingStore.theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
})
</script>
