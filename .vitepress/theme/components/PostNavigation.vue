<template>
  <div class="post-navigation-links" v-if="isPostPage && (prevPost || nextPost)">
    <div class="prev-post" v-if="prevPost">
      <a :href="formatUrl(prevPost.url)">{{ prevPost.title }}</a>
    </div>
    <div class="next-post" v-if="nextPost">
      <a :href="formatUrl(nextPost.url)">{{ nextPost.title }}</a>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import { data as posts } from '../composables/posts.data.js'

const { frontmatter, page } = useData()

// 获取当前文章的URL路径
const currentPath = computed(() => page.value.relativePath)

// 检查当前页面是否为文章页面
const isPostPage = computed(() => {
  return currentPath.value.startsWith('posts/') && currentPath.value !== 'posts/index.md'
})

// 获取当前文章的URL（去掉.md后缀）
const currentUrl = computed(() => {
  if (!isPostPage.value) return ''
  // 将相对路径转换为URL路径
  return '/posts/' + currentPath.value.replace('posts/', '').replace(/\.md$/, '')
})

// 获取当前文章的索引
const currentPostIndex = computed(() => {
  if (!isPostPage.value) return -1
  return posts.findIndex(post => {
    // 去掉开头的/以便比较
    const postUrl = post.url.startsWith('/') ? post.url.substring(1) : post.url
    const pageUrl = currentUrl.value.startsWith('/') ? currentUrl.value.substring(1) : currentUrl.value
    return postUrl === pageUrl || postUrl === pageUrl + '.html'
  })
})

// 获取当前文章的标签
const currentTags = computed(() => {
  return frontmatter.value.tags || []
})

// 获取上一篇文章
const prevPost = computed(() => {
  if (!isPostPage.value || currentPostIndex.value === -1) return null
  
  // 按照第一个标签筛选
  if (currentTags.value.length > 0) {
    const firstTag = currentTags.value[0]
    const sameCategoryPosts = posts.filter(post => 
      post.tags && post.tags.includes(firstTag)
    )
    
    // 在同类文章中查找当前文章
    const currentInCategory = sameCategoryPosts.findIndex(post => {
      const postUrl = post.url.startsWith('/') ? post.url.substring(1) : post.url
      const pageUrl = currentUrl.value.startsWith('/') ? currentUrl.value.substring(1) : currentUrl.value
      return postUrl === pageUrl || postUrl === pageUrl + '.html'
    })
    
    if (currentInCategory > 0) {
      return sameCategoryPosts[currentInCategory - 1]
    }
  }
  
  // 如果没有同类文章或者是同类中的第一篇，则返回时间顺序的上一篇
  return currentPostIndex.value < posts.length - 1 ? posts[currentPostIndex.value + 1] : null
})

// 获取下一篇文章
const nextPost = computed(() => {
  if (!isPostPage.value || currentPostIndex.value === -1) return null
  
  // 按照第一个标签筛选
  if (currentTags.value.length > 0) {
    const firstTag = currentTags.value[0]
    const sameCategoryPosts = posts.filter(post => 
      post.tags && post.tags.includes(firstTag)
    )
    
    // 在同类文章中查找当前文章
    const currentInCategory = sameCategoryPosts.findIndex(post => {
      const postUrl = post.url.startsWith('/') ? post.url.substring(1) : post.url
      const pageUrl = currentUrl.value.startsWith('/') ? currentUrl.value.substring(1) : currentUrl.value
      return postUrl === pageUrl || postUrl === pageUrl + '.html'
    })
    
    if (currentInCategory < sameCategoryPosts.length - 1) {
      return sameCategoryPosts[currentInCategory + 1]
    }
  }
  
  // 如果没有同类文章或者是同类中的最后一篇，则返回时间顺序的下一篇
  return currentPostIndex.value > 0 ? posts[currentPostIndex.value - 1] : null
})

// 格式化URL，确保链接格式正确
function formatUrl(url) {
  if (!url) return ''
  
  // 如果URL不是以/开头，添加/
  if (!url.startsWith('/')) {
    url = '/' + url
  }
  
  // 如果URL不是以.html结尾，添加.html
  if (!url.endsWith('.html')) {
    url = url + '.html'
  }
  
  return url
}
</script>

<style scoped>
.post-navigation-links {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--vp-c-divider);
}

.prev-post, .next-post {
  max-width: 45%;
}

.prev-post a, .next-post a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.prev-post a:hover, .next-post a:hover {
  text-decoration: underline;
}

.prev-post::before {
  content: "« 上一篇：";
  color: var(--vp-c-text-2);
}

.next-post::before {
  content: "下一篇：»";
  color: var(--vp-c-text-2);
}
</style>