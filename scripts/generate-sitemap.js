#!/usr/bin/env node

/**
 * 构建后生成完整sitemap的脚本
 * 这个脚本会在构建完成后运行，从 API 获取动态数据并生成完整的 sitemap
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { sitemapConfig, generateSitemapRoutes } from '../src/config/sitemap.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 生成XML sitemap内容
function generateSitemapXML(routes) {
  const urls = routes
    .map(route => {
      const urlStr = typeof route === 'string' ? route : route.url
      const changefreq = typeof route === 'object' ? route.changefreq : 'weekly'
      const priority = typeof route === 'object' ? route.priority : 0.8
      const lastmod = typeof route === 'object' ? route.lastmod : new Date().toISOString()

      return `  <url>
    <loc>${sitemapConfig.siteUrl}${urlStr}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

// 生成robots.txt内容
function generateRobotsTxt() {
  const allow = sitemapConfig.robotsConfig.allow || ['/']
  const disallow = sitemapConfig.robotsConfig.disallow || []

  let content = `User-agent: ${sitemapConfig.robotsConfig.userAgent}\n`

  allow.forEach(path => {
    content += `Allow: ${path}\n`
  })

  if (disallow.length > 0) {
    content += '\n'
    disallow.forEach(path => {
      content += `Disallow: ${path}\n`
    })
  }

  content += `\nSitemap: ${sitemapConfig.robotsConfig.sitemap}\n`

  if (sitemapConfig.robotsConfig.crawlDelay) {
    content += `Crawl-delay: ${sitemapConfig.robotsConfig.crawlDelay}\n`
  }

  return content
}

async function main() {
  try {
    // 开始生成完整的 sitemap

    // 获取所有路由（包括静态和动态）
    const allRoutes = await generateSitemapRoutes()

    // 找到路由数量

    // 生成sitemap XML
    const sitemapXML = generateSitemapXML(allRoutes)

    // 生成robots.txt
    const robotsTxt = generateRobotsTxt()

    // 确定输出目录 - 使用dist而不是.vite-ssg
    const distDir = path.resolve(__dirname, '../dist')

    // 确保目录存在
    await fs.mkdir(distDir, { recursive: true })

    // 写入文件
    await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemapXML, 'utf-8')
    await fs.writeFile(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8')

    // sitemap.xml 和 robots.txt 生成完成
  } catch {
    // 生成 sitemap 失败
    process.exit(1)
  }
}

main()
