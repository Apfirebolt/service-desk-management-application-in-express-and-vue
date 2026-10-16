import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { createDiscreteApi } from 'naive-ui';

// Layouts
import PublicLayout from '@/layouts/Public.vue';
import DashboardLayout from '@/layouts/Dashboard.vue';

// Views
import HomeView from '@/views/Home.vue';
import LoginView from '@/views/Login.vue';
import RegisterView from '@/views/Register.vue';
import DashboardView from '@/views/Dashboard.vue';
import ProfileView from '@/views/Profile.vue';

// Create a discrete loading bar instance for route transitions
const { loadingBar } = createDiscreteApi(['loadingBar']);

const routes: Array<RouteRecordRaw> = [
  // Public Routes (Home, Login, Register)
  {
    path: '/',
    component: PublicLayout,
    children: [
      { 
        path: '', 
        name: 'Home', 
        component: HomeView,
        meta: { title: 'Home | ServiceDesk' }
      },
      { 
        path: 'login', 
        name: 'Login', 
        component: LoginView,
        meta: { title: 'Sign In | ServiceDesk' }
      },
      { 
        path: 'register', 
        name: 'Register', 
        component: RegisterView,
        meta: { title: 'Create Account | ServiceDesk' }
      },
    ],
  },
  // Dashboard / Admin Protected Routes
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { 
        path: '', 
        name: 'Dashboard', 
        component: DashboardView,
        meta: { title: 'Dashboard | ServiceDesk' }
      },
      { 
        path: 'profile', 
        name: 'Profile', 
        component: ProfileView,
        meta: { title: 'User Profile | ServiceDesk' }
      },
    ],
  },
  // Catch-all redirect to Home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Global navigation guards for loading bar & page titles
router.beforeEach((to, _from, next) => {
  loadingBar.start();
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

router.afterEach(() => {
  loadingBar.finish();
});

export default router;