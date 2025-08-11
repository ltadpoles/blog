<template>
  <div class="dashboard">
    <div class="dashboard-content">
      <article-list />
    </div>
    <div class="sidebar hidden-mini">
      <user />
      <el-affix :offset="64">
        <div class="categories">
          <div class="categories-header">
            <div class="categories-header-left">
              <SvgIcon name="component" />
              <span>分类</span>
            </div>
            <div class="categories-header-right">
              <SvgIcon name="more" />
            </div>
          </div>
          <el-divider />
          <div class="categories-list">
            <div class="categories-list-item">
              <div class="categories-title">测试1号测试1号测试1号测试1号测试1号测试1号测试1号</div>
              <div class="categories-count">12</div>
            </div>
            <div class="categories-list-item">
              <div class="categories-title">测试2号</div>
              <div class="categories-count">10</div>
            </div>
            <div class="categories-list-item">
              <div class="categories-title">测试3号</div>
              <div class="categories-count">10</div>
            </div>
          </div>
        </div>

        <div class="tags">
          <div class="tags-header">
            <div class="tags-header-left">
              <SvgIcon name="tag" />
              <span>标签</span>
            </div>
            <div class="tags-header-right">
              <SvgIcon name="more" />
            </div>
          </div>
          <el-divider />
          <div class="tags-content">
            <div class="tags-content-item">
              <span>Vue</span>
              <sup>10</sup>
            </div>
            <div class="tags-content-item">
              <span>React</span>
              <sup>10</sup>
            </div>
            <div class="tags-content-item">
              <span>Angluar</span>
              <sup>10</sup>
            </div>
            <div class="tags-content-item">
              <span>Element</span>
              <sup>10</sup>
            </div>
            <div class="tags-content-item">
              <span>Vue</span>
              <sup>10</sup>
            </div>
          </div>
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup>
import user from '@/components/user/index.vue'
import articleList from '@/components/article/index.vue'
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
