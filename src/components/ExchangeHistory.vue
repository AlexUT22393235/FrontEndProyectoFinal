<template>
  <div class="exchange-history bg-[#D4E0CD] py-8 px-6 rounded-xl shadow-lg">
    <ul>
      <li v-for="(exchange, index) in exchanges" :key="index"
          class="mb-6 p-6 bg-white rounded-lg shadow-md flex items-start space-x-6 transition-transform transform hover:scale-105">

        <!-- Imagen del producto -->
        <div class="w-24 h-24 overflow-hidden rounded-lg">
          <img :src="exchange.imagenes" :alt="exchange.nombre" class="w-full h-full object-cover" />
        </div>

        <!-- Información del intercambio -->
        <div class="flex-1">
            <p class="text-sm text-gray-600 mt-2 font-medium">Producto intercambiado:</p>
          <h3 class="text-xl font-semibold text-[#2C3E50] mb-2">{{ exchange.nombre }}</h3>
          <p class="text-sm text-gray-600 mt-2 font-medium">Fecha de intercambio</p>
          <p class="text-sm text-gray-600">Fecha:
            <span class="font-medium text-[#2C3E50]">{{ exchange.fechaRegistro }}</span>
          </p>
          
          <p class="text-sm text-gray-600 mt-2 font-medium">Detalle del producto intercambiado</p>
          <p class="text-sm text-gray-600 mt-3 text-justify">{{ exchange.descripcion }}</p>

        
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  exchanges: {
    type: Array as () => Array<{
      nombre: string;
      fechaRegistro: string;
      descripcion: string;
      imagenes: string;
    }>,
    required: true,
  },
});


const formatDate = (dateString: string) => {
  if (!dateString) return 'Fecha no disponible';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>



<style scoped>
.exchange-history ul {
  list-style: none;
  padding: 0;
}
.exchange-history li {
  transition: transform 0.4s ease;
}
.exchange-history li:hover {
  transform: translateY(-1px);
}
</style>
