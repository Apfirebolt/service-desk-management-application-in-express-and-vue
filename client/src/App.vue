<script setup lang="ts">
import { ref } from 'vue';
import { 
  NConfigProvider, 
  NMessageProvider, 
  NLoadingBarProvider, 
  NButton, 
  NFloatButton, 
  NIcon 
} from 'naive-ui';
import { darkTheme } from 'naive-ui';
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5';

const isDark = ref(false);
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-loading-bar-provider>
      <n-message-provider>
        <!-- Main application router view -->
        <router-view />

        <!-- Floating Theme Toggle Button for Quick Access -->
        <n-float-button 
          position="fixed" 
          :right="24" 
          :bottom="24" 
          type="primary" 
          shape="circle"
          @click="isDark = !isDark"
          title="Toggle Theme"
        >
          <n-icon size="20">
            <component :is="isDark ? SunnyOutline : MoonOutline" />
          </n-icon>
        </n-float-button>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style>
body {
  margin: 0;
  font-family: v-sans, v-mono, sans-serif;
  background-color: var(--n-color);
  color: var(--n-text-color);
}
</style>