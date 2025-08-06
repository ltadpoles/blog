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
    </div>
  </div>
</template>

<script setup>
import user from '@/components/user/index.vue'
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
