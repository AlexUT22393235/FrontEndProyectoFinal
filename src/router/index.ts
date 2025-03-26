import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';

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
      path: '/products',
      name:'product',
      component: () => import ('../views/SearchPage.vue')
    },
    {
      path: '/about',
      name:'about',
      component: () => import ('../views/AboutUs.vue')
    },

    {
      path: '/negotiating',          //  22393264
      name:'negotiating',
      component: () => import ('../views/InNegotiation.vue')
    },
   // En tu archivo de rutas (router/index.ts)

  { // Ruta por medio del id para detalles de producto 22393139
    path: '/products/:id', // Ruta dinámica con parámetro id
    name: 'product-detail',
    component: () => import('../views/ProductView.vue'),
    props: true // Permite pasar los params como props
   },

    {
      path: '/search/:busqueda',     //  22393264
      name:'search',
      component: () => import ('../views/SearchPage.vue')
    },
    {
      path: '/categories',
      name:'categories',
      component: () => import ('../views/Categories.vue')
    },
    {
      path: '/categories/:busqueda',//  22393264
      name:'category',
      component: () => import ('../views/SearchPage.vue')
    },
    {
      path: '/profile',
      name:'profile',
      component: () => import ('../views/UserProfileView.vue')
    },
    {
      path: '/createProfile',
      name:'createProfile',
      component: () => import ('../views/CreateProfile.vue')
    },
    {
      path : '/admin',
      name : 'dashboard-admin',
      component : () => import ('../views/Admin/Dashboard.vue')
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

// router.beforeEach((to, from) => {
//   const authStore = useAuthStore();

//   if (to.meta.requiresAuth && !authStore.isLoggedIn()) {

//     return { name: 'login' };
//   }
//   return true;
// });


export default router
