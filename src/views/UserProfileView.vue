<template>
  <div v-if="userProfile" class="bg-[#5B735D] flex flex-col md:flex-row w-full h-auto items-center justify-center px-10 py-12">
    <img :src="userProfile.imagenPerfil" alt="Logo" class="w-50 h-40 md:w-60 md:h-60 rounded-full shadow-lg" />
     <!-- Datos del perfil del usuario -->
      <div>
        <div class="mt-8 md:mt-0 md:ml-10 text-center md:text-left">
      <!-- Nombre del perfil -->
      <h2 class="text-3xl font-bold text-white mb-2">{{ userProfile.nombrePerfil }}</h2>
      <!-- Descripción del perfil -->
      <p class="text-lg text-white mt-4">{{ userProfile.descripcion }}</p>
    </div>
    <div class="pl-10">
      <button
  v-if="!isCurrentUser"
  @click="openEditModal"
  class="mt-4 px-6 py-2 bg-[#4A5D4A] text-white rounded-lg hover:bg-[#3A4D3A]"
>
  Editar Perfil
</button>

    </div>
      </div>


  </div>
  <div v-else>
      <p class="text-white">No se encontró un perfil para este usuario.</p>
  </div>
<EditProfileModal
  v-if="isEditModalOpen && userProfile"
  :userProfile="userProfile"
  @close="closeEditModal"
  @submit="handleEditSubmit"
/>
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
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { getProductsService } from '@/services/productService';
import type { IProduct } from '@/interfaces/IProduct';

import AddProductModal from '@/components/AddProductModal.vue';
import ExchangeHistory from '@/components/ExchangeHistory.vue';
import NegotiationSector from '@/components/NegotiationSector.vue';
import Valorations from '@/components/Valorations.vue';
import EditProfileModal from '@/components/EditProfileModal.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const showNegotiate = ref(false);
const isEditModalOpen = ref(false); // Controla la visibilidad del modal de edición

console.log('ID del usuario desde el token:', user.value?.id);

const userProfile = ref<UserProfile>({
  idPerfil: 0,
  usuarioId: 0,
  imagenPerfil: '',
  nombrePerfil: '',
  descripcion: '',
});

// Computed para verificar si el perfil pertenece al usuario logueado
const isCurrentUser = computed(() => userProfile.value?.usuarioId === user.value?.id);

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
        userProfile.value = {
          idPerfil: profile.idPerfil,
          usuarioId: profile.usuarioId,
          imagenPerfil: profile.imagenPerfil,
          nombrePerfil: profile.nombrePerfil,
          descripcion: profile.descripcion,
        };
      } else {
        console.log('No se encontró un perfil para este usuario.');
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
      (a: IProduct, b: IProduct) =>
        new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
    );
    data.value = asorted.filter((item: IProduct) => item.procesoNegociacion == true);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      console.error(error);
    }
  }
};

fetchData();
onMounted(fetchUserData);


const openEditModal = () => (isEditModalOpen.value = true);
const closeEditModal = () => (isEditModalOpen.value = false);
import { watch } from 'vue';

watch([userProfile, user], ([newProfile, newUser]) => {
  const userId = Number(newUser?.id);
  const profileUserId = Number(newProfile?.usuarioId);

  console.log('Comparando usuario logueado con el perfil...');
  console.log('ID del usuario logueado:', userId);
  console.log('ID del usuario en el perfil:', profileUserId);
  console.log('¿Es el mismo usuario?', userId === profileUserId);
});


const handleEditSubmit = async (updatedProfile: UserProfile) => {
  try {
    const response = await axios.put(`https://localhost:7140/api/Perfil/${updatedProfile.idPerfil}`, updatedProfile);
    if (response.status === 200) {
      userProfile.value = updatedProfile;
      closeEditModal();
    }
  } catch (error) {
    console.error('Error actualizando el perfil:', error);
  }
};

const isModalOpen = ref(false);
const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);
const handleSubmit = (product: any) => {
  console.log('Producto agregado:', product);
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

interface UserProfile {
  idPerfil: number;
  usuarioId: number;
  imagenPerfil: string;
  nombrePerfil: string;
  descripcion: string;
}
watch(isCurrentUser, (newValue) => {
  console.log('¿Debe mostrarse el botón de editar perfil?', newValue);
});

</script>
