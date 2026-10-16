<script setup lang="ts">
import { NLayoutFooter, NSpace, NButton, NDivider } from 'naive-ui';
import { ShieldCheckmarkOutline, HelpCircleOutline, DocumentTextOutline } from '@vicons/ionicons5';
</script>

<template>
  <n-layout-footer bordered class="app-footer">
    <div class="footer-content">
      <!-- Left: Copyright & Status -->
      <div class="footer-left">
        <span class="copyright">© 2026 ServiceDesk Management. All rights reserved.</span>
        <div class="status-badge">
          <span class="status-dot"></span>
          <span>All Systems Operational</span>
        </div>
      </div>

      <!-- Right: Quick Links -->
      <div class="footer-right">
        <n-space align="center" :size="16">
          <n-button text tag="router-link" to="/docs">
            <template #icon>
              <n-icon><DocumentTextOutline /></n-icon>
            </template>
            Documentation
          </n-button>

          <n-button text tag="router-link" to="/support">
            <template #icon>
              <n-icon><HelpCircleOutline /></n-icon>
            </template>
            Support
          </n-button>

          <n-button text tag="router-link" to="/privacy">
            <template #icon>
              <n-icon><ShieldCheckmarkOutline /></n-icon>
            </template>
            Privacy
          </n-button>
        </n-space>
      </div>
    </div>
  </n-layout-footer>
</template>

<style scoped>
.app-footer {
  padding: 16px 24px;
  background-color: transparent;
  box-sizing: border-box;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 13px;
  color: #718096;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  color: #18a058; /* Naive UI success color */
  background-color: rgba(24, 160, 88, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #18a058;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
}

.footer-right :deep(.n-button) {
  font-size: 13px;
  color: #718096;
}

.footer-right :deep(.n-button):hover {
  color: #2080f0;
}
</style>