<template>
  <div class="w-full min-h-screen bg-[#FAF7EC] flex flex-col items-center px-2 xs:px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
    <!-- Banner superior optimizado -->
    <div class="w-full max-w-[100vw] md:max-w-[100rem] h-auto md:h-[20vh] lg:h-[30rem] flex items-center justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-2">
      
<img src="@/assets/Images/categorias.png" alt="Logo" class="w-full max-w-[80rem] object-contain" />
      </div>

<!--
    <h1 class="text-5xl font-bold text-[#2C3E50] mb-8">Categorías</h1>
<h2 class="text-2xl font-semibold text-[#50683E] text-center mb-8">
  Explora nuestras categorías y encuentra el trueque perfecto para ti.
</h2> -->
<div data-aos="fade" data-aos-offset="0" data-aos-duration="3000" >
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7 w-full max-w-[100vw] lg:max-w-[110rem]">

      <RouterLink
  v-for="(category, index) in categories"
  :key="index"
  :to="`/categories/${category.nombre}`"
  class="bg-white shadow-lg rounded-xl w-full h-64 sm:h-80 lg:h-96 flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 overflow-hidden relative"
>
<img
  :src="category.imagenCategoria"
  :alt="category.nombre"
  class="w-full h-full object-cover filter blur-[2.2px] transition-all duration-300 hover:blur-none"
/>


  <div
    class="absolute w-[9rem] h-[12rem] sm:w-[9rem] sm:h-[12rem] md:w-[9rem] md:h-[12rem] lg:w-[14rem] lg:h-[18rem] bg-[#FAF7EC] text-[#07330799] text-center flex justify-center items-center text-sm sm:text-base md:text-lg lg:text-xl font-bold rounded-2xl hover:bg-[#a1cf9b] hover:opacity-100 opacity-90 p-2"
  >
    {{ category.nombre }}
  </div>
</RouterLink>


</div>
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
