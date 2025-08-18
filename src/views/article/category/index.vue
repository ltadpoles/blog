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
  name: '',
  id: ''
})
const categoryList = ref([])
const getCategoryStats = async () => {
  let { data } = await categoryStatistics()
  categoryList.value = [{ name: '全部', id: '', articleCount: 0 }, ...data.data]
  getList(categoryList.value.find(item => String(item.id) === route.params.id))
}

const articleRef = ref(null)
const getCategory = item => {
  router.push('/category/' + item.id)
  getList(item)
}

const getList = item => {
  articleRef.value.getList({ category: item.id }).then(total => {
    info.articleCount = total
    info.name = item.name
    info.id = item.id
  })
}

onMounted(() => {
  getCategoryStats()
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
