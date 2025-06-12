---
title: 博客文章
description: 所有博客文章的列表
---

# 博客文章

这里是所有博客文章的列表，按照发布时间排序。

## 最新文章

<script setup>
import { data as posts } from '../.vitepress/theme/composables/posts.data.js'
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts
  const query = searchQuery.value.toLowerCase()
  return posts.filter(post => 
    post.title.toLowerCase().includes(query) || 
    (post.description && post.description.toLowerCase().includes(query)) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
  )
})
</script>

<div class="search-box">
  <input 
    v-model="searchQuery" 
    type="text" 
    placeholder="搜索文章..." 
  />
</div>

<div class="posts-container">
  <div v-for="post in filteredPosts" :key="post.url" class="post-item">
    <div class="post-title">
      <a :href="post.url">{{ post.title }}</a>
    </div>
    <div class="post-meta">
      <span class="post-date">{{ post.date }}</span>
      <span v-if="post.tags" class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="post-tag">
          <a :href="`/tags/#${tag}`">{{ tag }}</a>
        </span>
      </span>
    </div>
    <div v-if="post.description" class="post-description">
      {{ post.description }}
    </div>
  </div>
</div>

<style>
.search-box {
  margin-bottom: 2rem;
}

.search-box input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 1rem;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-item {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 1.5rem;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.post-meta {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-date {
  margin-right: 1rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
}

.post-tag a {
  display: inline-block;
  padding: 0.1rem 0.5rem;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  border-radius: 4px;
  font-size: 0.8rem;
  transition: background-color 0.2s;
}

.post-tag a:hover {
  background-color: var(--vp-c-brand-dim);
}

.post-description {
  font-size: 1rem;
  color: var(--vp-c-text-2);
}
</style>