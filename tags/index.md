---
layout: PostListPage
title: 标签分类
description: 按标签浏览文章
---

<script setup>
import { ref, computed } from 'vue'
import { data as posts } from '../posts/index.data.js'
import TagBar from '../.vitepress/theme/components/TagBar.vue'
import ModernPostList from '../.vitepress/theme/components/ModernPostList.vue'

// 响应式数据
const searchQuery = ref('')
const activeTag = ref('全部')
const allPosts = posts

// 计算过滤后的文章
const filteredPosts = computed(() => {
  let filtered = allPosts
  
  // 按标签筛选
  if (activeTag.value !== '全部') {
    filtered = filtered.filter(post => {
      if (!post.tags || !Array.isArray(post.tags)) return false
      
      // 检查是否包含完全匹配的标签
      if (post.tags.includes(activeTag.value)) {
        return true
      }
      
      // 检查多级标签匹配
      return post.tags.some(tag => {
        if (tag.includes('/')) {
          const parts = tag.split('/')
          // 如果选中的是父级标签，匹配所有子级
          if (parts[0] === activeTag.value) {
            return true
          }
          // 如果选中的是子级标签，精确匹配
          if (parts[1] === activeTag.value) {
            return true
          }
        }
        return false
      })
    })
  }
  
  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => {
      const title = (post.title || '').toLowerCase()
      const description = (post.description || '').toLowerCase()
      const tags = (post.tags || []).join(' ').toLowerCase()
      
      return title.includes(query) || 
             description.includes(query) || 
             tags.includes(query)
    })
  }
  
  return filtered
})

// 事件处理函数
const handleSearch = (query) => {
  searchQuery.value = query
}

const handleTagChange = (tag) => {
  activeTag.value = tag
}
</script>

<TagBar :posts="allPosts" @search="handleSearch" @tagChange="handleTagChange" />
<ModernPostList :posts="filteredPosts" />