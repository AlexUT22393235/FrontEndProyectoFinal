<template>
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
        <h1 class="product-title text-2xl text-center mt-2">
          {{ product?.nombre || 'Nombre del Producto' }}
        </h1>
        <p class="description text-sm text-gray-600 mt-6 text-justify">
          {{ product?.descripcion || 'Sin descripción disponible.' }}
        </p>


        <div class="mt-6 flex gap-4 ">

          <button
            @click="$emit('enviar-propuesta')"
            class="propuesta-button bg-[#5B735D] text-white py-3 px-5 rounded-md mt-6 hover:bg-[#128c7e] transition-colors duration-300"
          >
            Enviar Propuesta
          </button>
          <button
          @click="$emit('contact-whatsapp')"
          class="whatsapp-button w-full bg-[#5B735D] text-white py-3 px-5 rounded-md mt-6 hover:bg-[#128c7e] transition-colors duration-300"
        >
          Contactar por WhatsApp
        </button>
        </div>


        <div class="user-info flex items-center gap-4 mt-8">
          <div class="user-profile-image w-12 h-12 rounded-full overflow-hidden">
            <img
              :src="product?.usuario?.fotoPerfil || '/images/default-profile.jpg'"
              alt="Foto de perfil"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="user-details">
            <p class="text-sm text-gray-700">
              Publicado por
              <span
                @click="goToUserProfile(product?.usuario?.id)"
                class="text-blue-500 cursor-pointer hover:underline"
              >
                {{ product?.usuario?.nombre || 'Usuario desconocido' }}
              </span>
            </p>
            <p class="text-xs text-gray-500">{{ product?.fechaCreacion || 'Fecha desconocida' }}</p>
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

import { useRouter } from 'vue-router';
import Carousel from './Carousel.vue';
import type { IProductDetail } from '../interfaces/IProductDetail';

const router = useRouter();

defineProps<{
  product: IProductDetail | null;
}>();

// Función para regresar a la página anterior
const goBack = () => {
  router.go(-1);
};

// Función para redirigir al perfil del usuario
const goToUserProfile = (userId: string | number | undefined) => {
  if (userId) {
    router.push(`/perfil/${userId}`);
  }
};
</script>

<style scoped>
/* Estilos para desktop */
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
