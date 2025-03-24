<script setup lang="ts">
import { ref } from 'vue';
import AddProductModal from '@/components/AddProductModal.vue';
import ExchangeHistory from '@/components/ExchangeHistory.vue';
import Valorations from '@/components/Valorations.vue';

const isModalOpen = ref(false);
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

const openModal = () => { isModalOpen.value = true; };
const closeModal = () => { isModalOpen.value = false; };
const handleSubmit = (product: any) => { console.log('Producto agregado:', product); };
</script>

<template>
  <div class="bg-[#5B735D] flex flex-col md:flex-row w-full h-auto items-center justify-center px-10 py-12">
    <img src="@/assets/Images/noTrash.jpeg" alt="Logo" class="w-40 h-40 md:w-60 md:h-60 rounded-full shadow-lg" />
    <div class="text-center md:text-left md:ml-10">
      <h1 class="text-white text-3xl md:text-4xl font-bold">Nombre de Usuario</h1>
      <p class="text-white text-lg mt-4 max-w-xl leading-relaxed">
        Descripción del usuario. Información relevante sobre su perfil, habilidades o intereses.
      </p>
    </div>
  </div>

  <div class="bg-[#f5f7ea] flex flex-col w-full items-center justify-center p-8">
    <button @click="openModal" class="px-6 py-3 bg-[#5B735D] text-white font-semibold rounded-lg hover:bg-[#4A5D4A] transition">
      Agregar Producto
    </button>

    <div class="w-full max-w-7xl p-8 text-center">
      <h2 class="text-3xl font-bold mb-6">Historial de Intercambios</h2>
      <ExchangeHistory :exchanges="exchanges" />
      <h2 class="text-3xl font-bold mt-10 mb-6">Historial de Revisiones</h2>
      <Valorations />
    </div>
  </div>

  <AddProductModal :isOpen="isModalOpen" @close="closeModal" @submit="handleSubmit" />
</template>
