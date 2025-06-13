<template>
  <div class="breadcrumb" v-if="isPostPage">
    当前位置：<a href="/">首页</a> / 
    <a href="/posts/">博客文章</a> / 
    <template v-if="firstTag">
      <a :href="`/tags/#${firstTag}`">{{ firstTag }}</a> / 
    </template>
    {{ title }}
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter, page } = useData()

// 获取当前文章的URL路径
const currentPath = computed(() => page.value.relativePath)

// 检查当前页面是否为文章页面
const isPostPage = computed(() => {
  return currentPath.value.startsWith('posts/') && currentPath.value !== 'posts/index.md'
})

// 获取文章标题
const title = computed(() => frontmatter.value.title || '')

// 获取第一个标签
const firstTag = computed(() => {
  const tags = frontmatter.value.tags || []
  return tags.length > 0 ? tags[0] : null
})
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.breadcrumb a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}
</style>