<script setup lang="ts">
import { ref, reactive } from 'vue';
import { 
  NCard, 
  NForm, 
  NFormItem, 
  NFormItemGi,
  NGrid,
  NInput, 
  NButton, 
  NCheckbox, 
  NSpace, 
  useMessage,
} from 'naive-ui';
import type { FormInst, FormRules } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const message = useMessage();

const formRef = ref<FormInst | null>(null);
const loading = ref(false);

const model = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
});

const rules: FormRules = {
  firstName: [
    { required: true, message: 'Please enter your first name', trigger: ['input', 'blur'] }
  ],
  lastName: [
    { required: true, message: 'Please enter your last name', trigger: ['input', 'blur'] }
  ],
  email: [
    { required: true, message: 'Please enter your email', trigger: ['input', 'blur'] },
    { type: 'email', message: 'Please enter a valid email address', trigger: ['blur'] }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: ['input', 'blur'] },
    { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur'] }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password', trigger: ['input', 'blur'] },
    { 
      validator: (rule, value) => value === model.password, 
      message: 'Passwords do not match', 
      trigger: ['input', 'blur'] 
    }
  ],
  terms: [
    { 
      validator: (rule, value) => value === true, 
      message: 'You must agree to the terms and conditions', 
      trigger: ['change', 'blur'] 
    }
  ]
};

const handleRegister = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      loading.value = true;
      // Simulate API registration request
      setTimeout(() => {
        loading.value = false;
        message.success('Registration successful! Please sign in.');
        router.push('/login');
      }, 1500);
    } else {
      message.error('Please fix the validation errors.');
    }
  });
};
</script>

<template>
  <div class="register-container">
    <n-card class="register-card" title="Create an Account" size="large" bordered>
      <template #header-extra>
        <span class="sub-text">Join ServiceDesk</span>
      </template>

      <n-form 
        ref="formRef" 
        :model="model" 
        :rules="rules"
        size="large"
      >
        <!-- First Name & Last Name Side-by-Side Grid -->
        <n-grid :x-gap="12" :cols="2">
          <n-form-item-gi path="firstName" label="First Name">
            <n-input v-model:value="model.firstName" placeholder="John" clearable />
          </n-form-item-gi>
          <n-form-item-gi path="lastName" label="Last Name">
            <n-input v-model:value="model.lastName" placeholder="Doe" clearable />
          </n-form-item-gi>
        </n-grid>

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
            placeholder="At least 6 characters" 
          />
        </n-form-item>

        <n-form-item path="confirmPassword" label="Confirm Password">
          <n-input 
            v-model:value="model.confirmPassword" 
            type="password" 
            show-password-on="mousedown"
            placeholder="Re-enter your password" 
          />
        </n-form-item>

        <n-form-item path="terms">
          <n-checkbox v-model:checked="model.terms">
            I agree to the <n-button text type="primary">Terms and Conditions</n-button>
          </n-checkbox>
        </n-form-item>

        <n-space vertical>
          <n-button 
            type="primary" 
            block 
            size="large" 
            :loading="loading"
            @click="handleRegister"
          >
            Create Account
          </n-button>
        </n-space>

        <div class="login-redirect">
          <span>Already have an account? </span>
          <n-button text type="primary" @click="router.push('/login')">
            Sign In
          </n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 16px;
}

.register-card {
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.sub-text {
  font-size: 14px;
  color: #718096;
  font-weight: normal;
}

.login-redirect {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #718096;
}
</style>