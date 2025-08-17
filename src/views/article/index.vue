<template>
  <div class="view">
    <div class="view-content">
      <h1 class="article-title">{{ info.title }}</h1>
      <div class="article-info">
        <div class="article-info-left">
          <SvgIcon name="calendar" />
          <span>{{ dayjs(info.createTime).format('YYYY-MM-DD') }}</span>
        </div>
        <div class="article-info-right">{{ info.category[0]?.name }}</div>
      </div>
      <el-divider />
      <div class="article-content">
        <MdPreview :theme="settingStore.theme" :modelValue="info.content" @onGetCatalog="onGetCatalog" />
      </div>
      <el-divider />
      <div class="article-tags">
        <SvgIcon name="tag" />
        <el-tag type="primary" v-for="tag in info.tag" :key="tag.id">{{ tag.name }}</el-tag>
      </div>
    </div>
    <div class="view-sidebar hidden-mini">
      <el-affix :offset="64">
        <div class="card">
          <div class="card-header">
            <div class="card-header-left">
              <SvgIcon name="menu" />
              <span>目录</span>
            </div>
          </div>
          <el-divider />
          <div class="article-menu">
            <div
              class="menu-item"
              v-for="item in info.catalogList"
              :key="item.line"
              :class="{ 'menu-item-active': info.activeId === item.line }"
              @click="goToAnchor(item.line)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { useSettingStore } from '@/stores/modules/setting'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'
import { dayjs } from 'element-plus'

const settingStore = useSettingStore()

let info = reactive({
  content: '',
  category: [],
  tag: [],
  catalogList: [],
  activeId: null
})

const onGetCatalog = list => {
  info.catalogList = list
  calculateOffsets()
}

const calculateOffsets = () => {
  if (info.catalogList.length === 0) {
    return
  }

  info.catalogList.forEach(item => {
    const el = document.querySelector(`[data-line="${item.line}"]`)
    if (el) {
      // 关键修复：获取元素相对于文档的绝对位置
      const rect = el.getBoundingClientRect()
      item.offsetTop = rect.top + window.scrollY - 64
    }
  })

  handleScroll()
}

const handleScroll = () => {
  if (info.catalogList.length === 0) {
    return
  }

  const scrollPosition = window.scrollY + 100
  let activeFound = false

  for (let i = info.catalogList.length - 1; i >= 0; i--) {
    const item = info.catalogList[i]

    if (typeof item.offsetTop === 'number') {
      if (scrollPosition >= item.offsetTop) {
        info.activeId = item.line
        activeFound = true
        break
      }
    }
  }

  if (!activeFound && info.catalogList.length > 0) {
    if (scrollPosition < info.catalogList[0]?.offsetTop) {
      info.activeId = null
    }
  }
}

const goToAnchor = line => {
  const el = document.querySelector(`[data-line="${line}"]`)
  if (el) {
    const headerHeight = 64
    const rect = el.getBoundingClientRect()
    const targetPosition = rect.top + window.scrollY - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

const debounce = (func, delay) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

const handleResize = debounce(() => {
  calculateOffsets()
}, 200)

const route = useRoute()
const getInfo = async () => {
  const id = route.params.id
  let { data } = await articleDetail({ id })
  info.content = data.data.content
  info = Object.assign(info, data.data)
}

onMounted(() => {
  getInfo()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)

  setTimeout(calculateOffsets, 300)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
