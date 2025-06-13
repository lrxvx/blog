<template>
  <div class="blog-post-list">
    <div 
      v-for="post in displayPosts" 
      :key="post.url" 
      class="blog-post-card"
    >
      <div v-if="post.cover" class="blog-post-cover">
        <a :href="post.url">
          <img :src="post.cover" :alt="post.title" loading="lazy" />
        </a>
      </div>
      <div class="blog-post-content">
        <h3 class="blog-post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h3>
        <div class="blog-post-meta">
          <span class="blog-post-date">{{ post.date }}</span>
          <span v-if="post.author" class="blog-post-author">{{ post.author }}</span>
          <span class="blog-post-views" v-if="typeof window !== 'undefined'">
            <span class="view-icon">👁️</span> {{ getPostViews(post.url) }}
          </span>
        </div>
        <p v-if="post.description" class="blog-post-excerpt">
          {{ post.description }}
        </p>
        <div v-if="post.tags && post.tags.length" class="blog-post-tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag" 
            class="blog-post-tag"
            :style="{ backgroundColor: getTagColor(tag) }"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    
    <div v-if="posts.length > limit && !showAll" class="blog-post-more">
      <button @click="showAll = true" class="blog-post-more-button">
        查看更多文章
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getTagColor } from '../utils'
import { getPostStats } from '../utils/PostStatsManager'

// 组件属性
const props = defineProps({
  // 文章列表
  posts: {
    type: Array,
    default: () => []
  },
  // 初始显示数量限制
  limit: {
    type: Number,
    default: 6
  }
})

// 是否显示所有文章
const showAll = ref(false)

// 计算要显示的文章
const displayPosts = computed(() => {
  if (showAll.value || props.posts.length <= props.limit) {
    return props.posts
  }
  return props.posts.slice(0, props.limit)
})

// 获取文章访问量
const getPostViews = (url) => {
  if (typeof window === 'undefined') return 0
  
  // 处理URL格式，确保与存储的ID格式一致
  const postId = url.startsWith('/') ? url.substring(1) : url
  const stats = getPostStats(postId)
  return stats ? stats.views : 0
}

// 组件挂载时刷新数据
onMounted(() => {
  // 定时刷新访问量数据
  const interval = setInterval(() => {
    if (typeof window !== 'undefined') {
      // 强制更新组件
      showAll.value = showAll.value
    }
  }, 30000) // 每30秒刷新一次
  
  // 组件卸载时清除定时器
  return () => {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.blog-post-more {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.blog-post-more-button {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.blog-post-more-button:hover {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.blog-post-views {
  display: inline-flex;
  align-items: center;
  margin-left: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.view-icon {
  margin-right: 0.25rem;
  font-size: 0.9rem;
}
</style>