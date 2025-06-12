// .vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点基本信息
  lang: 'zh-CN',
  title: '个人博客',
  description: '基于VitePress的个人博客网站',
  lastUpdated: true,
  cleanUrls: true,
  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/posts/' },
      { text: '标签', link: '/tags/' },
      { text: '关于', link: '/about/' },
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
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/yourusername/blog/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },
    
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
  ],
})