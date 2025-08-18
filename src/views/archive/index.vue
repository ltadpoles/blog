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
          <div class="time">{{ activity.year }}</div>
          <div class="archive-list" v-for="item in activity.list" :key="item.id">
            <div class="archive-list-time">{{ dayjs(item.createTime).format('MM-DD') }}</div>
            <div class="archive-list-title" @click="getInfo(item.id)">{{ item.title }}</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { articleArchive } from '@/api/article'
import { dayjs } from 'element-plus'

const router = useRouter()

const activities = ref([])

const getInfo = id => {
  router.push(`/article/${id}`)
}

const getArchiveList = async () => {
  let { data } = await articleArchive()
  activities.value = data.data
}

onMounted(() => {
  getArchiveList()
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
