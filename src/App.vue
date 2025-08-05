<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { computed } from 'vue'
import zhCN from 'element-plus/dist/locale/zh-cn'

let locale = computed(() => zhCN)
</script>
