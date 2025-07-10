<template>
  <div class="modern-post-detail">
    <!-- 文章列表页面头部 -->
    <header class="post-header">
      <div class="header-background">
        <div class="cover-gradient"></div>
        <div class="header-overlay"></div>
      </div>
      
      <div class="header-content">
        <nav class="breadcrumb">
          <a href="/" class="breadcrumb-link">首页</a>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-current">技术博客</span>
        </nav>
        
        <h1 class="post-title">技术博客</h1>
        
        <div class="post-description">
          分享技术见解，记录成长足迹
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <div class="post-container list-page">
      <!-- 主要内容 -->
      <main class="post-main">
        <article class="post-content">
          <slot />
        </article>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<style scoped>
/* 使用与ModernPostDetail相同的样式 */
.modern-post-detail {
  min-height: 100vh;
  background: var(--vp-c-bg);
}

/* 文章头部样式 */
.post-header {
  position: relative;
  height: 50vh;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.cover-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.header-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 2rem;
}

.breadcrumb {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  opacity: 0.9;
}

.breadcrumb-link {
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.breadcrumb-link:hover {
  opacity: 0.8;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  opacity: 0.7;
  color: white;
  font-weight: bold;
}

.breadcrumb-current {
  opacity: 0.9;
  color: white;
  font-weight: bold;
}

.post-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.post-description {
  font-size: 1.25rem;
  opacity: 0.9;
  margin: 0;
  line-height: 1.6;
}

/* 主要内容区域 */
.post-container {
  position: relative;
  z-index: 1;
}

.post-container.list-page {
  display: block;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
}

.post-main {
  max-width: none;
  margin: 0;
  padding: 0;
}

.post-content {
  max-width: none;
  margin: 0;
  padding: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .post-header {
    height: 40vh;
    min-height: 300px;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-description {
    font-size: 1rem;
  }
  
  .header-content {
    padding: 0 1rem;
  }
  
  .post-container.list-page {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .post-header {
    height: 35vh;
    min-height: 250px;
  }
  
  .post-title {
    font-size: 1.75rem;
  }
  
  .breadcrumb {
    font-size: 0.8rem;
  }
}
</style>