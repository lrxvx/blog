// .vitepress/config.js
import { defineConfig } from 'vitepress'
import { extendPageData } from './theme/enhanceApp.js'

export default defineConfig({  
  // 忽略死链接，防止构建失败
  ignoreDeadLinks: true,
  // 站点基本信息
  lang: 'zh-CN',
  title: '个人博客',
  description: '基于VitePress的个人博客网站',
  lastUpdated: true,

  // SEO 优化
  sitemap: {
    hostname: 'https://yourdomain.com'
  },
  
  // 扩展页面数据，添加 SEO 元数据
  extendPageData,
  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/posts/' },
      { text: '标签', link: '/tags/' },
      { text: '关于', link: '/about/' },
      { text: '统计', link: '/about/stats' },
    ],
    
    // 侧边栏
    sidebar: {
      '/posts/': [
        {
          text: '博客文章',
          items: [
            { text: '所有文章', link: '/posts/' },
          ]
        }
      ],
      '/about/': [
        {
          text: '关于',
          items: [
            { text: '关于我', link: '/about/' },
            { text: '文章统计', link: '/about/stats' },
          ]
        }
      ],
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername' },
    ],
    
    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: `Copyright © ${new Date().getFullYear()} 个人博客`
    },
    
    // 搜索
    search: {
      provider: 'local'
    },
    
    // 移除编辑链接
    editLink: false,
    
    // 最后更新时间文本
    lastUpdatedText: '最后更新于',
    
    // 大纲标题
    outlineTitle: '本页目录',
    
    // 文档页脚文本
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },
  
  // 头部信息
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#42b883' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    // SEO 相关元标签
    ['meta', { name: 'author', content: '博主' }],
    ['meta', { name: 'keywords', content: '博客,技术,编程,VitePress,Vue' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '个人博客' }],
    ['meta', { property: 'og:description', content: '基于VitePress的个人博客网站' }],
    ['meta', { property: 'og:image', content: 'https://yourdomain.com/images/og-image.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '个人博客' }],
    ['meta', { name: 'twitter:description', content: '基于VitePress的个人博客网站' }],
    ['meta', { name: 'twitter:image', content: 'https://yourdomain.com/images/twitter-image.jpg' }],
  ],
})