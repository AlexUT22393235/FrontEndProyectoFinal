<template>
  <div class="data-history bg-[#D4E0CD] py-8 px-6 rounded-xl shadow-lg">
    <ul>

      <li v-for="(item, index) in data" :key="index"
          class="mb-6 p-6 bg-white rounded-lg shadow-md flex items-start space-x-6 transition-transform transform hover:scale-105">

        <!-- Imagen del producto -->
        <div class="w-24 h-24 overflow-hidden rounded-lg">
          <img :src="item.imagenes[0].urlImagen" :alt="item.nombre" class="w-full h-full object-cover" />
        </div>

        <!-- Información del intercambio -->
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-[#2C3E50] mb-2">{{ item.nombre }}</h3>
          <p class="text-sm text-gray-600">Descripcion:
            <span class="font-medium text-[#2C3E50]">{{ item.descripcion }}</span>
          </p>
          <p class="text-sm text-gray-600">Fecha:
            <span class="font-medium text-[#2C3E50]">{{ formatDate(item.fechaCreacion) }}</span>
          </p>
          <button  class=" px-6 mt-4 py-1 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A]" @click="hideProduct(item.idProducto)">
            Terminar negociacion
          </button>
        </div>
      </li>

      <li v-if="data.length == 0"
          class="mb-6 p-6 bg-white rounded-lg shadow-md flex items-start space-x-6 transition-transform transform hover:scale-105">
        <div class="flex-1">
          <p class="text-lg font-semibold text-[#2C3E50] mb-2">Aun no hay nada
          </p>
        </div>
      </li>

    </ul>
  </div>
</template>

<script setup lang="ts">
  import type { IProduct } from '@/interfaces/IProduct';
  import { hideProductService } from '@/services/productService';
  import axios from 'axios'

  const emit = defineEmits(['remove-product']);
  const hideProduct = async (id:number) => {
    try {
      const response = await hideProductService({ idProducto: id, fechaCreacion: null })
      console.log(response)
      emit('remove-product', id);
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.message)
      } else{
        console.error(error)
      }
    }
  }

  const formatDate = (date: Date) => {
  const dateStr = new Date(date).toISOString().slice(0, 10); // Get the first 10 characters (YYYY-MM-DD)
  return dateStr;
};


defineProps<{
  data: IProduct[]
}>();
</script>

<style scoped>
.data-history ul {
  list-style: none;
  padding: 0;
}
.data-history li {
  transition: transform 0.4s ease;
}
.data-history li:hover {
  transform: translateY(-1px);
}
</style>
