<template>
  <div class="layout">
    <layout-header />
    <div class="layout-main">
      <div class="layout-main-content">
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <layout-footer />
  </div>
</template>

<script setup>
import layoutHeader from './header/index.vue'
import layoutFooter from './footer/index.vue'
</script>

<style lang="scss" scoped>
.layout {
  &-main {
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 124px);

    &-content {
      max-width: 1200px;
      width: 100%;
      background-color: greenyellow;
    }
  }
}
</style>
