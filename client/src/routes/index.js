import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from '../store/store';
import EmptyLayout from '../layouts/empty.vue';
import * as authTypes from '../store/modules/auth/auth-types';

Vue.use(VueRouter);

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
