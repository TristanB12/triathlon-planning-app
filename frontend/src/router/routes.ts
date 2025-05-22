import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: { isPublic: true },
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        meta: { isPublic: true },
        component: () => import('pages/auth/RegisterPage.vue'),
      }
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
