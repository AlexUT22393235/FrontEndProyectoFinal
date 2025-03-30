<template>
<ReportModal v-if="reportModal === true" @close="reportModal = false" @submit="submitReport"/>

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
    <div class="pl-10 flex flex-row gap-3">
      <button
  v-if="isCurrentUser"
  @click="openEditModal"
  class="mt-4 px-6 py-2 bg-[#4A5D4A] text-white rounded-lg hover:bg-[#3A4D3A] "
>
  Editar Perfil
</button>
<button
  v-if="isCurrentUser"
  @click="openDeleteModal"
  class="mt-4 px-6 py-2 bg-[#cca4bb] text-white rounded-lg hover:bg-[#3A4D3A] "
>
  Eliminar mi cuenta
</button>
<button
  v-else
  @click="openReportModal"
  class="mt-4 px-6 py-2 bg-[#cca4bb] text-white rounded-lg hover:bg-[#3A4D3A] "
>
  Reportar cuenta
</button>
    </div>
      </div>


  </div>
  <div v-else>
      <p class="text-black">No se encontró un perfil para este usuario.</p>
  </div>
<EditProfileModal
  v-if="isEditModalOpen && userProfile"
  :userProfile="userProfile"
  @close="closeEditModal"
  @submit="handleEditSubmit"
/>
<DeleteProfileModal
  v-if="isDeleteModalOpen && userProfile"
  :userProfile="userProfile"
  @close="closeDeleteModal"
  @confirm="handleDeleteProfile"
/>
<ReportModal
  v-if="isReportModalOpen && userProfile"
  :userProfile="userProfile"
  @close="closeReportModal"
  @submit="handleReportSubmit"
/>


  <div class="bg-[#f5f7ea] flex flex-col w-full items-center justify-center p-8">
    <button @click="openModal" class="mt-8 px-6 py-3 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A]">
      Agregar Producto
    </button>
    <button class="bg-[#5B735D] w-[3vw] h-[2.5vw] px-3 rounded-md mt-6 hover:bg-[#128c7e] transition-colors duration-300" @click="reportModal = true">
      <svg class="w-full h-full object-cover" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z" fill="#fbffaa"></path> </g></svg>
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



        <NegotiationSector :data="data" @remove-product="removeProduct" v-else/>

        <UserProductsSection :data="data"  />
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
import { useRoute } from 'vue-router';
import { watchEffect } from 'vue';
import { useExchangeStore } from '@/stores/exchangeStore';
import AddProductModal from '@/components/Modals/AddProductModal.vue';
import ExchangeHistory from '@/components/Sections/ExchangeHistorySection.vue';
import NegotiationSector from '@/components/Sections/NegotiationSection.vue';
import UserProductsSection from '@/components/Sections/UserProductsSection.vue';
import Valorations from '@/components/Sections/UserValorationsSection.vue';
import DeleteProfileModal from '@/components/Modals/DeleteProfileModal.vue';
import ReportModal from '@/components/Modals/ReportModal.vue';
import EditProfileModal from '@/components/Modals/EditProfileModal.vue';
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const showNegotiate = ref(false);
const isDeleteModalOpen = ref(false);
const isReportModalOpen = ref(false);
const isEditModalOpen = ref(false); // Controla la visibilidad del modal de edición
const route = useRoute();
const profileIdFromUrl = ref(Number(route.params.id)); // Esto obtiene el ID de la URL

const reportModal = ref(false)

// console.log('ID del usuario desde el token:', user.value?.id);

const userProfile = ref<UserProfile>({
  idPerfil: 0,
  usuarioId: 0,
  imagenPerfil: '',
  nombrePerfil: '',
  descripcion: '',
});
const isCurrentUser = computed(() => {
  const result = Number(userProfile.value?.usuarioId) === Number(user.value?.id);
  // console.log('isCurrentUser:', result);
  return result;
});

const submitReport = async () => {

}

const fetchUserData = async () => {
  try {
    const response = await axios.get(`https://localhost:7140/api/Perfil/usuario/${profileIdFromUrl.value}`);
    console.log('Datos obtenidos de la API de perfil:', response.data[0]);

    if (response.status === 200) {
      const profile = response.data[0];

      if (profile) {
        userProfile.value = {
          idPerfil: profile.idPerfil,
          usuarioId: Number(profile.usuarioId),
          imagenPerfil: profile.imagenPerfil,
          nombrePerfil: profile.nombrePerfil,
          descripcion: profile.descripcion,
        };
      } else {
        userProfile.value = null;
      }
    }
  } catch {
    userProfile.value = null;
  }
};
const data = ref<IProduct[]>([]);
const fetchData = async () => {
  try {
    const response = await getProductsService();
    const asorted = response.filter((product: IProduct) => product.fechaCreacion)
      .sort( (a: IProduct, b: IProduct) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
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

const removeProduct = (id: number) => {
  data.value = data.value.filter((item) => item.idProducto !== id);
};


const openEditModal = () => (isEditModalOpen.value = true);
const openReportModal = () => (isReportModalOpen.value = true);
const openDeleteModal = () => (isDeleteModalOpen.value = true);
const closeEditModal = () => (isEditModalOpen.value = false);
const closeDeleteModal = () => (isDeleteModalOpen.value = false);
const closeReportModal = () => (isReportModalOpen.value = false);


// import { watch } from 'vue';

// watch([userProfile, user], ([newProfile, newUser]) => {
//   const userId = Number(newUser?.id);
//   const profileUserId = Number(newProfile?.usuarioId);

//   console.log('Comparando usuario logueado con el perfil...');
//   console.log('ID del usuario logueado:', userId);
//   console.log('ID del usuario en el perfil:', profileUserId);
//   console.log('¿Es el mismo usuario?', userId === profileUserId);
// });


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
const handleDeleteProfile = async (updatedProfile: UserProfile) => {
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
const handleReportSubmit = async (updatedProfile: UserProfile) => {
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

// Seccion de hitorial de intercambio, 22393139 FGT
// Datos HISTORIAL DE INTERCAMBIO DE PRODUCTOS 22393139 FGT

const exchangeStore = useExchangeStore();

// Cargar datos reales cuando el usuario esté disponible
onMounted(() => {
  if (user.value?.id) {
    exchangeStore.fetchExchangeHistory(Number(user.value.id));
  }
});

// Mapear los datos del store al formato esperado por ExchangeHistory
const exchanges = computed(() => {
  return exchangeStore.exchanges.map(exchange => ({
    nombre: exchange.nombre,
    descripcion: exchange.descripcion,
    fechaRegistro: exchange.fechaRegistro
      ? new Date(exchange.fechaRegistro).toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'Fecha no disponible',
    imagenes: exchange.imagenes[0]?.urlImagen || 'https://via.placeholder.com/150'
  }));
});

interface UserProfile {
  idPerfil: number;
  usuarioId: number;
  imagenPerfil: string;
  nombrePerfil: string;
  descripcion: string;
}
// watch([userProfile, user], ([newProfile, newUser]) => {
//   console.log('Actualización detectada:');
//   console.log('Nuevo perfil:', newProfile);
//   console.log('Nuevo usuario:', newUser);
// });

</script>
