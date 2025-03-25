<template>
  <!-- Utilización de Tailwind en cards de fotos de angulos de producto, Fernando Gomez Toledo 22393139 -->
  <div class="carousel flex overflow-x-auto gap-5 p-2 mt-5">
    <div v-for="(image, index) in imagenes" :key="index" class="carousel-item flex-none">
      <div class="card border border-gray-300 rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:translate-y-[-5px]">
        <img :src="image" :alt="'Imagen ' + (index + 1)" class="carousel-image w-48 h-36 object-cover" />
      </div>
    </div>
  </div>
</template>

<!-- Componente Vue para un carrusel de imágenes.
  - Acepta una lista de imágenes como propiedad obligatoria.
  - Autor: Fernando Gomez Toledo (22393139) 
-->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Carousel',
  props: {
    imagenes: {
      type: Array as () => string[],
      required: true,
    },
  },
});
</script>
  


  <style scoped>
/* Estilos para dispositivos móviles, Fernando Gomez Toledo 22393139 */
@media (max-width: 768px) {
  .carousel-image {
    width: 150px; /* Tamaño más pequeño para móviles */
    height: 100px;
  }

  .card-footer p {
    font-size: 12px; /* Texto más pequeño en móviles */
  }
}
  </style>