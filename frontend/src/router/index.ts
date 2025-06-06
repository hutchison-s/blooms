// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import ConceptPage from '@/views/ConceptPage.vue';
import BrowsePage from '@/views/BrowsePage.vue';
import LibraryPage from '@/views/LibraryPage.vue';
import BookPage from '@/views/BookPage.vue';
import NotFound from '@/views/NotFound.vue';
import ErrorPage from '@/views/ErrorPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: BrowsePage
  },
  {
    path: '/library',
    name: 'Library',
    component: LibraryPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/concepts/:grade/:subject/:slug',
    name: 'Concept',
    component: ConceptPage
  },
  {
    path: '/books/:slug',
    name: 'Book',
    component: BookPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/error',
    name: 'Error',
    component: ErrorPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // This will use the HTML5 History API
  routes,
});

export default router;
