---
layout: home
hero:
  name: 小路的个人博客
  text: 分享技术与生活的点滴
  tagline: 简约、优雅、高效
  image:
    src: /hero.png
    alt: 博客Logo
  actions:
    - theme: brand
      text: 开始阅读
      link: /posts/
    - theme: alt
      text: 关于我
      link: /about/

features:
  - icon: 📝
    title: 技术分享
    details: 分享前端、后端、AI等技术领域的学习心得和实践经验
  - icon: 🚀
    title: 项目展示
    details: 展示个人开发的项目和工具，分享开发过程中的经验和教训
  - icon: 💡
    title: 生活感悟
    details: 记录生活中的点滴思考和感悟，分享有价值的人生经验
---

<div class="home-stats-container">
  <h2 class="home-stats-title">博客统计</h2>
  <GlobalStats />
</div>

<style>
.home-stats-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.home-stats-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .home-stats-container {
    padding: 0 16px;
  }
  
  .home-stats-title {
    font-size: 1.5rem;
  }
}
</style>