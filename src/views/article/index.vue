<template>
  <div class="view">
    <div class="view-content">
      <h1 class="article-title">这是一个标题</h1>
      <div class="article-info">
        <div class="article-info-left">
          <SvgIcon name="calendar" />
          <span>2025-08-09</span>
        </div>
        <div class="article-info-right">随笔</div>
      </div>
      <el-divider />
      <div class="article-content">
        <MdPreview :theme="settingStore.theme" :modelValue="state.text" @onGetCatalog="onGetCatalog" />
      </div>
      <el-divider />
      <div class="article-tags">
        <SvgIcon name="tag" />
        <el-tag type="primary">Vue</el-tag>
        <el-tag type="primary">React</el-tag>
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
              v-for="item in state.catalogList"
              :key="item.line"
              :class="{ 'menu-item-active': state.activeId === item.line }"
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

const settingStore = useSettingStore()

const state = reactive({
  text: "# 😲 md-editor-v3\n\nMarkdown 编辑器，vue3 版本，使用 jsx 模板 和 typescript 开发，支持切换主题、prettier 美化文本等。\n\n### 🤖 基本演示\n\n**加粗**，<u>下划线</u>，_斜体_，~~删除线~~，上标^26^，下标~1~，`inline code`，[超链接](https://github.com/imzbf)\n\n> 引用：《I Have a Dream》\n\n1. So even though we face the difficulties of today and tomorrow, I still have a dream.\n2. It is a dream deeply rooted in the American dream.\n3. I have a dream that one day this nation will rise up.\n\n- [ ] 周五\n- [ ] 周六\n- [x] 周天\n\n![图片](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)\n\n## 🤗 代码演示\n\n```vue\n<template>\n  <MdEditor v-model=\"text\" />\n</template>\n\n<script setup>\nimport { ref } from 'vue';\nimport { MdEditor } from 'md-editor-v3';",
  catalogList: [],
  activeId: null
})

const onGetCatalog = list => {
  state.catalogList = list
  calculateOffsets()
}

const calculateOffsets = () => {
  if (state.catalogList.length === 0) {
    return
  }

  state.catalogList.forEach(item => {
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
  if (state.catalogList.length === 0) {
    return
  }

  const scrollPosition = window.scrollY + 100
  let activeFound = false

  for (let i = state.catalogList.length - 1; i >= 0; i--) {
    const item = state.catalogList[i]

    if (typeof item.offsetTop === 'number') {
      if (scrollPosition >= item.offsetTop) {
        state.activeId = item.line
        activeFound = true
        break
      }
    }
  }

  if (!activeFound && state.catalogList.length > 0) {
    if (scrollPosition < state.catalogList[0].offsetTop) {
      state.activeId = null
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

onMounted(() => {
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
