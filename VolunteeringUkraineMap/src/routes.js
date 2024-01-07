import Index from '@/pages/index.vue';
import NotFound from '@/pages/not-found.vue';
import Administration from '@/pages/admin.vue';

export const routes = [
  { path: '/', component: Index },
  { path: '/admin', component: Administration },
  { path: '/:path(.*)', component: NotFound },
];

export default routes;
