<template>
  <div class="view">
    <div class="view-content">
      <div class="category-list">
        <div
          class="category-list-item"
          :class="{ 'category-list-item-active': route.params.id === String(item.id) }"
          v-for="item in categoryList"
          :key="item.id"
          @click="getCategory(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <el-divider />
      <div class="category-info">
        <div class="category-info-left">{{ info.name }}</div>
        <div class="category-info-right">{{ info.articleCount }}篇</div>
      </div>
      <article-list ref="articleRef" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import articleList from '@/components/article/index.vue'
import { useRoute } from 'vue-router'
import { categoryStatistics } from '@/api'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

let info = reactive({
  articleCount: 0,
  name: ''
})
const categoryList = ref([])
const getCategoryStats = async () => {
  let { data } = await categoryStatistics()
  let initInfo = {
    id: '',
    articleCount: data.data.reduce((sum, item) => sum + item.articleCount, 0),
    name: '全部'
  }
  data.data.unshift(initInfo)
  categoryList.value = data.data
  info = route.params.id
    ? Object.assign(
        {},
        categoryList.value.find(item => item.id === Number(route.params.id))
      )
    : initInfo
}

const articleRef = ref(null)
const getCategory = item => {
  router.push('/category/' + item.id)
  info = Object.assign({}, item)
  articleRef.value.getList({ category: item.id })
}

onMounted(() => {
  getCategoryStats()
  articleRef.value.getList({ category: route.params.id })
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
