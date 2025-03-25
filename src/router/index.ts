import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';


// import { HomePage } from '../views/HomePage.vue'
// import { LoginView } from '../views/Auth/LoginView.vue'
// import { RegisterView } from '../views/Auth/RegisterView.vue'
// import { ProfileView } from '../views/ProfileView.vue'
// import { NotFoundView } from '../views/NotFoundView.vue'
// import LandingPage from '../views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-login',
      component: ()=>import('../views/Auth/LoginView.vue'),
    },
    {
      path: '/landing',
      name: 'LandingPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LandingPage.vue')
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
      component: () => import ('../views/ProductView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name:'about',
      component: () => import ('../views/AboutUs.vue'),
      meta: { requiresAuth: false }
    },

    {
      path: '/negotiating',          //  22393264
      name:'negotiating',
      component: () => import ('../views/InNegotiation.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/products',             //  22393264
      name:'products',
      component: () => import ('../views/SearchPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/search/:busqueda',     //  22393264
      name:'search',
      component: () => import ('../views/SearchPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/categories',
      name:'categories',
      component: () => import ('../views/Categories.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/categories/:busqueda',//  22393264
      name:'category',
      component: () => import ('../views/SearchPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/profile',
      name:'profile',
      component: () => import ('../views/UserProfileView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path : '/admin',
      name : 'dashboard-admin',
      component : () => import ('../views/Admin/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path : '/admin/categories',
      name : 'admincategories',
      component : () => import ('../views/Admin/CrudCategorias.vue')
    },

    {
      path : '/admin/products',
      name : 'adminproducts',
      component : () => import ('../views/Admin/CrudProducts.vue')
    },

    {
      path : '/admin/users',
      name : 'adminusers',
      component : () => import ('../views/Admin/CrudUsers.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/Sistem/404View.vue'),
      meta: { requiresAuth: true }
    },

    //Hacen falta rutas de nosotros, productos y categoria, perfil, productos y categorias puede ser una misma vista?
    //Negotiating tiene que ser integrada en el perfil




  ],
});

// Guard de navegación global
router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn()) {

    return { name: 'login' };
  }
  return true;
});

export default router
