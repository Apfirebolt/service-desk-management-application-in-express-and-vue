<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NButton, NCard, NSpace } from 'naive-ui';
import { darkTheme } from 'naive-ui';
import { ref } from 'vue';

const isDark = ref(false);
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-message-provider>
      <n-card title="Naive UI + TypeScript Setup" style="max-width: 600px; margin: 50px auto;">
        <n-space vertical>
          <p>Your Vue 3 + TypeScript project is successfully configured with Naive UI!</p>
          <n-space>
            <n-button type="primary" @click="isDark = !isDark">
              Toggle {{ isDark ? 'Light' : 'Dark' }} Theme
            </n-button>
          </n-space>
        </n-space>
      </n-card>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
body {
  margin: 0;
  font-family: v-sans, v-mono, sans-serif;
}
</style>