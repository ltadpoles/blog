<template>
  <header class="header">
    <div class="header-left">
      <SvgIcon name="logo" width="2.2rem" height="2.2rem" />
      <h1 class="header-logo-title">这个一个名称</h1>
    </div>

    <div class="header-menu">
      <div class="header-menu-item">
        <SvgIcon name="home" width="1.4rem" height="1.4rem" />
        <span>测试1</span>
      </div>
      <div class="header-menu-item">
        <SvgIcon name="archive" width="1.4rem" height="1.4rem" />
        <span>测试2</span>
      </div>
      <div class="header-menu-item">
        <SvgIcon name="about" width="1.4rem" height="1.4rem" />
        <span>测试3</span>
      </div>
    </div>

    <div class="header-right">
      <SvgIcon name="sun" width="2rem" height="2rem" />
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
  border-bottom: 1px solid var(--border-color);

  &-left {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-right: 60px;

    &-title,
    h1 {
      font-size: 1.2rem;
    }
  }

  &-menu {
    display: flex;
    gap: 30px;
    flex: 1;

    &-item {
      display: flex;
      gap: 5px;
      align-items: center;
      cursor: pointer;
    }
  }

  &-right {
    display: flex;
  }
}
</style>
