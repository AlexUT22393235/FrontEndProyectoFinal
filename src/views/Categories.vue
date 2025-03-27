<template>
  <div class="w-full min-h-screen bg-[#FAF7EC] flex flex-col items-center p-8 ">
    <div class="  w-[100rem] h-[30rem] pb-12  items-center justify-center flex pt-80 mb-15 ">

<img src="@/assets/Images/categorias.png" alt="Logo" class="w-[100rem] pb-60 " />
      </div>

<!--
    <h1 class="text-5xl font-bold text-[#2C3E50] mb-8">Categorías</h1>
<h2 class="text-2xl font-semibold text-[#50683E] text-center mb-8">
  Explora nuestras categorías y encuentra el trueque perfecto para ti.
</h2> -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 w-full max-w-[95rem] ">
      <RouterLink
  v-for="(category, index) in categories"
  :key="index"
  :to="`/categories/${category.nombre}`"
  class="bg-white shadow-lg rounded-xl w-82 h-126 flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-110 overflow-hidden relative"
>
<img
  :src="category.imagenCategoria"
  :alt="category.nombre"
  class="w-full h-full object-cover filter blur-[2.2px] transition-all duration-300 hover:blur-none"
/>


  <div
    class="absolute w-[14rem] h-[18rem] bg-[#FAF7EC] text-[#07330799] text-center flex justify-center items-center text-lg font-bold rounded-2xl hover:bg-[#a1cf9b] hover:opacity-100 "
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
