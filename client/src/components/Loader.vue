<script setup lang="ts">
import { NSpin, NSpace } from 'naive-ui';

withDefaults(
  defineProps<{
    show?: boolean;
    description?: string;
    size?: 'small' | 'medium' | 'large';
  >(),
  {
    show: true,
    description: 'Loading...',
    size: 'medium',
  }
);
</script>

<template>
  <div v-if="show" class="loader-overlay">
    <n-spin :size="size">
      <template #description>
        <span class="loader-text">{{ description }}</span>
      </template>
    </n-spin>
  </div>
</template>

<style scoped>
.loader-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  padding: 32px;
  box-sizing: border-box;
}

.loader-text {
  margin-top: 8px;
  font-size: 14px;
  color: #718096;
}
</style>