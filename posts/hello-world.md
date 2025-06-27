---
title: Hello World - 我的第一篇博客
description: 这是我的第一篇博客文章，介绍了如何使用VitePress创建个人博客
date: 2025-06-12
tags: [VitePress, 博客, 教程, 技术/前端, 技术/静态网站, 个人成长/学习笔记]
author: 博主
cover: /images/hello-world-cover.jpg
---

# Hello World - 我的第一篇博客

欢迎来到我的个人博客！这是我使用 VitePress 创建的第一篇文章。在这篇文章中，我将介绍如何使用 VitePress 搭建一个简单而强大的静态博客网站。

## VitePress 简介

VitePress 是一个基于 Vite 和 Vue 的静态网站生成器，专为构建文档和博客而设计。它具有以下特点：

- **极速开发体验**：基于 Vite，享受闪电般的开发服务器启动和热更新
- **简洁至上**：以 Markdown 为中心的内容，专注于写作
- **Vue 驱动**：在 Markdown 中使用 Vue 组件，实现动态内容
- **高性能**：构建出的站点加载迅速，对 SEO 友好

## 为什么选择 VitePress？

在众多静态网站生成器中，VitePress 脱颖而出的原因有：

1. **简单易用**：配置简单，上手容易
2. **性能优异**：基于 Vite 构建，速度极快
3. **灵活扩展**：可以使用 Vue 组件增强 Markdown
4. **主题定制**：支持自定义主题和样式
5. **活跃社区**：Vue 生态系统的一部分，社区活跃

## 代码示例

以下是一个简单的 Vue 组件示例：

```vue
<template>
  <div class="greeting">
    <h1>{{ greeting }}</h1>
    <button @click="changeGreeting">Change Greeting</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const greeting = ref('Hello, VitePress!')

function changeGreeting() {
  greeting.value = 'VitePress is awesome!'
}
</script>

<style scoped>
.greeting {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
```

## Markdown 增强功能

VitePress 支持许多 Markdown 增强功能，例如：

### 提示框

::: tip 提示
这是一个提示框，用于显示提示信息。
:::

::: warning 警告
这是一个警告框，用于显示警告信息。
:::

::: danger 危险
这是一个危险框，用于显示危险信息。
:::

::: info 信息
这是一个信息框，用于显示一般信息。
:::

### 代码块行高亮

```js{3,5-7}
function example() {
  // 这行不会高亮
  const highlighted = true; // 这行会高亮
  const normal = false;
  // 以下三行会高亮
  if (highlighted) {
    return 'This is highlighted!';
  }
  return 'Normal line';
}
```

## 在 Markdown 中使用 Vue

VitePress 允许你在 Markdown 文件中直接使用 Vue 功能：

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

### 计数器示例

<div class="counter-demo">
  <p>当前计数: {{ count }}</p>
  <button @click="count++">增加</button>
  <button @click="count = 0">重置</button>
</div>

<style>
.counter-demo {
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.counter-demo button {
  margin-right: 0.5rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  cursor: pointer;
  transition: background-color 0.2s;
}

.counter-demo button:hover {
  background-color: var(--vp-c-gray-light-4);
}
</style>

## 下一步计划

在接下来的博客文章中，我将分享：

- 如何自定义 VitePress 主题
- 如何添加评论系统
- 如何优化 SEO
- 如何使用 GitHub Actions 自动部署

敬请期待！

---

感谢阅读我的第一篇博客文章。如果你有任何问题或建议，欢迎在下方评论区留言或通过[关于页面](/about/)中的联系方式与我联系。