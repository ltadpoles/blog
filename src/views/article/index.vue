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
        <MdPreview :id="id" :modelValue="text" />
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
          <MdCatalog :editorId="id" :scrollElementOffsetTop="64" :scrollElement="scrollElement" />
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MdPreview, MdCatalog } from 'md-editor-v3'
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css'

const id = 'preview-only'
const text = ref(
  "## 😲 md-editor-v3\n\nMarkdown 编辑器，vue3 版本，使用 jsx 模板 和 typescript 开发，支持切换主题、prettier 美化文本等。\n\n### 🤖 基本演示\n\n**加粗**，<u>下划线</u>，_斜体_，~~删除线~~，上标^26^，下标~1~，`inline code`，[超链接](https://github.com/imzbf)\n\n> 引用：《I Have a Dream》\n\n1. So even though we face the difficulties of today and tomorrow, I still have a dream.\n2. It is a dream deeply rooted in the American dream.\n3. I have a dream that one day this nation will rise up.\n\n- [ ] 周五\n- [ ] 周六\n- [x] 周天\n\n![图片](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)\n\n## 🤗 代码演示\n\n```vue\n<template>\n  <MdEditor v-model=\"text\" />\n</template>\n\n<script setup>\nimport { ref } from 'vue';\nimport { MdEditor } from 'md-editor-v3';"
)
const scrollElement = document.documentElement || document.body
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
