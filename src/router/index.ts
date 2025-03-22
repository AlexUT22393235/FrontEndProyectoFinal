import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// import { HomePage } from '../views/HomePage.vue'
// import { LoginView } from '../views/Auth/LoginView.vue'
// import { RegisterView } from '../views/Auth/RegisterView.vue'
// import { ProfileView } from '../views/ProfileView.vue'
// import { NotFoundView } from '../views/NotFoundView.vue'
import LandingPage from '../views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
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
      path: '/product',// Nueva ruta para la vista de producto Fernando Gomez Toledo 22393139
      name:'product',
      component: () => import ('../views/ProductView.vue')
    },

    {
      path: '/negotiating',//  22393264
      name:'negotiating',
      component: () => import ('../views/InNegotiation.vue')
    },

    {
      path: '/search',//  22393264
      name:'search',
      component: () => import ('../views/SearchPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/Sistem/404View.vue'),
    },

    //Hacen falta rutas de nosotros, productos y categoria, perfil, productos y categorias puede ser una misma vista?
    //Negotiating tiene que ser integrada en el perfil




  ],
})

export default router
