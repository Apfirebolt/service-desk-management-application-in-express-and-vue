<script setup lang="ts">
import { ref, reactive } from 'vue';
import { 
  NCard, 
  NForm, 
  NFormItem, 
  NInput, 
  NButton, 
  NCheckbox, 
  NSpace, 
  useMessage 
} from 'naive-ui';
import type { FormInst, FormRules } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const message = useMessage();

const formRef = ref<FormInst | null>(null);
const loading = ref(false);

const model = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const rules: FormRules = {
  email: [
    { required: true, message: 'Please enter your email', trigger: ['input', 'blur'] },
    { type: 'email', message: 'Please enter a valid email address', trigger: ['blur'] }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: ['input', 'blur'] },
    { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur'] }
  ]
};

const handleLogin = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        message.success('Login successful!');
        router.push('/dashboard');
      }, 1500);
    } else {
      message.error('Please fix the validation errors.');
    }
  });
};
</script>

<template>
  <div class="login-container">
    <n-card class="login-card" title="Welcome Back" size="large" bordered>
      <template #header-extra>
        <span class="sub-text">Sign in to your account</span>
      </template>

      <n-form 
        ref="formRef" 
        :model="model" 
        :rules="rules"
        size="large"
      >
        <n-form-item path="email" label="Email Address">
          <n-input 
            v-model:value="model.email" 
            placeholder="name@example.com" 
            clearable
          />
        </n-form-item>

        <n-form-item path="password" label="Password">
          <n-input 
            v-model:value="model.password" 
            type="password" 
            show-password-on="mousedown"
            placeholder="Enter your password" 
          />
        </n-form-item>

        <div class="form-actions">
          <n-checkbox v-model:checked="model.rememberMe">Remember me</n-checkbox>
          <n-button text type="primary">Forgot password?</n-button>
        </div>

        <n-space vertical style="margin-top: 24px;">
          <n-button 
            type="primary" 
            block 
            size="large" 
            :loading="loading"
            @click="handleLogin"
          >
            Sign In
          </n-button>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 16px;
}

.login-card {
  width: 100%;
  max-width: 440px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.sub-text {
  font-size: 14px;
  color: #718096;
  font-weight: normal;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -4px;
}
</style>