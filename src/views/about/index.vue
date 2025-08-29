<template>
  <div>这个人很懒，什么也没留下...</div>
</template>

<script setup>
import { generatePageSeo } from '@/config/seo'
import { useSeoMeta } from '@unhead/vue'

// SEO配置
const seoData = generatePageSeo('about')
useSeoMeta({
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ogTitle: seoData.title,
  ogDescription: seoData.description,
  ogImage: seoData.image,
  ogUrl: `${seoData.url}/about`,
  twitterTitle: seoData.title,
  twitterDescription: seoData.description
})
</script>

<style lang="scss" scoped></style>
