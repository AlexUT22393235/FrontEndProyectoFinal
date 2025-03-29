<template>
  <DisclaimerModal
  v-if="contactModal === true "
  :phone="user?.telefono"
  :userName="user?.nombre"
  :productName="product?.nombre"
  :trade="trade"
  @close="contactModal = false"
/>

  <ReportModal v-if="reportModal === true" @close="reportModal = false"/>

  <div class="product-details flex flex-col gap-5 p-5 ">

    <div class="w-[12rem] flex items-center gap-4 pl-20">
      <svg
        @click="goBack"
        class=" text-green-900 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 12H5m7-7l-7 7 7 7"
        />
      </svg>
      <span class="text-green-600 cursor-pointer text-2xl" @click="goBack">
        Volver
      </span>
    </div>

    <div class="columns-container flex flex-col gap-5 h-full pt-44 px-40">
      <div class="left-column w-full h-[40rem]">
        <div class="product-image bg-gray-200 w-full h-120 rounded-lg overflow-hidden flex justify-center items-center">
          <img
            :src="product?.urlImagen || '/images/default.jpg'"
            :alt="product?.nombre || 'Producto sin nombre'"
            class="main-image w-full h-full object-cover"
          />
        </div>
      </div>

      <div class="right-column w-full flex flex-col justify-between">
        <h1 class="product-title text-5xl text-center mt-2">
          {{ product?.nombre || 'Nombre del Producto' }}
        </h1>
        <p class="description text-2xl text-gray-600 mt-6 text-justify">
          {{ product?.descripcion || 'Sin descripción disponible.' }}
        </p>

        <div class="mt-6 flex gap-4 ">
          <!-- <button
            @click="$emit('enviar-propuesta')"
            class="propuesta-button bg-[#5B735D] text-white py-3 px-5 rounded-md mt-6 hover:bg-[#128c7e] transition-colors duration-300"
          >
            Enviar Propuesta
          </button> -->
          <button
            @click="openContactModal"

            class="whatsapp-button w-full bg-[#5B735D] text-white px-5 rounded-md mt-6 hover:bg-[#128c7e] transition-colors duration-300"
          >
            Contactar por WhatsApp
          </button>
          <button class="bg-[#5B735D] w-[3vw] h-[2.5vw] px-3 rounded-md mt-6 hover:bg-[#128c7e] transition-colors duration-300" @click="reportModal = true">

            <svg class="w-full h-full object-cover" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z" fill="#fbffaa"></path> </g></svg>
          </button>
        </div>

        <div class="user-info flex items-center gap-4 mt-8">
          <div class="user-profile-image w-12 h-12 rounded-full overflow-hidden">
            <img
              :src="user?.userProfile?.imagenPerfil || '@/assets/Images/defaultProfile.png'"
              alt="Foto de perfil"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="user-details">
            <p class="text-1xl text-gray-700">
                          <span
                @click="goToUserProfile(product?.usuarioId)"
                class="text-blue-500 cursor-pointer hover:underline"
              >
                {{ user?.nombre || "Usuario desconocido" }}
              </span>

            </p>

            <!-- Se quito esto: ({{ product?.fechaCreacion }}), Para Mostrar solo la fecha dd/mm/yy-->

            <p class="text-xs text-gray-500">
  {{ formattedDate }}
  <span v-if="product?.fechaCreacion"></span>
</p>


          </div>
        </div>
      </div>
    </div>

    <div
      v-if="product?.imagenes && product?.imagenes.length > 1"
      class="carousel-container w-full mt-5 "
    >
      <Carousel :imagenes="product?.imagenes.map((img) => img.urlImagen)" />
    </div>
  </div>


</template>


