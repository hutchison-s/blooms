// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import ConceptPage from '@/views/ConceptPage.vue';
import Browse from '@/views/Browse.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Browse
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/concepts/:grade/:subject/:slug',
    name: 'Concept',
    component: ConceptPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // This will use the HTML5 History API
  routes,
});

export default router;
