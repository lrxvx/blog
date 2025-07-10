<template>
  <div class="profile-card">
    <div class="profile-header">
      <div class="avatar-container">
        <img class="avatar" src="/images/avatar.jpg" alt="博主头像" />
      </div>
      <div class="profile-info">
        <h3 class="profile-name">小路</h3>
        <p class="profile-bio">技术爱好者 | 内容创作者 | 终身学习者</p>
      </div>
    </div>
    
    <div class="profile-description">
      <p>👋 你好！我是小路，一名热爱技术和分享的博主。这里记录我的技术探索、学习心得和生活感悟。</p>
    </div>
    
    <div class="social-links">
      <div class="qrcode-container">
        <div class="qrcode-item">
          <img class="qrcode" src="/images/wechat-gzh-qrcode.jpg" alt="微信公众号二维码" />
          <p class="qrcode-label">微信公众号</p>
        </div>
        <div class="qrcode-item">
          <img class="qrcode" src="/images/zsxq-qrcode.png" alt="知识星球二维码" />
          <p class="qrcode-label">知识星球</p>
        </div>
        <div class="qrcode-item">
          <img class="qrcode" src="/images/wechat-qrcode.png" alt="微信二维码" />
          <p class="qrcode-label">微信二维码</p>
        </div>
      </div>
    </div>
    
    <div class="profile-footer">
      <a href="/about/" class="about-link">了解更多 →</a>
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar-container {
  margin-right: 1rem;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-brand);
}

.profile-info {
  flex: 1;
}

.profile-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.profile-bio {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.profile-description {
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.social-links {
  margin-bottom: 1.5rem;
}

.qrcode-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
}

.qrcode-item {
  text-align: center;
}

.qrcode {
  max-width: 200px;
  max-height: 320px;
  width: auto;
  height: auto;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  object-fit: contain;
}

/* 微信二维码特殊样式，放大到可扫码的程度 */
.qrcode-item:last-child .qrcode {
  max-width: 160px;
  max-height: 160px;
  min-width: 120px;
  min-height: 120px;
}

@media (max-width: 640px) {
  .qrcode-container {
    flex-direction: column;
    align-items: center;
  }
  
  .qrcode {
    max-width: 100px;
    max-height: 150px;
  }
}
.qrcode-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.profile-footer {
  text-align: right;
}

.about-link {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.about-link:hover {
  text-decoration: underline;
}
</style>