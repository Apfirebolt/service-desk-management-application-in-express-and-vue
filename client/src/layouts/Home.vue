<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NSpace, NButton } from 'naive-ui';
</script>

<template>
  <n-layout style="min-height: 100vh">
    <n-layout-header bordered style="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;">
      <h2>My Public App</h2>
      <n-space>
        <n-button quaternary tag="router-link" to="/">Home</n-button>
        <n-button quaternary tag="router-link" to="/login">Login</n-button>
        <n-button type="primary" tag="router-link" to="/dashboard">Dashboard</n-button>
      </n-space>
    </n-layout-header>

    <n-layout-content style="padding: 24px;">
      <router-view />
    </n-layout-content>

    <n-layout-footer bordered style="padding: 16px 24px; text-align: center;">
      <p>© 2026 My App. All rights reserved.</p>
    </n-layout-footer>
  </n-layout>
</template>