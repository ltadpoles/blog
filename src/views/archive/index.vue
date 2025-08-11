<template>
  <div class="view">
    <div class="view-content">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :hide-timestamp="true"
          placement="top"
          type="primary"
          size="large"
          :hollow="true"
        >
          <div class="time">{{ activity.timestamp }}</div>
          <div class="archive-list" v-for="item in activity.list" :key="item.time">
            <div class="archive-list-time">{{ item.time }}</div>
            <div class="archive-list-title" @click="getInfo">{{ item.title }}</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="view-sidebar hidden-mini">
      <user />
    </div>
  </div>
</template>

<script setup>
import user from '@/components/user/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activities = [
  {
    content: 'Event start',
    timestamp: '2018',
    list: [
      {
        time: '07-04',
        title: '这就是一个表土'
      },
      {
        time: '06-25',
        title: '这就是一个表土21321312'
      }
    ]
  },
  {
    content: 'Approved',
    timestamp: '2018',
    list: [
      {
        time: '07-04',
        title: '这就是一个表土'
      },
      {
        time: '06-25',
        title: '这就是一个表土21321312'
      }
    ]
  }
]

const getInfo = () => {
  router.push('/article/1')
}
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
