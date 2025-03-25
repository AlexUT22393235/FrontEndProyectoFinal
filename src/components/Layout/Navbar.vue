<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <div class="navbar">
    <div class="logo-container">
      <!-- Logo alineado a la izquierda -->
      <img src="@/assets/Images/logostrade.png" alt="Logo Strade" class="logo">
    </div>
    <nav class="nav-links">
      <RouterLink to="/landing">Inicio</RouterLink>
      <RouterLink to="/negotiating">Negociando</RouterLink>
      <RouterLink to="/products">Productos</RouterLink>
      <RouterLink to="/categories">Categorias</RouterLink>
      <RouterLink to="/about">Nosotros</RouterLink>
      <div>
        <button @click="handleLogout" class="logout-button">Cerrar Sesión</button>
      </div>
      <RouterLink to="/profile">
        <div class="relative bg-yellow-500 w-[4vh] h-[4vh] rounded-full">
          <img src="https://ninguno.com.mx" alt="" />
        </div>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px; /* Reducir tamaño del logo */
  height: auto;
}

.nav-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center; /* Alinea verticalmente los elementos */
  flex-grow: 1;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.nav-links a:hover {
  color: #128c7e;
}

.logout-button {
  font-size: 16px;
  padding: 5px 10px;
  background-color: #638354;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #2fd36e;
}
</style>
