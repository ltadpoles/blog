<script setup></script>

<template>
  <main>
    首页<n-button>Default</n-button>
    <n-button type="tertiary" @click="getMessage"> Tertiary </n-button>
    <n-button type="primary"> Primary </n-button>
    <n-button type="info"> Info </n-button>

    <n-popselect v-model:value="value" :options="options" trigger="click">
      <n-button>{{ value || '弹出选择' }}</n-button>
    </n-popselect>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { createDiscreteApi } from 'naive-ui'
const { message } = createDiscreteApi(['message'])

const value = ref('Drive My Car')
const options = [
  {
    label: 'Drive My Car',
    value: 'Drive My Car'
  },
  {
    label: 'Norwegian Wood',
    value: 'Norwegian Wood'
  },
  {
    label: "You Won't See",
    value: "You Won't See",
    disabled: true
  },
  {
    label: 'Nowhere Man',
    value: 'Nowhere Man'
  },
  {
    label: 'Think For Yourself',
    value: 'Think For Yourself'
  },
  {
    label: 'The Word',
    value: 'The Word'
  },
  {
    label: 'Michelle',
    value: 'Michelle',
    disabled: true
  },
  {
    label: 'What goes on',
    value: 'What goes on'
  },
  {
    label: 'Girl',
    value: 'Girl'
  },
  {
    label: "I'm looking through you",
    value: "I'm looking through you"
  },
  {
    label: 'In My Life',
    value: 'In My Life'
  },
  {
    label: 'Wait',
    value: 'Wait'
  }
]

const getMessage = () => {
  message.success('成功了')
}
</script>
