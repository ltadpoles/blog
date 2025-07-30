<template>
  <div>
    <n-space vertical>
      <n-qr-code :value="text" />
      <n-input v-model:value="text" :maxlength="60" type="text" />
    </n-space>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('雨淋湿了天空')
</script>

<style lang="scss" scoped></style>
