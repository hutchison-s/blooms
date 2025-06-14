// src/router/index.ts
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import BrowsePage from '@/views/BrowsePage.vue'
import LibraryPage from '@/views/LibraryPage.vue'
import BookPage from '@/views/BookPage.vue'
import NotFound from '@/views/NotFound.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import TopicPage from '@/views/TopicPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: BrowsePage,
  },
  {
    path: '/library',
    name: 'Library',
    component: LibraryPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/concepts/:grade/:subject/:slug',
    name: 'Topic',
    component: TopicPage,
  },
  {
    path: '/books/:slug',
    name: 'Book',
    component: BookPage,
  },
  {
    path: '/:pathMatch(.*)*',
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      if (to.path === '/sitemap.xml') {
        window.location.href = to.path
      } else {
        next()
      }
    },
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/error',
    name: 'Error',
    component: ErrorPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // This will use the HTML5 History API
  routes,
})

export default router
