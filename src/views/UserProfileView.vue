<template>
    <!-- Skeleton de carga para el perfil -->
    <div v-if="loading" class="flex flex-col ">
      <div class="bg-[#5B735D] animate-pulse flex flex-col md:flex-row items-center justify-center p-8 space-y-6 md:space-y-0">
        <div class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-full shadow-lg object-cover flex-shrink-0">
          <img src="@/assets/images/logostrade_skeleton.png" alt="Logo"
               class="w-full h-full object-cover rounded-full shadow-lg flex-shrink-0" />
        </div>
    <div class="flex flex-col items-center md:items-start md:ml-6 lg:ml-10 space-y-4 max-w-2xl px-4 sm:px-0">
      <div class="bg-[#3A4D3A] h-8 w-48 rounded"></div>
      <div class="bg-[#3A4D3A] h-4 w-64 rounded"></div>

    </div>


      </div>
      <div class="bg-[#f5f7ea] flex flex-col w-full h-[40rem] items-center justify-center p-8">
        <div class="w-full max-w-7xl p-4 sm:p-6 lg:p-8 flex flex-col xl:flex-row gap-6 lg:gap-8 items-center justify-center">
          <div class="bg-[#D4E0CD] h-78 w-[50%] rounded items-center justify-center flex">
            <img src="@/assets/images/light_logostrade_skeleton.png" alt="Logo"
                 class="w-[10rem] h-auto opacity-30" />
          </div>
      <div class="bg-[#D4E0CD] h-74 w-[40%] rounded items-center justify-center flex">
        <img src="@/assets/images/light_logostrade_skeleton.png" alt="Logo"
        class="w-[10rem] h-auto opacity-30" />
      </div>

          </div>
</div>
  </div>
  <div  v-else-if="userProfile">
    <div class="bg-[#5B735D] flex flex-col md:flex-row w-full h-auto items-center justify-center px-4 sm:px-6 lg:px-10 py-8 md:py-12 space-y-6 md:space-y-0">
    <!-- Imagen de perfil con tamaños responsive -->
    <img :src="userProfile.imagenPerfil" alt="Logo"
         class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-full shadow-lg object-cover flex-shrink-0" />

    <!-- Información del perfil -->
    <div class="flex flex-col items-center md:items-start md:ml-6 lg:ml-10 space-y-4 max-w-2xl px-4 sm:px-0">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center md:text-left">
        {{ userProfile.nombrePerfil }}
      </h2>

      <p class="text-base sm:text-lg text-white text-center md:text-left">
        {{ userProfile.descripcion }}
      </p>

      <!-- Botones adaptables -->
      <div class="flex flex-wrap justify-center md:justify-start gap-3 mt-2 md:mt-4">
        <button v-if="isCurrentUser" @click="openEditModal"
                class="px-4 py-2 sm:px-5 sm:py-2 bg-[#4A5D4A] text-white rounded-lg hover:bg-[#3A4D3A] text-sm sm:text-base transition-colors duration-200">
          Editar Perfil
        </button>
        <button v-if="isCurrentUser" @click="openDeleteModal"
                class="px-4 py-2 sm:px-5 sm:py-2 bg-[#cca4bb] text-white rounded-lg hover:bg-[#3A4D3A] text-sm sm:text-base transition-colors duration-200">
          Eliminar cuenta
        </button>
        <button v-else @click="openReportModal"
                class="px-4 py-2 sm:px-5 sm:py-2 bg-[#cca4bb] text-white rounded-lg hover:bg-[#3A4D3A] text-sm sm:text-base transition-colors duration-200">
          Reportar cuenta
        </button>
      </div>
    </div>
  </div>
  <div class="bg-[#f5f7ea] flex flex-col w-full items-center justify-center p-8">
    <!-- Botón ahora en sección Mis Productos. -->
    <!-- <button @click="openModal" class="mt-8 px-6 py-3 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A]">
      Agregar Producto
    </button> -->
    <button class="bg-[#5B735D] w-[3vw] h-[2.5vw] px-3 rounded-md mt-6 hover:bg-[#128c7e] transition-colors duration-300" @click="reportModal = true">
      <svg class="w-full h-full object-cover" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z" fill="#fbffaa"></path> </g></svg>
    </button>

    <!-- Contenido principal responsive -->
    <div class="w-full max-w-7xl p-4 sm:p-6 lg:p-8 flex flex-col xl:flex-row gap-6 lg:gap-8">
      <!-- Sección izquierda -->
      <div class="w-full xl:w-1/2 space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <h2 class="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            {{ showNegotiate ? 'Artículos en Negociación' : 'Historial de Intercambios' }}
          </h2>
          <button @click="showNegotiate = !showNegotiate"
                  class="px-4 py-1 sm:px-5 sm:py-1 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A] text-sm sm:text-base transition-colors duration-200 whitespace-nowrap">
            {{ showNegotiate ? 'Ver Historial' : 'Ver Negociación' }}
          </button>
        </div>
        <ExchangeHistory v-if="showNegotiate===false" :exchanges="exchanges" />


        <NegotiationSector :data="data" @remove-product="removeProduct" v-else/>

        <!-- <UserProductsSection /> -->
        <ProductsByUserSection/>
      </div>

      <!-- Sección derecha -->
      <div class="w-full xl:w-1/2 mt-8 xl:mt-0">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center xl:text-left">Historial de Revisiones</h2>
        <Valorations />
      </div>
    </div>
  </div>

  </div>


  <ReportModal v-if="reportModal === true" @close="reportModal = false" @submit="submitReport"/>

  <!-- Sección superior del perfil - Responsive mejorado -->

<!--
  <div v-else class="p-4">
    <p class="text-black text-center">No se encontró un perfil para este usuario.</p>
  </div> -->

  <!-- Modales (sin cambios necesarios en responsive) -->
  <EditProfileModal v-if="isEditModalOpen && userProfile" :userProfile="userProfile" @close="closeEditModal" @submit="handleEditSubmit"/>
  <DeleteProfileModal v-if="isDeleteModalOpen && userProfile" :userProfile="userProfile" @close="closeDeleteModal" @confirm="handleDeleteProfile"/>
  <ReportModal v-if="isReportModalOpen && userProfile" :userProfile="userProfile" @close="closeReportModal" @submit="handleReportSubmit"/>




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
import ExchangeHistory from '@/components/Sections/ExchangeHistorySection.vue';
import NegotiationSector from '@/components/Sections/NegotiationSection.vue';
import UserProductsSection from '@/components/Sections/UserProductsSection.vue';
import Valorations from '@/components/Sections/UserValorationsSection.vue';
import DeleteProfileModal from '@/components/Modals/DeleteProfileModal.vue';
import ReportModal from '@/components/Modals/ReportModal.vue';
import EditProfileModal from '@/components/Modals/EditProfileModal.vue';
const authStore = useAuthStore();
const loading = ref(true);
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
  } finally {
    // Retraso adicional de 1 segundo para ver el skeleton
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

onMounted(fetchUserData);



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
