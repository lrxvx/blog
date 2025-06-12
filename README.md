# 个人博客网站

这是一个基于 VitePress 构建的静态个人博客网站，使用 Markdown 编写内容，通过 GitHub 托管代码，并使用 Netlify 自动部署。

## 特点

- 🚀 **快速**：基于 Vite 构建，享受极速的开发体验
- 📝 **简洁**：以 Markdown 为中心的内容创作
- 🎨 **美观**：简约大方的设计风格
- 🔍 **SEO 友好**：自动生成 SEO 相关标签
- 🌙 **深色模式**：支持自动和手动切换主题
- 📱 **响应式**：适配各种屏幕尺寸
- 🏷️ **标签系统**：支持文章标签分类

## 目录结构

```
├── .vitepress/         # VitePress 配置和主题
│   ├── config.js       # 站点配置
│   └── theme/          # 自定义主题
├── public/             # 静态资源
├── posts/              # 博客文章
├── about/              # 关于页面
├── tags/               # 标签页面
└── index.md            # 首页
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 构建网站

```bash
npm run build
```

### 预览构建

```bash
npm run preview
```

## 添加新文章

1. 在 `posts` 目录下创建新的 Markdown 文件
2. 添加必要的 frontmatter 信息，例如：

```markdown
---
title: 文章标题
description: 文章描述
date: YYYY-MM-DD
tags: [标签1, 标签2]
author: 作者名
cover: /images/cover.jpg
---

# 文章内容
```

## 部署

### GitHub

1. 创建一个新的 GitHub 仓库
2. 将代码推送到仓库

```bash
git init
git add .
git commit -m "初始提交"
git branch -M main
git remote add origin https://github.com/yourusername/blog.git
git push -u origin main
```

### Netlify

1. 在 Netlify 创建一个新的站点
2. 连接到你的 GitHub 仓库
3. 设置构建命令为 `npm run build`
4. 设置发布目录为 `.vitepress/dist`
5. 点击部署

## 自定义

### 修改配置

编辑 `.vitepress/config.js` 文件来修改网站标题、描述、导航栏等配置。

### 自定义样式

编辑 `.vitepress/theme/styles/custom.css` 文件来自定义样式。

## 许可证

[MIT](LICENSE)