<script setup lang="ts">
import {format} from 'date-fns';
import { ref, onMounted, computed, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Carousel from './Carousel.vue';
import type { IProductDetail } from '../interfaces/IProductDetail';
import DisclaimerModal from './Modals/disclaimerModal.vue';
import ReportModal from './Modals/ReportProductModal.vue';
import type { postTrade } from '@/dtos/postTradeDto.ts'
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

const toast = useToast();
const authStore = useAuthStore();
const { user: currentUser } = storeToRefs(authStore);

const route = useRoute()

const trade = ref<postTrade>({
  "usuarioSolicitanteId": 0,
  "usuarioOfertanteId": 0,
  "productoId": 0
})

const router = useRouter();
const contactModal = ref(false)

const reportModal = ref(false)

const openContactModal = () => {
  if(currentUser.value?.id){
    contactModal.value = true;
  }else {
    toast.info(
      h('div', { style: 'text-align: center;' }, [
        h('p', '¿Deseas contactar con vendedores? Primero inicia sesión.'),
        h(
          'button',
          {
            onClick: () => router.push('/login'),
            style: `
              margin-top: 8px;
              background-color: #4CAF50;
              color: white;
              padding: 6px 12px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            `,
          },
          'Iniciar sesión'
        ),
      ]),
      {
        timeout: 3000,
        closeOnClick: true,
        draggable: true,
      }
    );
    console.log('Deseas contactarte? primero inicia sesion')
  }
}

const props = defineProps<{
  product: IProductDetail | null;
}>();

const product = props.product;

const user = ref<{
  id: number;
  nombre: string;
  fotoPerfil?: string;
  userProfile?: {
    imagenPerfil: string;
  };
}>({
  id: 0,
  nombre: '',
  fotoPerfil: '',
  userProfile: {
    imagenPerfil: '',
  },
});

const fetchUserDetails = async (usuarioId: number) => {  //Rehacer funcion, no sigue estandar
  try {
    console.log('Fetching user details for usuarioId:', usuarioId); // Verifica el usuario
    const userResponse = await axios.get(`https://localhost:7140/api/Usuario/${usuarioId}`);
    if (userResponse.data) {
      user.value = userResponse.data; // Asigna los datos del usuario
    }

    const profileResponse = await axios.get(`https://localhost:7140/api/Perfil/${usuarioId}`);
    if (user.value) {
      user.value.userProfile = profileResponse.data; // Asigna los datos del perfil al usuario
    }

    console.log('User data received:', user.value); // Verifica los datos recibidos
  } catch (error) {
    console.error('Error al obtener los datos del usuario o perfil:', error);
  }
};

const goBack = () => {
  router.go(-1);
};
const goToUserProfile = (userId: number | undefined) => {
  if (!userId) {
    console.error("Error: userId no está disponible o es inválido", userId);
    return;
  }

  router.push(`/perfil/${userId}`);
};



console.log("Usuario en el momento del click:", user);
console.log("ID del usuario en el producto:", product?.usuarioId);

onMounted(() => {
  console.log("Producto recibido:", product);
  console.log("ID del usuario en el producto:", product?.usuarioId);

  if (product?.usuarioId) {
    trade.value.usuarioOfertanteId = product.usuarioId
    trade.value.productoId = Number(route.params.id)
    trade.value.usuarioSolicitanteId = Number(currentUser.value?.id)
    fetchUserDetails(product.usuarioId);
  } else {
    console.log("No se encontró usuarioId en el producto");
  }
});


const formattedDate = computed(() => {
  console.log('Fecha del producto:', product?.fechaCreacion); // Verifica lo que obtiene aquí
  if (product?.fechaCreacion) {
    try {
      const formatted = format(new Date(product.fechaCreacion), 'dd/MM/yyyy');
      console.log('Fecha formateada:', formatted);
      return formatted;
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'Fecha inválida';
    }
  }

  console.log('Fecha desconocida');
  return 'Fecha desconocida';

});



</script>





































<style scoped>

@media (min-width: 768px) {
  .columns-container {
    flex-direction: row;
    align-items: flex-start;
    height: 100%;
  }

  .left-column {
    width: 50%;
  }

  .right-column {
    width: 50%;
    padding-left: 20px;
  }

  .product-title {
    text-align: left;
  }

  .description {
    text-align: justify;
  }

  .back-button,
  .propuesta-button {
    width: auto;
  }

  .whatsapp-button {
    width: auto;
  }
}

/* Estilos para dispositivos móviles */
@media (max-width: 768px) {
  .product-image img.main-image {
    max-width: 100%;
  }

  .whatsapp-button {
    width: 100%;
    padding: 15px;
  }

  .description {
    font-size: 14px;
  }

  .back-button,
  .propuesta-button {
    width: 100%;
  }
}
</style>
