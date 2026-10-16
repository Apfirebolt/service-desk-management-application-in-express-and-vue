<script setup lang="ts">
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NMenu, NButton, NSpace } from 'naive-ui';
import { h, Component } from 'vue';
import { RouterLink } from 'vue-router';
import { HomeOutline, PersonOutline, SettingsOutline } from '@vicons/ionicons5';

const renderIcon = (icon: Component) => () => h(NIcon, null, { default: () => h(icon) });

const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/dashboard' }, { default: () => 'Overview' }),
    key: 'overview',
  },
  {
    label: () => h(RouterLink, { to: '/dashboard/profile' }, { default: () => 'Profile' }),
    key: 'profile',
  },
];
</script>

<template>
  <n-layout style="min-height: 100vh" has-sider>
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" show-trigger>
      <div style="padding: 16px; font-weight: bold; text-align: center;">Admin Panel</div>
      <n-menu :options="menuOptions" />
    </n-layout-sider>

    <n-layout>
      <n-layout-header bordered style="padding: 12px 24px; display: flex; justify-content: flex-end; align-items: center;">
        <n-space>
          <n-button size="small" tag="router-link" to="/">Back to Home</n-button>
        </n-space>
      </n-layout-header>

      <n-layout-content style="padding: 24px; background-color: #f5f7f9;">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>