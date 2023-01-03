import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from '../store/store';
import DashboardLayout from '../layouts/dashboard';
import EmptyLayout from '../layouts/empty.vue';
import AdminLayout from '../layouts/admin.vue';
import StaffLayout from '../layouts/staff.vue';
import * as authTypes from '../store/modules/auth/auth-types';
import VueMeta from 'vue-meta'

Vue.use(VueRouter);
Vue.use(VueMeta)

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
    children: [
      {
        path: '',
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
    path: '/staff',
    component: StaffLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'StaffComplaints',
        component: () => import('../screens/staff/assignedComplaints.vue'),
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
  { 
    path: "*", 
    name: 'NotFound',
    component: () => import('../screens/404.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
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
