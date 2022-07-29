import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from '../store/store';
import DashboardLayout from '../layouts/dashboard';
import EmptyLayout from '../layouts/empty.vue';
import AdminLayout from '../layouts/admin.vue';
import * as authTypes from '../store/modules/auth/auth-types';

Vue.use(VueRouter);

const adminAuthGuard = (to, from, next) => {
  if (store.state.auth) {
    const userData = store.state.auth;
    console.log('User data is ', store.getters)
  }
  next();
}


const routes = [
  {
    path: '/',
    component: EmptyLayout,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../screens/home.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../screens/auth/login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../screens/auth/register.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
    },
    beforeEnter : adminAuthGuard,
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('../screens/admin/adminHome.vue'),
      },
      {
        path: 'complaints',
        name: 'AdminComplaints',
        component: () => import('../screens/admin/complaintList.vue'),
      },
      {
        path: 'departments',
        name: 'AdminDepartments',
        component: () => import('../screens/admin/departmentList.vue'),
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../screens/admin/userList.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../screens/auth/profile.vue'),
      },
      {
        path: 'complaints',
        name: 'ComplaintsHome',
        component: () => import('../screens/complaints/list.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const allowedRoutes = ['Login', 'Register', 'Home'];
  if (allowedRoutes.indexOf(to.name) === -1) {
    // Protected routes, load profile data if not available in vuex store
    if (!store.state.auth.profileData) {
      store.dispatch(authTypes.GET_PROFILE_DATA_ACTION);
    }
  }
  next();
});

export default router;
