<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Layout/Navbar.vue';
import Footer from './components/Layout/Footer.vue';

const route = useRoute();
const isAuthPage = computed(() => route.path === '/login' || route.path === '/register' || route.name === '404');
</script>

<template>
  <!-- Header -->
  <header v-if="!isAuthPage">
    <Navbar />
  </header>

  <!-- Contenido principal -->
  <RouterView />

  <!-- Footer -->
  <footer v-if="!isAuthPage">
    <Footer />
  </footer>
</template>
