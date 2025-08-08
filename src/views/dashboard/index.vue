<template>
  <div class="dashboard">
    <div class="dashboard-content">
      <div class="content-list">
        <div class="content-list-item"></div>
        <div class="content-list-item"></div>
        <div class="content-list-item"></div>
        <div class="content-list-item"></div>
        <div class="content-list-item"></div>
        <div class="content-list-item"></div>
        <div class="content-list-item"></div>
        <div class="content-list-item"></div>
        <div class="content-list-item"></div>
      </div>
    </div>
    <div class="sidebar">
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
            <div class="categories-list-item">
              <div class="categories-title">测试4号</div>
              <div class="categories-count">10</div>
            </div>
            <div class="categories-list-item">
              <div class="categories-title">测试5号</div>
              <div class="categories-count">10</div>
            </div>
          </div>
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup>
import user from '@/components/user/index.vue'
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
