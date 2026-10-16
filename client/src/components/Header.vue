<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NSpace, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <n-layout style="min-height: 100vh">
    <n-layout-header bordered class="header-bar">
      <h2 class="brand-logo" @click="router.push('/')">ServiceDesk</h2>
      <n-space>
        <n-button quaternary tag="router-link" to="/">Home</n-button>
        <n-button quaternary tag="router-link" to="/login">Login</n-button>
        <n-button type="primary" tag="router-link" to="/register">Register</n-button>
      </n-space>
    </n-layout-header>

    <n-layout-content style="padding: 24px;">
      <router-view />
    </n-layout-content>

    <n-layout-footer bordered style="padding: 16px 24px; text-align: center;">
      <p>© 2026 ServiceDesk Management. All rights reserved.</p>
    </n-layout-footer>
  </n-layout>
</template>

<style scoped>
.header-bar {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  margin: 0;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: -0.5px;
}
</style>