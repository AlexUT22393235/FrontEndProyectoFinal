<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <div class="navbar">
    <!-- Logo alineado a la izquierda -->
    <div class="logo-container">
      <img src="@/assets/Images/logostrade.png" alt="Logo Strade" class="logo"> <h1 class="text-2xl font-bold text-green-900 pl-4">
        STRADE
      </h1>
    </div>

    <!-- Enlaces de navegación centrados -->
    <nav class="nav-links">
      <RouterLink to="/landing">Inicio</RouterLink>
      <RouterLink to="/negotiating">Negociando</RouterLink>
      <RouterLink to="/products">Productos</RouterLink>
      <RouterLink to="/categories">Categorias</RouterLink>
      <RouterLink to="/about">Nosotros</RouterLink>
    </nav>

    <!-- Botón de cerrar sesión y foto de perfil alineados a la derecha -->
    <div class="right-align">
      <button @click="handleLogout" class="logout-button">Cerrar Sesión</button>
      <RouterLink to="/profile">
        <div class="relative bg-yellow-500 w-[4vh] h-[4vh] rounded-full">
          <img src="" alt="Foto de perfil" class="profile-pic" />
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between; /* Espaciado entre logo, enlaces y elementos de la derecha */
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
  justify-content: center; /* Centrar los enlaces */
  align-items: center;
  flex-grow: 1; /* Permitir que los enlaces ocupen el espacio central */
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.nav-links a:hover {
  color: #128c7e;
}

.right-align {
  display: flex;
  gap: 15px;
  align-items: center;
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

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
