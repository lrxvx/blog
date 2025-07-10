<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import ModernPostDetail from './components/ModernPostDetail.vue'
import PostListPage from './layouts/PostListPage.vue'

const { Layout } = DefaultTheme
const { page } = useData()

// 获取当前文章的URL路径
const currentPath = computed(() => page.value.relativePath)

// 检查当前页面是否为文章页面
const isPostPage = computed(() => {
  return currentPath.value.startsWith('posts/') && currentPath.value !== 'posts/index.md'
})

// 检查当前页面是否为文章列表页面
const isPostListPage = computed(() => {
  return currentPath.value === 'posts/index.md'
})
</script>

<template>
  <!-- 如果是文章页面，使用现代化的文章详情组件 -->
  <ModernPostDetail v-if="isPostPage">
    <Layout />
  </ModernPostDetail>
  
  <!-- 如果是文章列表页面，使用专门的文章列表布局 -->
  <PostListPage v-else-if="isPostListPage">
    <Layout />
  </PostListPage>
  
  <!-- 其他页面使用默认布局 -->
  <Layout v-else>
    <!-- 在首页底部添加个人信息卡片 -->
    <template #home-features-after>
      <div class="home-profile-container">
        <h2 class="home-profile-title">关于我</h2>
        <ProfileCard />
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.post-navigation {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

/* 面包屑导航样式 */
:deep(.breadcrumb) {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

:deep(.breadcrumb) a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

:deep(.breadcrumb) a:hover {
  text-decoration: underline;
}

/* 文章元信息样式 */
:deep(.post-meta) {
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

/* 文章底部导航链接样式 */
:deep(.post-navigation-links) {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--vp-c-divider);
}

:deep(.prev-post), :deep(.next-post) {
  max-width: 45%;
}

:deep(.prev-post) a, :deep(.next-post) a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

:deep(.prev-post) a:hover, :deep(.next-post) a:hover {
  text-decoration: underline;
}

:deep(.prev-post)::before {
  content: "« 上一篇：";
  color: var(--vp-c-text-2);
}

:deep(.next-post)::before {
  content: "下一篇：»";
  color: var(--vp-c-text-2);
}

.post-tags {
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.post-tags-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.post-tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 4px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  text-decoration: none;
  transition: background-color 0.2s;
}

.post-tag:hover {
  background-color: var(--vp-c-brand-soft-down);
}

.post-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-nav-item {
  display: flex;
  align-items: baseline;
}

.post-nav-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}

.post-nav-link {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.post-nav-link:hover {
  text-decoration: underline;
}

/* 个人信息卡片样式 */
.profile-card-container {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--vp-c-divider);
}

.profile-card-title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* 首页个人信息卡片样式 */
.home-profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 48px;
  margin-top: 3rem;
  margin-bottom: 4rem;
}

@media (max-width: 768px) {
  .home-profile-container {
    max-width: none;
    padding: 0 24px;
  }
}

.home-profile-title {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

@media (min-width: 640px) {
  .post-nav-links {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .home-profile-container {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .home-profile-container {
    padding: 0 64px;
  }
}
</style>