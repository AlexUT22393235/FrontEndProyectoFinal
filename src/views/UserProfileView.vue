<template>
  <div class="bg-[#5B735D] flex flex-col md:flex-row w-full h-auto items-center justify-center px-10 py-12">
    <img src="@/assets/Images/noTrash.jpeg" alt="Logo" class="w-40 h-40 md:w-60 md:h-60 rounded-full shadow-lg" />
     <!-- Datos del perfil del usuario -->
     <div v-if="userProfile" class="mt-8 md:mt-0 md:ml-10 text-center md:text-left">
      <!-- Nombre del perfil -->
      <h2 class="text-3xl font-bold text-white mb-2">{{ userProfile.nombrePerfil }}</h2>

      <!-- Imagen de perfil -->
      <img :src="userProfile.imagenPerfil" alt="Imagen de perfil" class="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg mx-auto md:mx-0" />

      <!-- Descripción del perfil -->
      <p class="text-lg text-white mt-4">{{ userProfile.descripcion }}</p>
    </div>

    <!-- Mensaje si no se encuentra el perfil -->
    <div v-else>
      <p class="text-white">No se encontró un perfil para este usuario.</p>
    </div>
 
  </div>




  <div class="bg-[#f5f7ea] flex flex-col w-full items-center justify-center p-8">
    <button @click="openModal" class="mt-8 px-6 py-3 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A]">
      Agregar Producto
    </button>




    <div class="w-full max-w-7xl p-8 flex flex-col md:flex-row gap-8">
     <!-- Historial de Intercambios -->
      <div class="w-full md:w-1/2">
        <div class="w-full flex justify-between items-center mb-3">
          <h2 class="text-3xl font-bold md:text-left">{{ showNegotiate === false ? 'Historial de Intercambios' : 'Articulos en Negociación' }}</h2>
          <button @click="showNegotiate = !showNegotiate" class=" px-6 py-1 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A]">
            {{ showNegotiate === false ? 'En negociación' : 'Historial' }}
          </button>
        </div>
        <ExchangeHistory v-if="showNegotiate===false" :exchanges="exchanges" />
        <NegotiationSector :data="data" v-else/>
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
import { getProductsService } from '@/services/productService';
import type { IProduct } from '@/interfaces/IProduct';

import AddProductModal from '@/components/AddProductModal.vue';
import ExchangeHistory from '@/components/ExchangeHistory.vue';
import NegotiationSector from '@/components/NegotiationSector.vue';
import Valorations from '@/components/Valorations.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const showNegotiate = ref(false);

console.log('ID del usuario desde el token:', user.value?.id);

const fetchUserData = async () => {
  if (!user.value?.id) {
    console.error('No se encontró el ID del usuario en el token.');
    return;
  }

  try {
    const response = await axios.get('https://localhost:7140/api/Perfil');
    console.log('Datos obtenidos de la API de perfil:', response.data);

    if (response.status === 200) {
      const userId = Number(user.value?.id);
      const profile = response.data.find((profile: any) => Number(profile.usuarioId) === userId);

      console.log('ID del usuario filtrado:', userId);
      console.log('Perfil del usuario encontrado:', profile);

      if (profile) {
        // Asignar los datos al ref userProfile
        userProfile.value = {
          idPerfil: profile.idPerfil,
          usuarioId: profile.usuarioId,
          imagenPerfil: profile.imagenPerfil,
          nombrePerfil: profile.nombrePerfil,
          descripcion: profile.descripcion,
        };
      } else {
        console.log('No se encontró un perfil para este usuario.');
        console.log('Datos asignados a userProfile:', userProfile.value);
        userProfile.value = null;
      }
    }
  } catch (error) {
    console.error('Error obteniendo datos del perfil:', error);
    userProfile.value = null;
  }
};

const data = ref<IProduct[]>([]);

const fetchData = async () => {
    try {
      const response = await getProductsService();
      const asorted = response.sort(
        (a:IProduct, b:IProduct) =>
          new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
      );
      data.value = asorted.filter((item:IProduct) => item.procesoNegociacion == true);
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.message);
      } else{
        console.error(error);
      }
    }
}

fetchData();
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

// Definir el tipo UserProfile
interface UserProfile {
  idPerfil: number;
  usuarioId: number;
  imagenPerfil: string;
  nombrePerfil: string;
  descripcion: string;
}

// Cambiar el nombre de userData a userProfile
const userProfile = ref<UserProfile | null>(null);
</script>
