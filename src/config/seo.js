// SEO配置文件
export const seoConfig = {
  // 网站基础信息
  siteName: '游荡de蝌蚪',
  siteDescription: '游荡de蝌蚪的个人博客，分享前端开发、Vue.js、JavaScript等技术文章和生活碎片',
  author: '游荡de蝌蚪',
  keywords: '博客,技术博客,前端开发,Vue.js,JavaScript,编程,技术分享,生活碎片,随笔',

  // 网站URL配置
  siteUrl: 'https://www.yddekd.com',

  // 默认图片
  defaultImage: '/logo.svg',

  // 社交媒体配置
  social: {
    github: 'ltadpoles' // 可选，如果有GitHub账号
  },

  // 页面特定配置
  pages: {
    home: {
      title: '游荡de蝌蚪 - 个人博客',
      description: '欢迎来到游荡de蝌蚪的个人博客，这里分享前端开发、Vue.js、JavaScript等技术文章和记录生活碎片',
      keywords: '首页,个人博客,技术博客,前端开发,Vue.js,JavaScript,生活碎片,随笔'
    },
    archive: {
      title: '文章归档 - 游荡de蝌蚪',
      description: '浏览游荡de蝌蚪博客的所有文章归档，按时间顺序查看文章',
      keywords: '文章归档,博客归档,技术文章,编程文章,生活碎片'
    },
    about: {
      title: '关于我 - 游荡de蝌蚪',
      description: '了解游荡de蝌蚪，一个热爱分享，热爱记录的人',
      keywords: '关于我,个人介绍,前端开发者,技术博主，生活记录者'
    },
    board: {
      title: '留言板 - 游荡de蝌蚪',
      description: '欢迎在游荡de蝌蚪的留言板留下您的想法和建议，留言板',
      keywords: '留言板,互动,交流,建议'
    },
    category: {
      title: '分类页 - 游荡de蝌蚪',
      description: '按分类浏览游荡de蝌蚪博客的文章',
      keywords: '文章分类,技术分类,博客分类,生活分类'
    },
    tag: {
      title: '标签页 - 游荡de蝌蚪',
      description: '按标签浏览游荡de蝌蚪博客的文章',
      keywords: '文章标签,技术标签,博客标签,生活标签'
    }
  }
}

// 生成页面SEO信息的工具函数
export function generatePageSeo(pageKey, customData = {}) {
  const baseConfig = seoConfig.pages[pageKey] || seoConfig.pages.home

  return {
    title: customData.title || baseConfig.title,
    description: customData.description || baseConfig.description,
    keywords: customData.keywords || baseConfig.keywords,
    image: customData.image || seoConfig.defaultImage,
    url: customData.url || seoConfig.siteUrl,
    author: seoConfig.author,
    siteName: seoConfig.siteName
  }
}

// 生成文章页面SEO信息
export function generateArticleSeo(article) {
  const title = `${article.title} - ${seoConfig.siteName}`
  const description = article.description || article.content?.substring(0, 160) || seoConfig.siteDescription
  const keywords = article.tags ? article.tags.map(tag => tag.name).join(',') : seoConfig.keywords
  const url = `${seoConfig.siteUrl}/article/${article.id}`
  const image = article.coverImage || seoConfig.defaultImage

  return {
    title,
    description,
    keywords,
    image,
    url,
    author: seoConfig.author,
    siteName: seoConfig.siteName,
    type: 'article',
    publishedTime: article.createTime,
    modifiedTime: article.updateTime
  }
}

// 生成分类页面SEO信息
export function generateCategorySeo(category) {
  const title = `${category.name} - 分类 - ${seoConfig.siteName}`
  const description = `浏览 ${category.name} 分类下的所有技术文章`
  const keywords = `${category.name},分类,技术文章,${seoConfig.keywords}`
  const url = `${seoConfig.siteUrl}/category/${category.id}`

  return {
    title,
    description,
    keywords,
    url,
    image: seoConfig.defaultImage,
    author: seoConfig.author,
    siteName: seoConfig.siteName
  }
}

// 生成标签页面SEO信息
export function generateTagSeo(tag) {
  const title = `${tag.name} - 标签 - ${seoConfig.siteName}`
  const description = `浏览 ${tag.name} 标签下的所有技术文章`
  const keywords = `${tag.name},标签,技术文章,${seoConfig.keywords}`
  const url = `${seoConfig.siteUrl}/tag/${tag.id}`

  return {
    title,
    description,
    keywords,
    url,
    image: seoConfig.defaultImage,
    author: seoConfig.author,
    siteName: seoConfig.siteName
  }
}
