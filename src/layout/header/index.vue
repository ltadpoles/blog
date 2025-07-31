<template>
  <header class="header">
    <div class="header-logo">
      <SvgIcon name="logo" width="3rem" height="3rem" />
      <h1 class="header-logo-title">游荡de蝌蚪</h1>
    </div>

    <div class="header-menu">
      <div class="header-menu-item">
        <SvgIcon name="home" width="1.4rem" height="1.4rem" marginRight="3px" />
        <span>首页</span>
      </div>
      <div class="header-menu-item">
        <SvgIcon name="archive" width="1.4rem" height="1.4rem" marginRight="3px" />
        <span>归档</span>
      </div>
      <div class="header-menu-item">
        <SvgIcon name="about" width="1.4rem" height="1.4rem" marginRight="3px" />
        <span>关于</span>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;

  &-logo {
    display: flex;
    align-items: center;
    margin-right: 60px;

    &-title,
    h1 {
      margin-left: 5px;
      font-size: 1.2rem;
    }
  }

  &-menu {
    display: flex;

    &-item {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }
  }
}
</style>
