<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ref, onMounted } from 'vue';
import axios from 'axios';


const authStore = useAuthStore();
const user = ref<{
  id: number;
  nombre: string;
  fotoPerfil?: string;
  userProfile?: {
    idPerfil: number;
    imagenPerfil: string;
  };
} | null>(null); // Cambiado a `null` inicialmente para evitar acceso a propiedades de `undefined`

const handleLogout = () => {
  authStore.logout();
};

const fetchUserDetails = async (usuarioId: number) => {
  try {
    console.log('Fetching user details for usuarioId:', usuarioId);

    const userResponse = await axios.get(`https://localhost:7140/api/Usuario/${usuarioId}`);
    if (userResponse.data) {
      user.value = userResponse.data;
    }

    const profileResponse = await axios.get(`https://localhost:7140/api/Perfil/${usuarioId}`);
    if (user.value) {
      user.value.userProfile = profileResponse.data;
    }

    console.log('User data received:', user.value);
  } catch (error) {
    console.error('Error al obtener los datos del usuario o perfil:', error);
  }
};

onMounted(() => {
  const userId = authStore.user?.id; // Obtener directamente el ID del usuario autenticado
  console.log('Usuario logeado ID:', userId); // Verificar si se está obteniendo el ID del usuario correctamente
  if (userId) {
    fetchUserDetails(userId);
  } else {
    console.log('No se encontró un usuarioId válido.');
  }
});

</script>


<template>
  <div class="navbar">
    <div class="logo-container">
      <img src="@/assets/Images/logostrade.png" alt="Logo Strade" class="logo"> <h1 class="text-2xl font-bold text-green-900 pl-4">
        STRADE
      </h1>
    </div>

    <nav class="nav-links">
      <RouterLink to="/landing">Inicio</RouterLink>
      <RouterLink to="/products">Productos</RouterLink>
      <RouterLink to="/categories">Categorias</RouterLink>
      <RouterLink to="/about">Nosotros</RouterLink>
    </nav>


    <div class="right-align">
      <button @click="handleLogout" class="logout-button">Cerrar Sesión</button>


                  <RouterLink :to="authStore.user?.id ? `/perfil/${authStore.user?.id}` : '/login'">
                    <div class="relative bg-yellow-500 w-[4vh] h-[4vh] rounded-full">
                      <img
                        :src="user?.userProfile?.imagenPerfil"
                        alt="Foto de perfil"
                        class="w-full h-full object-cover rounded-full"
                      />
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
  color: #638354;
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
