<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

//22393139
const isOpen = ref(false); // Controla la visibilidad del menú móvil
const isLogoutModalOpen = ref(false);
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
const logoutImage = ref("src/assets/Images/angry.png");
const changeImage = (newSrc: string) => {
  logoutImage.value = newSrc;
};

const resetImage = () => {
  logoutImage.value = "src/assets/Images/logout.png";
};
const confirmLogout = () => {
  // Muestra el modal de confirmación en lugar de cerrar sesión inmediatamente
  isLogoutModalOpen.value = true;
};

const cancelLogout = () => {
  isLogoutModalOpen.value = false;
};

const proceedLogout = () => {
  isLogoutModalOpen.value = false;
  handleLogout();
};

const fetchUserDetails = async (usuarioId: number) => {
  try {
    const userResponse = await axios.get(`https://localhost:7140/api/Usuario/${usuarioId}`);
    if (userResponse.data) {
      authStore.user = { ...authStore.user, ...userResponse.data };
    }
    const profileResponse = await axios.get(`https://localhost:7140/api/Perfil/${usuarioId}`);
    if (authStore.user) {
      authStore.user.userProfile = profileResponse.data;
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario o perfil:', error);
  }
};
const formValue = ref();
const router = useRouter()

const submitSearch = async () => {
  try {
    const newParam = encodeURI(formValue.value);
    router.push('/search/' + newParam)
  } catch (error) {
    console.error(error);
  }
}

import { watch } from 'vue';

onMounted(() => {
  const userId = authStore.user?.id;
  console.log('Usuario logeado ID:', userId);
  if (userId) {
    fetchUserDetails(userId);
  }
});

watch(
  () => user.value?.userProfile,
  (newVal) => {
    console.log('userProfile changed:', newVal);
  }
);

</script>

<template>
  <nav class="bg-[#FDF8F1] border-b border-gray-300 px-4 py-3">
    <!-- Contenedor principal -->
    <div class="flex  justify-between ">
      <!-- Logo y nombre -->
      <div class="w-fit flex items-center">
        <img src="@/assets/Images/logostrade.png" alt="Logo Strade" class="w-10 h-10">
        <h1 class="text-xl font-bold text-green-900 pl-3">STRADE</h1>
      </div>
      <div class="w-[70rem] flex flex-row gap-[2rem]">
        <div class="w-full px-10 ">
          <!-- Menú de navegación -->
          <nav class="flex items-center flex-row justify-between h-full">
            <RouterLink to="/landing"><label class="text-green-800 hover:text-teal-600 cursor-pointer">Inicio</label></RouterLink>
            <RouterLink to="/products"><label class="text-green-800 hover:text-teal-600 cursor-pointer">Productos</label></RouterLink>
            <RouterLink to="/misProductos"><label class="text-green-800 hover:text-teal-600 cursor-pointer">Mis Productos</label></RouterLink>
            <RouterLink to="/evaluacionPendientes" class="text-green-800 hover:text-teal-600 cursor-pointer">Evaluar Intercambios</RouterLink>
            <RouterLink to="/categories"><label class="text-green-800 hover:text-teal-600 cursor-pointer">Categorias</label></RouterLink>
            <RouterLink to="/about"><label class="text-green-800 hover:text-teal-600 cursor-pointer">Nosotros</label></RouterLink>
          </nav>
        </div>
        <div class="hidden md:flex items-center w-fit">
          <!-- Barra de búsqueda -->
          <form class="flex items-center justify-center gap-2 w-full max-w-md" @submit.prevent="submitSearch">
            <input v-model="formValue" placeholder="Pantuflas amarillas"
              class="placeholder:italic bg-gray-200 rounded-lg w-[15rem] h-8">
            <button type="submit" class="cursor-pointer w-9 h-fit">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#638354" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <!-- Elementos desktop (ocultos en móvil) -->
<!-- Botones de usuario (ocultos en móvil) -->
<div v-if="authStore.user" class="hidden md:flex items-center gap-3">
  <button @click="confirmLogout" class="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-600">
    Cerrar Sesión
  </button>

  <RouterLink :to="`/perfil/${authStore.user.id}`">
    <div class="bg-yellow-500 w-8 h-8 rounded-full overflow-hidden">
      <img :src="authStore.user.userProfile?.imagenPerfil" alt="" class="w-full h-full object-cover" />
      <p></p>
    </div>
  </RouterLink>
</div>


      <!-- Botón hamburguesa (solo móvil) -->
      <button @click="isOpen = !isOpen" class="md:hidden p-2 rounded-md text-green-800 focus:outline-none">
        <svg class="w-6 h-6" :class="{ 'hidden': isOpen, 'block': !isOpen }" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg class="w-6 h-6" :class="{ 'hidden': !isOpen, 'block': isOpen }" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Menú móvil (condicional) -->
    <div class="md:hidden" :class="{ 'block': isOpen, 'hidden': !isOpen }">
      <div class="pt-4 pb-2 space-y-3">
        <!-- Barra de búsqueda móvil -->
        <form class="flex items-center gap-2 mb-4" @submit.prevent="submitSearch">
          <input v-model="formValue" placeholder="Pantuflas amarillas"
            class="placeholder:italic bg-gray-200 rounded-lg w-full h-10 px-3">
          <button type="submit" class="cursor-pointer w-6 h-6">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#638354" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
        </form>

        <!-- Enlaces móviles -->
        <RouterLink to="/landing" class="block px-3 py-2 text-green-800 hover:bg-gray-100 rounded"
          @click="isOpen = false">
          Inicio
        </RouterLink>
        <RouterLink to="/products" class="block px-3 py-2 text-green-800 hover:bg-gray-100 rounded"
          @click="isOpen = false">
          Productos
        </RouterLink>
        <RouterLink to="/categories" class="block px-3 py-2 text-green-800 hover:bg-gray-100 rounded"
          @click="isOpen = false">
          Categorias
        </RouterLink>
        <RouterLink to="/about" class="block px-3 py-2 text-green-800 hover:bg-gray-100 rounded"
          @click="isOpen = false">
          Nosotros
        </RouterLink>

        <!-- Botones de usuario móviles -->
        <div class="pt-4 mt-4 border-t border-gray-200 flex items-center gap-3">
          <button @click="handleLogout" class="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600">
            Cerrar Sesión
          </button>

          <RouterLink :to="authStore.user?.id ? `/perfil/${authStore.user?.id}` : '/login'" @click="isOpen = false">
            <div class="bg-yellow-500 w-10 h-10 rounded-full overflow-hidden">
              <img :src="user?.userProfile?.imagenPerfil" alt="Foto de perfil" class="w-full h-full object-cover" />
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <div v-if="isLogoutModalOpen" class="fixed inset-0 flex items-center justify-center backdrop-blur-2xl z-50">
      <div class="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
        <h3 class="text-lg font-bold mb-4 text-[#5d7e4e]">¿Estás seguro que deseas cerrar sesión?</h3>
        <img :src="logoutImage" class="w-100 h-auto mx-auto mb-4">

        <div class="flex justify-around">
          <button @click="proceedLogout" @mouseenter="changeImage('src/assets/Images/logout.png')"
            class="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600">Sí</button>
          <button @click="cancelLogout" @mouseenter="changeImage('src/assets/Images/happy.png')"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">No</button>
        </div>
      </div>
    </div>
  </nav>
</template>
