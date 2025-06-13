---
title: 文章标签
description: 按标签分类的文章列表
---

# 文章标签

按标签浏览所有文章。

<script setup>
import { data as posts } from '../.vitepress/theme/composables/posts.data.js'
import { ref, computed, onMounted, nextTick } from 'vue'

console.log('Posts data in tags/index.md:', posts);

// 提取所有标签并计算每个标签的文章数量
const tags = computed(() => {
    const tagMap = new Map()
    
    posts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, [])
          }
          tagMap.get(tag).push(post)
        })
      }
    })
    
    // 转换为数组并按文章数量排序
    return Array.from(tagMap.entries())
      .map(([name, posts]) => ({
        name,
        count: posts.length,
        posts
      }))
      .sort((a, b) => b.count - a.count)
  })

// 当前选中的标签
const activeTag = ref('')

// 根据选中的标签筛选文章
const filteredPosts = computed(() => {
  if (!activeTag.value) return []
  const tagObj = tags.value.find(tag => tag.name === activeTag.value)
  if (!tagObj || !Array.isArray(tagObj.posts)) return []
  
  // 确保每个 post 对象都有必要的属性
  return tagObj.posts.filter(post => post && typeof post === 'object' && post.title && post.url)
})
// const filteredPosts = computed(() => {
//   if (!activeTag.value) return []
//   const found = tags.value.find(tag => tag.name === activeTag.value)
//   return found ? found.posts.filter(post => post && post.title) : []
// })

// 设置活动标签
function setActiveTag(tag) {
  activeTag.value = tag
  // 更新URL hash但不刷新页面
  if (tag) {
    window.history.replaceState(null, null, `#${tag}`)
  } else {
    window.history.replaceState(null, null, window.location.pathname)
  }
}

// 初始化：从URL hash中获取标签
// function initFromHash() {
//   const hash = window.location.hash
//   if (hash) {
//     const tag = decodeURIComponent(hash.slice(1))
//     if (tags.value.some(t => t.name === tag)) {
//       setActiveTag(tag)
//     }
//   }
// }
function initFromHash() {
  const hash = window.location.hash
  if (hash) {
    const tag = decodeURIComponent(hash.slice(1))
    if (tags.value.some(t => t.name === tag)) {
      // 添加延迟确保数据加载完成
      nextTick(() => {
        setActiveTag(tag)
      })
    }
  }
}
onMounted(() => {
  initFromHash()
  window.addEventListener('hashchange', initFromHash)
})

</script>

<div class="tags-container">
  <div class="tags-list">
    <div 
      v-for="tag in tags" 
      :key="tag.name"
      class="tag-item"
      :class="{ active: activeTag === tag.name }"
      @click="setActiveTag(tag.name)"
    >
      <span class="tag-name">{{ tag.name }}</span>
      <span class="tag-count">{{ tag.count }}</span>
    </div>
  </div>
  
  <div v-if="activeTag" class="tag-posts">
    <h2>{{ activeTag }} <button class="clear-btn" @click="setActiveTag('')">清除</button></h2>
    
  <div class="posts-list">
    <template v-for="post in filteredPosts" :key="post?.url">
      <div v-if="post && post.title" class="post-item">
        <div class="post-title">
          <a :href="post?.url">{{ post?.title }}</a>
        </div>
        <div class="post-meta">
          <span v-if="post?.date" class="post-date">{{ post?.date }}</span>
        </div>
        <div v-if="post?.description" class="post-description">
          {{ post?.description }}
        </div>
      </div>
    </template>
  </div>

  </div>
  
  <div v-else class="tag-instruction">
    <p>👈 点击左侧标签查看相关文章</p>
  </div>
</div>

<style>
.tags-container {
  display: flex;
  gap: 2rem;
}

.tags-list {
  flex: 0 0 200px;
  border-right: 1px solid var(--vp-c-divider);
  padding-right: 1rem;
}

.tag-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 0.5rem;
}

.tag-item:hover {
  background-color: var(--vp-c-bg-soft);
}

.tag-item.active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.tag-count {
  font-size: 0.8rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 0.1rem 0.5rem;
  color: var(--vp-c-text-2);
}

.tag-item.active .tag-count {
  background-color: var(--vp-c-brand-dim);
  color: var(--vp-c-brand-dark);
}

.tag-posts {
  flex: 1;
}

.tag-instruction {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  font-size: 1.2rem;
}

.clear-btn {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-item {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 1.5rem;
}

.post-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.post-meta {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.post-description {
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .tags-container {
    flex-direction: column;
  }
  
  .tags-list {
    flex: none;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
    padding-right: 0;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag-item {
    margin-bottom: 0;
  }
}


</style>
