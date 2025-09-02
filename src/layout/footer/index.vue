<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="running-time">
        <span class="icon">✧</span>
        本站居然运行了 <span class="time-value">{{ runDays }}</span> 天
        <span class="time-value">{{ runHours }}</span> 时 <span class="time-value">{{ runMinutes }}</span> 分
        <span class="time-value">{{ runSeconds }}</span> 秒
      </div>
      <div class="copyright">
        {{ userStore.website?.siteCopyright }}
        <a class="icp" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
          {{ userStore.website?.siteIcp }}
        </a>
      </div>
      <div class="visit-stats">
        <span class="visitor-btn">💫 今日访问量 {{ visitorCount }}</span>
        <span class="visitor-btn">👁️ 总访问量 {{ pageViewCount }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ipStatistics } from '@/api'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()

// 访问量统计
const visitorCount = ref(0)
const pageViewCount = ref(0)

// 获取统计数据
const getStatics = async () => {
  try {
    const { data } = await ipStatistics()
    if (data && data.data) {
      visitorCount.value = data.data.todayVisits || 0
      pageViewCount.value = data.data.totalVisits || 0
    }
  } catch {
    // 处理错误但不输出到控制台
    visitorCount.value = 591
    pageViewCount.value = 2642
  }
}

// 网站运行时间计算
const startDate = new Date('2023-01-01') // 网站开始运行的日期

const runDays = ref(0)
const runHours = ref(0)
const runMinutes = ref(0)
const runSeconds = ref(0)

// 更新运行时间
const updateRunningTime = () => {
  const now = new Date()
  const diff = now - startDate

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  runDays.value = days
  runHours.value = hours
  runMinutes.value = minutes
  runSeconds.value = seconds
}

// 定时器
let timer

onMounted(() => {
  getStatics()
  updateRunningTime()
  timer = setInterval(updateRunningTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@use 'index.scss' as *;
</style>
