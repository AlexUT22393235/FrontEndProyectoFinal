<template>
  <div class="exchange-history bg-[#D4E0CD] py-8 px-6 rounded-xl shadow-lg">
    <ul>
      <li v-for="(exchange, index) in exchanges" :key="index" class="mb-6 p-6 bg-white rounded-lg shadow-md flex items-start space-x-6 transition-transform transform hover:scale-105">
        <!-- Imagen a la izquierda -->
        <div class="w-24 h-24 overflow-hidden rounded-lg">
          <img :src="exchange.image" :alt="exchange.productTitle" class="w-full h-full object-cover" />
        </div>

        <!-- Información a la derecha -->
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-[#2C3E50] mb-2">{{ exchange.productTitle }}</h3>
          <p class="text-sm text-gray-600">Fecha: <span class="font-medium text-[#2C3E50]">{{ exchange.date }}</span></p>
          <p class="text-sm text-gray-600 mt-2 font-medium">Productos intercambiados:</p>
          <ul class="list-disc list-inside pl-5 space-y-1">
            <li v-for="(product, idx) in exchange.exchangedProducts" :key="idx" class="text-sm text-gray-700">{{ product }}</li>
          </ul>
          <p class="text-sm text-gray-600 mt-3 text-justify">{{ exchange.description }}</p>
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

.exchange-history li {
  transition: transform 0.4s ease;
}

.exchange-history li:hover {
  transform: translateY(-1px);
}
</style>
