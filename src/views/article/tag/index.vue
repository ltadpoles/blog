<template>
  <div class="view">
    <div class="view-content">
      <div class="tag-list">
        <div
          class="tag-list-item"
          :class="{ 'tag-list-item-active': route.params.id === String(item.id) }"
          v-for="item in tagList"
          :key="item.id"
          @click="getTag(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <el-divider />
      <div class="tag-info">
        <div class="tag-info-left">{{ info.name }}</div>
        <div class="tag-info-right">{{ info.articleCount }}篇</div>
      </div>
      <article-list
        ref="articleRef"
        @statsTotal="
          val => {
            info.articleCount = val
          }
        "
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import articleList from '@/components/article/index.vue'
import { useRoute } from 'vue-router'
import { tagStatistics } from '@/api'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

let info = reactive({
  articleCount: 0,
  name: ''
})
const tagList = ref([])
const getTagStats = async () => {
  let { data } = await tagStatistics()
  let initInfo = {
    id: '',
    name: '全部',
    articleCount: info.articleCount
  }
  data.data.unshift(initInfo)
  tagList.value = data.data
  info = route.params.id
    ? Object.assign(
        {},
        tagList.value.find(item => item.id === Number(route.params.id))
      )
    : initInfo
}

const articleRef = ref(null)
const getTag = item => {
  router.push('/tag/' + item.id)
  info = Object.assign({}, item)
  articleRef.value.getList({ tags: item.id ? [item.id] : [] })
}

onMounted(() => {
  getTagStats()
  articleRef.value.getList({ tags: route.params.id ? [route.params.id] : [] })
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
