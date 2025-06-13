---
title: 文章统计
description: 博客文章访问量和阅读量统计
outline: false
---

<script setup>
/*
import { ref, onMounted } from 'vue'

const isAuthenticated = ref(false)
const password = ref('')
const errorMessage = ref('')

// 验证密码
const authenticate = () => {
  // 设置一个简单的密码，实际使用时应该更复杂
  if (password.value === 'admin123') {
    isAuthenticated.value = true
    // 存储认证状态，24小时有效
    if (typeof window !== 'undefined') {
      const expiry = new Date().getTime() + 24 * 60 * 60 * 1000
      localStorage.setItem('stats_auth', JSON.stringify({ authenticated: true, expiry }))
    }
  } else {
    errorMessage.value = '密码错误，请重试'
  }
}

// 检查是否已认证
onMounted(() => {
  if (typeof window !== 'undefined') {
    try {
      const authData = JSON.parse(localStorage.getItem('stats_auth') || '{}')
      if (authData.authenticated && authData.expiry > new Date().getTime()) {
        isAuthenticated.value = true
      }
    } catch (e) {
      console.error('认证状态检查失败', e)
    }
  }
})
*/
</script>

# 文章统计

<div class="stats-disabled-message">
  <p>统计功能当前已禁用。</p>
</div>

<!--
<div v-if="isAuthenticated">
  <PostStatsAdmin />
</div>
<div v-else class="auth-form">
  <p>此页面仅管理员可访问，请输入密码：</p>
  <div class="form-group">
    <input 
      type="password" 
      v-model="password" 
      placeholder="请输入管理员密码" 
      @keyup.enter="authenticate"
    />
    <button @click="authenticate">验证</button>
  </div>
  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
</div>
-->

<style scoped>
.stats-disabled-message {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.auth-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-group {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--vp-c-brand-dark);
}

.error-message {
  color: #e53935;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>