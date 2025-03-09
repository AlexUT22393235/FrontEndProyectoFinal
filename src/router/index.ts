import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// import { HomePage } from '../views/HomePage.vue'
// import { LoginView } from '../views/Auth/LoginView.vue'
// import { RegisterView } from '../views/Auth/RegisterView.vue'
// import { ProfileView } from '../views/ProfileView.vue'
// import { NotFoundView } from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/landing',
      name: 'LandingPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
     
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/Sistem/404View.vue'),
    },
   
  ],
})

export default router
