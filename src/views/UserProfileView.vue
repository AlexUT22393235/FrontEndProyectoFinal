<script setup lang="ts">
import { ref } from 'vue';
import AddProductModal from '@/components/AddProductModal.vue';
import ExchangeHistory from '@/components/ExchangeHistory.vue';
import Valorations from '@/components/Valorations.vue';

// Estado para controlar la visibilidad del modal
const isModalOpen = ref(false);

// Datos de ejemplo para el historial de intercambios
const exchanges = ref([
  {
    productTitle: 'Sofa',
    date: '2025-02-05',
    exchangedProducts: ['Sofa', 'Sofa Cama'],
    description: 'Un sofá cómodo y en buen estado, perfecto para tu sala.',
    image: 'https://www.sofaclub.es/blog/imagenes/claves-para-comprar-un-sofa-1-1024x640.jpg', // URL de la imagen
  },
  {
    productTitle: 'Control de Xbox',
    date: '2024-10-07',
    exchangedProducts: ['Control Xbox', 'Disco FIFA 24'],
    description: 'Control de Xbox en excelentes condiciones, con garantía.',
    image: 'https://gorilagames.com/img/Public/1019-producto-joystick-control-xbox-series-carbon-black-1-145.jpg', // URL de la imagen
  },
]);

// Función para abrir el modal. 22393139
const openModal = () => {
  isModalOpen.value = true;
};

// Función para cerrar el modal. 22393139
const closeModal = () => {
  isModalOpen.value = false;
};

// Función para manejar el envío del producto. Fernando Gomez Toledo 22393139
const handleSubmit = (product: any) => {
  console.log('Producto agregado:', product);
  // Aquí se puede  agregar la lógica para guardar el producto. Fernando Gomez Toledo 22393139
};
</script>

<template>
  <div class="bg-[#5B735D] flex flex-row w-full h-[40rem] items-center justify-center px-20">
    <div>
      <img src="@/assets/Images/noTrash.jpeg" alt="Logo" class="w-[20rem] h-[20rem]" />
    </div>
    <div>
      <h1 class="text-white text-4xl p-9">Nombre de Usuario</h1>
      <div class="w-[50rem] h-auto text-center justify-center p-9 overflow-hidden">
        <span class="text-white text-3xl">
          Descripción del usuario etc etc etc etc etc etc alkdlsakdksdla;daksd;kasld;k;laskd;lakds;l
        </span>
      </div>
    </div>
  </div>






  <!-- Sección del historial de intercambios. Fernando Gomez Toledo 22393139 -->
  <div class="bg-[#f5f7ea] flex flex-col w-full h-auto items-center justify-center p-8">


 <!-- Botón para abrir el modal. Fernando Gomez Toledo 22393139 -->
 <button @click="openModal" class="mt-8 px-6 py-3 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A]">
      Agregar Producto
    </button>


<div class="flex flex-col items-center w-full max-w-7xl p-8">
    <h1 class="text-4xl font-bold mb-8">Historial de Intercambios</h1>
    <ExchangeHistory :exchanges="exchanges" />
    <h1 class="text-4xl font-bold mb-8">Historial de revisiones</h1>
    <Valorations />

  </div>
  </div>
  <!-- Modal para agregar producto -->
  <AddProductModal :isOpen="isModalOpen" @close="closeModal" @submit="handleSubmit" />

</template>
