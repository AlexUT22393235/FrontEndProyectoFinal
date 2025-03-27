<template>
  <div class="w-full min-h-screen bg-[#FAF7EC] flex flex-col items-center p-8">
    <h1 class="text-5xl font-bold text-[#2C3E50] mb-8">Categorías</h1>
<h2 class="text-2xl font-semibold text-[#50683E] text-center mb-8">
  Explora nuestras categorías y encuentra el trueque perfecto para ti.
</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 w-full max-w-7xl">
  <RouterLink
    v-for="(category, index) in categories"
    :key="index"
    :to="`/categories/${category.nombre}`"
    class="bg-white shadow-lg rounded-xl w-72 h-72 flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-110 overflow-hidden relative"
  >
    <img
      :src="category.imagenCategoria"
      :alt="category.nombre"
      class="w-full h-full object-cover"
    />
    <div
      class="absolute bottom-0 w-full bg-[#50683E] bg-opacity-70 text-white text-center py-3 text-lg font-semibold"
    >
      {{ category.nombre }}
    </div>
  </RouterLink>
</div>

  </div>
</template>

<script lang="ts" setup>
import { getCategoriesService } from '@/services/categorieService';
import { onMounted, ref } from 'vue';
import axios from 'axios'

import type { ICategory } from '@/interfaces/ICategory';

const categories = ref<ICategory[]>([]);

const fetchData = async () => {
  try {
      const response = await getCategoriesService()
      categories.value = response;
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.message);
      } else{
        console.error(error);
      }
    }
}

onMounted(() => {
  fetchData()
})


</script>
