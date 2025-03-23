<template>
    <div class="exchange-history">
      <ul>
        <li v-for="(exchange, index) in exchanges" :key="index" class="mb-4 p-4 border rounded-lg shadow-sm flex items-start">
          <!-- Imagen a la izquierda -->
          <div class="w-24 h-24 mr-4">
            <img :src="exchange.image" :alt="exchange.productTitle" class="w-full h-full object-cover rounded-lg" />
          </div>
  
          <!-- Información a la derecha -->
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ exchange.productTitle }}</h3>
            <p class="text-sm text-gray-600">Fecha: {{ exchange.date }}</p>
            <p class="text-sm text-gray-600">Productos intercambiados:</p>
            <ul class="list-disc list-inside pl-5">
              <li v-for="(product, idx) in exchange.exchangedProducts" :key="idx">{{ product }}</li>
            </ul>
            <p class="text-sm text-gray-600 mt-2 text-justify">{{ exchange.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    exchanges: {
      type: Array as () => Array<{
        productTitle: string;
        date: string;
        exchangedProducts: string[];
        description: string;
        image: string;
      }>,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .exchange-history ul {
    list-style: none;
    padding: 0;
  }
  </style>