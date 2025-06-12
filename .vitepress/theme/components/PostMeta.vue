<template>
  <div class="post-meta-container">
    <div v-if="author" class="post-meta-item">
      <div class="post-meta-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <span>{{ author }}</span>
    </div>
    
    <div v-if="date" class="post-meta-item">
      <div class="post-meta-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>
      <span>{{ date }}</span>
    </div>
    
    <div v-if="readingTime" class="post-meta-item">
      <div class="post-meta-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <span>{{ readingTime }} 分钟阅读</span>
    </div>
    
    <div v-if="tags && tags.length" class="post-meta-item post-tags">
      <div class="post-meta-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
      </div>
      <div class="post-tags-list">
        <a 
          v-for="tag in tags" 
          :key="tag" 
          :href="`/tags/#${tag}`"
          class="post-tag"
          :style="{ backgroundColor: getTagColor(tag) }"
        >
          {{ tag }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTagColor } from '../utils'

defineProps({
  author: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  readingTime: {
    type: Number,
    default: 0
  },
  tags: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.post-meta-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.post-meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.post-meta-icon {
  opacity: 0.7;
}

.post-tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-tag {
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  transition: opacity 0.2s;
}

.post-tag:hover {
  opacity: 0.8;
}
</style>