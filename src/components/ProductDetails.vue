<template>
  <div class="product-details flex flex-col gap-5 p-5">
    <!-- Contenedor de las dos columnas (imagen y descripción). Con estilo Tailwind, Fernando Gomez Toledo 22393139 -->
    <div class="columns-container flex flex-col gap-5">
      <!-- Columna Izquierda: Imagen y Título. Con estilo Tailwind, Fernando Gomez Toledo 22393139 -->
      <div class="left-column w-full">
        <div class="product-image">
          <img
            :src="product?.urlImagen || '/images/default.jpg'"
            :alt="product?.nombre || 'Producto sin nombre'"
            class="main-image w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      <!-- Columna Derecha: Descripción y Botón. Con estilo Tailwind, Fernando Gomez Toledo 22393139 -->
      <div class="right-column w-full">
        <h1 class="product-title text-2xl text-center mt-2">
          {{ product?.nombre || 'Nombre del Producto' }}
        </h1>
        <p class="description text-sm text-gray-600 mt-6 text-justify">
          {{ product?.descripcion || 'Sin descripción disponible.' }}
        </p>
        <button
          @click="$emit('contact-whatsapp')"
          class="whatsapp-button w-full bg-[#5B735D] text-white py-3 px-5 rounded-md mt-20 hover:bg-[#128c7e] transition-colors duration-300"
        >
          Contactar por WhatsApp
        </button>
      </div>
    </div>

    
    <!-- Carrusel de Imágenes -->
    <div
      v-if="product?.imagenes && product?.imagenes.length > 1"
      class="carousel-container w-full mt-5"
    >
      <Carousel :imagenes="product?.imagenes.map((img) => img.urlImagen)" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Carousel from './Carousel.vue';
// import { useProductStore } from '../stores/productStore';
import type { IProductDetail } from '../interfaces/IProductDetail';

defineProps<{
  product: IProductDetail | null;
}>();
</script>

  <style scoped>
  
  /* Estilos para desktop, Fernando Gomez Toledo 22393139 */
  @media (min-width: 768px) {
    .columns-container {
      flex-direction: row; /* Dos columnas en desktop */
      align-items: flex-start; /* Alinea las columnas en la parte superior */
    }

    .left-column {
      width: 50%; /* Columna izquierda ocupa la mitad */
    }

    .right-column {
      width: 50%; /* Columna derecha ocupa la mitad */
      padding-left: 20px; /* Espacio entre columnas */
    }

    .product-title {
      text-align: left; /* Título alineado a la izquierda en desktop */
    }

    .description {
      text-align: left; /* Descripción alineada a la izquierda en desktop */
      text-align: justify; /* Justificacion de la descipcion */
    }
  }

  /* Estilos para dispositivos móviles, Fernando Gomez Toledo 22393139*/
  @media (max-width: 768px) {
    .product-image img.main-image {
      max-width: 100%; /* Ajusta el tamaño de la imagen en móviles */
    }

    .whatsapp-button {
      width: 100%; /* Botón de ancho completo en móviles */
      padding: 15px; /* Más grande para facilitar el toque */
    }

    .description {
      font-size: 14px; /* Texto un poco más pequeño en móviles */
    }
  }
  </style>
