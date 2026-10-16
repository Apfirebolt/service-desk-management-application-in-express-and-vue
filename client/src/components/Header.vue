<script setup lang="ts">
import { ref, Component } from 'vue';
import { 
  NLayoutHeader, 
  NButton, 
  NDropdown, 
  NSpace, 
  NAvatar, 
  useMessage,
  DropdownOption,
  NIcon
} from 'naive-ui';
import { useRouter } from 'vue-router';
import { 
  PersonOutline, 
  SettingsOutline, 
  LogOutOutline, 
  MoonOutline, 
  SunOutline 
} from '@vicons/ionicons5';

const router = useRouter();
const message = useMessage();

// Props for customization (e.g. tracking dark mode state)
defineProps<{
  isDark?: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-theme'): void;
}>();

// Helper to render icons in dropdown
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

// User dropdown menu options
const userMenuOptions: DropdownOption[] = [
  {
    label: 'Profile',
    key: 'profile',
    icon: renderIcon(PersonOutline)
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: renderIcon(SettingsOutline)
  },
  {
    type: 'divider',
    key: 'divider'
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: renderIcon(LogOutOutline)
  }
];

const handleUserMenuSelect = (key: string) => {
  if (key === 'profile') {
    router.push('/dashboard/profile');
  } else if (key === 'settings') {
    message.info('Opening settings...');
  } else if (key === 'logout') {
    message.success('Logged out successfully');
    router.push('/login');
  }
};
</script>

<template>
  <n-layout-header bordered class="app-header">
    <!-- Brand / Logo -->
    <div class="header-left" @click="router.push('/')">
      <div class="logo-badge">SD</div>
      <span class="brand-title">ServiceDesk</span>
    </div>

    <!-- Navigation Actions -->
    <div class="header-right">
      <n-space align="center" :size="16">
        <!-- Theme Toggle Button -->
        <n-button quaternary circle @click="emit('toggle-theme')">
          <template #icon>
            <component :is="isDark ? SunOutline : MoonOutline" />
          </template>
        </n-button>

        <!-- User Dropdown Profile -->
        <n-dropdown 
          trigger="click" 
          :options="userMenuOptions" 
          @select="handleUserMenuSelect"
        >
          <div class="user-profile-trigger">
            <n-avatar
              round
              size="medium"
              src="https://07.cdn.allfinest.com/uploads/posts/2016-03/1458296238_funny-cat-avatars-05.jpg"
            />
            <span class="user-name">Amit P.</span>
          </div>
        </n-dropdown>
      </n-space>
    </div>
  </n-layout-header>
</template>

<style scoped>
.app-header {
  height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-badge {
  width: 36px;
  height: 36px;
  background-color: #2080f0;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.brand-title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.user-profile-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 20px;
  transition: background-color 0.2s;
}

.user-profile-trigger:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.user-name {
  font-weight: 500;
  font-size: 14px;
}
</style>