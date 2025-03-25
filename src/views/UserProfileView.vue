<template>
  <div class="bg-[#5B735D] flex flex-col md:flex-row w-full h-auto items-center justify-center px-10 py-12">
    <img src="@/assets/Images/noTrash.jpeg" alt="Logo" class="w-40 h-40 md:w-60 md:h-60 rounded-full shadow-lg" />
    <div class="text-center md:text-left md:ml-10 text-4xl text-[#FAF7EC]">
      {{ userData?.nombre || 'Nombre de Usuario' }} {{ userData?.apellido || '' }}

      <p class="text-white text-lg mt-4 max-w-xl leading-relaxed">
        Descripción del usuario. Información relevante sobre su perfil, habilidades o intereses.
      </p>
    </div>
  </div>




  <div class="bg-[#f5f7ea] flex flex-col w-full items-center justify-center p-8">
    <button @click="openModal" class="mt-8 px-6 py-3 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A]">
      Agregar Producto
    </button>




    <div class="w-full max-w-7xl p-8 flex flex-col md:flex-row gap-8">
     <!-- Historial de Intercambios -->
      <div class="w-full md:w-1/2">
        <h2 class="text-3xl font-bold mb-6 text-center md:text-left">Historial de Intercambios</h2>
        <ExchangeHistory :exchanges="exchanges" />
      </div>

      <!-- Historial de Valoraciones -->
      <div class="w-full md:w-1/2">
        <h2 class="text-3xl font-bold mb-6 text-center md:text-left">Historial de Revisiones</h2>
        <Valorations />
      </div>
    </div>
  </div>

  <AddProductModal v-if="isModalOpen" :isOpen="isModalOpen" @close="closeModal" @submit="handleSubmit" />

</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';


import AddProductModal from '@/components/AddProductModal.vue';
import ExchangeHistory from '@/components/ExchangeHistory.vue';
import Valorations from '@/components/Valorations.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);


const userData = ref(null);

console.log('🔹 ID del usuario desde el token:', user.value?.id);


const fetchUserData = async () => {
  if (!user.value?.id) {
    console.error('⚠ No se encontró el ID del usuario en el token.');
    return;
  }

  try {
    const response = await axios.get('https://localhost:7140/api/Usuario');

    console.log(' Datos obtenidos de la API:', response.data);

    if (response.status === 200) {
      const userId = Number(user.value?.id);
      const foundUser = response.data.find((u: any) => Number(u.idUsuario) === userId);

      console.log(' ID del usuario filtrado:', userId);
      console.log(' Usuario encontrado:', foundUser);

      userData.value = foundUser ?? null;
    }
  } catch (error) {
    console.error(' Error obteniendo datos del usuario:', error);
  }
};


onMounted(fetchUserData);


const isModalOpen = ref(false);


const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);


const handleSubmit = (product: any) => {
  console.log('🛍 Producto agregado:', product);
};

const exchanges = ref([
  {
    productTitle: 'Sofá',
    date: '2025-02-05',
    exchangedProducts: ['Sofá', 'Sofá Cama'],
    description: 'Un sofá cómodo y en buen estado, perfecto para tu sala.',
    image: 'https://www.sofaclub.es/blog/imagenes/claves-para-comprar-un-sofa-1-1024x640.jpg',
  },
  {
    productTitle: 'Control de Xbox',
    date: '2024-10-07',
    exchangedProducts: ['Control Xbox', 'Disco FIFA 24'],
    description: 'Control de Xbox en excelentes condiciones, con garantía.',
    image: 'https://gorilagames.com/img/Public/1019-producto-joystick-control-xbox-series-carbon-black-1-145.jpg',
  },
]);
</script>
