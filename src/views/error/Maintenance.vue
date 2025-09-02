<!--
  网站维护中页面
  用于显示网站维护状态
-->
<template>
  <div class="maintenance-page">
    <div class="maintenance-container">
      <div class="maintenance-icon">
        <SvgIcon name="maintenance" width="120px" height="120px" />
      </div>

      <h1 class="maintenance-title">网站维护中</h1>

      <div class="maintenance-message">
        <p>抱歉，我们正在进行系统维护和升级，以提供更好的服务体验。</p>
        <p>请稍后再访问。</p>
      </div>

      <div class="maintenance-contact">
        <p>如有疑问，请联系：<a href="mailto:support@yddekd.com">support@yddekd.com</a></p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.maintenance-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
  background-color: var(--el-bg-color);
}

.maintenance-container {
  max-width: 600px;
  width: 100%;
  padding: 40px;
  border-radius: 8px;
  background-color: var(--el-bg-color-overlay);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.maintenance-icon {
  margin-bottom: 24px;
  color: var(--el-color-primary);
}

.maintenance-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 16px;
}

.maintenance-message {
  font-size: 16px;
  color: var(--el-text-color-regular);
  margin-bottom: 24px;
  line-height: 1.6;

  p {
    margin-bottom: 12px;
  }
}

.maintenance-contact {
  font-size: 14px;
  color: var(--el-text-color-secondary);

  a {
    color: var(--el-color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .maintenance-container {
    padding: 24px;
  }

  .maintenance-title {
    font-size: 28px;
  }
}
</style>
