# 小路副业创业指南

这是一个专注于副业创业指导的知识分享平台，基于 VitePress 构建。网站提供副业思考、自媒体创业信息、副业资源和在职场做副业的实用方法论，帮助职场人士开启副业之路，实现财务自由。

## 特点

- 🎯 **专业定位**：专注副业创业指导，提供实用方法论
- 🚀 **快速**：基于 Vite 构建，享受极速的开发体验
- 📝 **内容丰富**：副业100问、写作100问等系列内容
- 🎨 **美观**：简约大方的设计风格，突出内容价值
- 🔍 **SEO 优化**：全球推广SEO配置，支持中英文关键词
- 🌙 **深色模式**：支持自动和手动切换主题
- 📱 **响应式**：适配各种屏幕尺寸
- 🏷️ **多级标签**：支持多级标签分类和智能合并显示
- 🌍 **国际化**：面向全球用户的多语言SEO策略

## 目录结构

```
├── .vitepress/         # VitePress 配置和主题
│   ├── config.js       # 站点配置（已优化SEO）
│   ├── seo-config.js   # 专业SEO配置文件
│   └── theme/          # 自定义主题
├── public/             # 静态资源
├── posts/              # 博客文章
│   ├── fy100q-*.md     # 副业100问系列
│   ├── xz100q-*.md     # 写作100问系列
│   └── xiaolu-*.md     # 副业日记系列
├── about/              # 关于页面
├── tags/               # 标签页面（支持多级标签）
├── index.md            # 首页（已优化SEO）
├── readme.txt          # 日常更新记录
└── SEO-OPTIMIZATION-GUIDE.md  # SEO优化指南
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

## 内容创作

### 添加新文章

1. 在 `posts` 目录下创建新的 Markdown 文件
2. 添加必要的 frontmatter 信息，支持多级标签：

```markdown
---
title: 文章标题
description: 文章描述
date: YYYY-MM-DD
tags: ["副业/副业100问", "副业/公众号", "写作/写作100问"]
author: 小路
cover: /images/cover.jpg
---

# 文章内容
```

### 内容系列

- **副业100问系列** (`fy100q-*.md`)：解答副业创业中的常见问题
- **写作100问系列** (`xz100q-*.md`)：分享写作技巧和经验
- **副业日记系列** (`xiaolu-*.md`)：记录副业创业的实践过程

### 标签规范

- 使用多级标签格式：`父级/子级`
- 常用标签：`副业/副业100问`、`副业/公众号`、`写作/写作100问`
- 标签会自动合并显示，支持展开查看子标签

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

## SEO优化

### 关键词策略

- **中文关键词**：副业创业、自媒体创业、在职副业、公众号运营、写作赚钱
- **英文关键词**：side hustle、freelancing、content creation、entrepreneurship
- **长尾关键词**：如何在职场做副业、公众号新人没有流量怎么办

### SEO配置文件

- `config.js`：基础SEO配置，已优化站点信息
- `seo-config.js`：专业SEO配置，包含结构化数据
- `SEO-OPTIMIZATION-GUIDE.md`：完整的SEO优化指南

## 自定义

### 修改配置

编辑 `.vitepress/config.js` 文件来修改网站标题、描述、导航栏等配置。

### SEO优化

参考 `SEO-OPTIMIZATION-GUIDE.md` 文件进行SEO优化配置。

### 自定义样式

编辑 `.vitepress/theme/styles/custom.css` 文件来自定义样式。

## 日常维护

### 更新记录

每日更新请记录在 `readme.txt` 文件中，包括：
- 新增功能
- 内容更新
- 技术优化
- SEO改进

### 内容策略

- 每周发布2-3篇高质量文章
- 保持系列内容的连续性
- 关注用户反馈和数据分析
- 持续优化SEO效果

## 许可证

[MIT](LICENSE)