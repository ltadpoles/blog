<template>
  <div class="article">
    <div class="article-item" v-for="article in list" :key="article.id">
      <div class="article-content">
        <div class="article-image hidden-large">
          <img src="@/assets/images/image.png" alt="" />
        </div>
        <div class="article-main">
          <div class="article-content-title">
            <div class="article-content-title-top" v-if="article.top === '1'">
              <span>置顶</span>
            </div>
            <h1>{{ article.title }}</h1>
          </div>
          <div class="article-content-description">
            <el-text line-clamp="3">
              {{ article.description }}
            </el-text>
          </div>
        </div>
        <div class="article-image hidden hidden-mini">
          <img src="@/assets/images/image.png" alt="" />
        </div>
      </div>
      <el-divider />
      <div class="article-content-footer">
        <div class="article-content-footer-left">
          <SvgIcon name="calendar" />
          <span>{{ dayjs(article.createTime).format('YYYY-MM-DD') }}</span>
        </div>
        <div class="article-content-footer-right">{{ article.category[0]?.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { articlepage } from '@/api/article'
import { dayjs } from 'element-plus'

const list = ref([])
let query = reactive({
  page: 1,
  pageSize: 10
})
const getList = async () => {
  let { data } = await articlepage(query)
  list.value = data.data.list
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
