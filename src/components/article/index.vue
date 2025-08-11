<template>
  <div class="article">
    <div class="article-item">
      <div class="article-content">
        <div class="article-image hidden-large">
          <img src="@/assets/images/image.png" alt="" />
        </div>
        <div class="article-main">
          <div class="article-content-title">
            <div class="article-content-title-top">
              <span>置顶</span>
            </div>
            <h1>这是一个文章的标题</h1>
          </div>
          <div class="article-content-description">
            <el-text line-clamp="3">
              这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这要这是一个文章的摘要这是一个文章的摘要
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
          <span>2025-08-09</span>
        </div>
        <div class="article-content-footer-right">生活记录</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
