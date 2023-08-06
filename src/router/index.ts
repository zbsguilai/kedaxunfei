import { createWebHistory, createRouter } from 'vue-router';
// import type { RouteRecordRaw } from 'vue-router';

// 公共路由
export const constantRoutes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
