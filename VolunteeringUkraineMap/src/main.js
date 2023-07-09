import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'leaflet/dist/leaflet.css';
import '@/assets/styles/fonts.css';
import '@/assets/styles/tailwind.css';
import App from '@/App.vue';
import { routes } from '@/routes.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
