<template>
  <el-config-provider>
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
// import { ref } from 'vue'
// import zhCN from 'element-plus/dist/locale/zh-cn'
// import en from 'element-plus/dist/locale/en'

// let locale = ref(zhCN)
</script>
