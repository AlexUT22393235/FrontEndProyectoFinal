<script lang="ts" setup>

import ProductCard from '@/components/ProductCard.vue';
import { getProductsService } from '@/services/productService';
import { useRoute } from 'vue-router';
import axios from 'axios'
import { onMounted, ref, computed, watch } from 'vue';
import { getCategoriesService } from '@/services/categorieService';

import type { ICategory } from '@/interfaces/ICategory';
import type { IProduct } from '@/interfaces/IProduct';

  const date = ref("recent");
  const data = ref();
  const tradeType = ref("trade");

  const selectedCategories = ref<ICategory[]>([]);
  const categories = ref<ICategory[]>([]);
  const formValue = ref();

  const route = useRoute();

  const searchName = decodeURI(route.params.busqueda as string)

  const fetchData = async () => {
    try {
      const response = await getProductsService()
      data.value = response
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.message)
      } else{
        console.error(error)
      }
    }
  }

  const fetchCategories = async () => {
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

  const submitSearch = async() => {
    try {
      const newParam = encodeURI(formValue.value);
      window.location.href = '/search/' + newParam;
    } catch (error) {
      console.error(error);
    }
  }

  const changeCategories = (id: number) => {
  if (categories.value && categories.value.length > 0) {
    for (let i = 0; i < categories.value.length; i++) {
      if (categories.value[i].idCategoria === id) {
        const index = selectedCategories.value.findIndex(
          (cat) => cat.idCategoria === id
        );
        if (index === -1) {
          selectedCategories.value.push(categories.value[i]);
        } else {
          selectedCategories.value.splice(index, 1);
        }
      }
    }
  }
};
fetchData()

  onMounted(() => {
    fetchData();
    fetchCategories();
  })

    watch(() => route.params.busqueda, () => {
    fetchData()
  })

  const searchData = computed(() => {
    console.log(route.name)
  switch(route.name) {
    case 'category':
      return data.value ? data.value.filter((item:IProduct) =>
          item.categorias.some((cat:ICategory) => cat.nombre.toLowerCase() == searchName.toLowerCase())
        ) : [];
    case 'products':
      console.log(data.value)
      return data.value;
    case 'search':
      return data.value ? data.value.filter((item:IProduct) => item.nombre.toLowerCase().includes(searchName.toLowerCase())) : [];
    default:
      return data.value;
  }
});


const filtered = computed(() => {
  let filteredData = searchData.value;

  if (selectedCategories.value.length > 0) {
    console.log(selectedCategories.value)
    filteredData = searchData.value.filter((data:IProduct) =>
      data.categorias.some((cat:ICategory) =>
        selectedCategories.value.some(
          (selectedCat) => selectedCat.idCategoria === cat.idCategoria
        )
      )
    );
  }
    if (tradeType.value === 'trade') {
    filteredData = filteredData.filter((data:IProduct) =>
      data.intercambio === true   )
    } else{
      filteredData = filteredData.filter((data:IProduct) =>
      data.intercambio !== true   )
    }

  if (date.value === 'recent') {
    filteredData = filteredData.sort(
      (a:IProduct, b:IProduct) =>
        new Date(b.fechaCreacion).getTime() -
        new Date(a.fechaCreacion).getTime()
    );
  } else {
    filteredData = filteredData.sort(
      (a:IProduct, b:IProduct) =>
        new Date(a.fechaCreacion).getTime() -
        new Date(b.fechaCreacion).getTime()
    );
  }

  return filteredData;
});

</script>
<template>
<div class=" bg-[#6d805c]">
  <div v-if="route.name != 'products'" class="w-full h-[50vh] search-container flex flex-col justify-center items-center ">
    <p class="text-[4rem] font-bold text-[#FAF7EC]">{{ searchData.length }} Resultados de Busqueda</p>
    <p class="text-[1.5rem] text-white">para <span class="text-[#d5d0b6] " >"{{ searchName }}"</span></p>
    <form class="w-full flex items-center justify-center gap-[1vw] p-[2vh] " @submit.prevent="submitSearch " >
      <input v-model="formValue" placeholder="Pantuflas amarillas" class="placeholder:italic bg-[#D9D9D9] rounded-lg w-[20vw] h-[5vh] px-[1vw]">
      <button type="submit" class="cursor-pointer">
        <svg width="50px" height="54px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FAF7EC"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#FAF7EC" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.9992 21L14.9492 14.95" stroke="#FAF7EC" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </button>
    </form>
  </div>

  <div v-else class="w-full h-[50vh] search-container flex flex-col justify-center items-center ">
    <p class="text-[4rem] font-bold text-[#FAF7EC]">{{ searchData.length }} increibles objetos en Strade</p>
    <p class="text-[1.5rem] text-white">Intercambia, reutiliza & conecta.</p>
  </div>
</div>

<div class="w-full h-[60vh] mb-[10vh]">
  <img src="https://www.arka.com/cdn/shop/articles/arka-trash-packaging_bwrgfq.jpg?v=1671534726" class="w-full h-full object-cover"/>
</div>

  <div class="w-[100vw] h-fit px-[4vh] my-[4vh] flex justify-end gap-x-[1vw]"
  v-if="route.name == 'category'">

    <select class="bg-black text-white w-[8vw] py-1 rounded-lg px-2 " v-model="date">
      <option value="recent">Reciente</option>
      <option value="old">Antiguo</option>
    </select>

    <select class="bg-black text-white w-[8vw] py-1 rounded-lg px-2 " v-model="tradeType">
      <option value="trade">Intercambio</option>
      <option value="donation">Donación</option>
    </select>
  </div>

  <div class="w-[100vw] h-fit px-[4vh] my-[4vh] flex justify-end gap-x-[1vw]"
    v-else>
    <select class="bg-black text-white w-[8vw] py-1 rounded-lg px-2 " v-model="date">
      <option value="recent">Reciente</option>
      <option value="old">Antiguo</option>
    </select>

    <select class="bg-black text-white w-[8vw] py-1 rounded-lg px-2 " v-model="tradeType">
      <option value="trade">Intercambio</option>
      <option value="donation">Donación</option>
    </select>

    <button
      class="bg-[#91B580] text-[#13341B] w-[8vw] py-1 rounded-lg px-2 cursor-pointer"
      :class="{
        'bg-black text-white': selectedCategories.some(
          (cat) => cat.idCategoria === item.idCategoria
        ),
      }"
      v-for="(item, index) in categories"
      :key="index"
      @click="changeCategories(item.idCategoria)"
    >
      {{ item.nombre }}
    </button>
  </div>

  <div class="w-[100vw] min-h-[93vh] grid grid-cols-5 gap-2 px-[4vh]">

    <p v-if="filtered.length == 0">
      No hay nada
    </p>

    <ProductCard
    v-for="(item, index) in filtered"
    :key="index"
    :imgSrc="item.imagenes[0].urlImagen"
    >
    <template v-slot:title>
      {{ item?.nombre }}
    </template>

    <template v-slot:description>
      {{ item?.descripcion }}
    </template>
  </ProductCard>



  </div>
</template>


<style scoped>
.search-container {
 background: url('@/assets/Images/loginBackground.png')  center center;
background-repeat: repeat;
}
</style>
