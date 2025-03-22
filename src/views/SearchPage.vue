<script lang="ts" setup>
  import ProductCard from '@/components/ProductCard.vue';
  import lupa from '@/assets/svgs/lupa.svg';
</script>
<template>

<div class="w-full h-[50vh] bg-[#6d805c] flex flex-col justify-center items-center">
  <p class="text-[4rem] font-semibold">500 Resultados de Busqueda</p>
  <p class="text-[1.5rem] text-white">para <span class="text-[#d5d0b6]">"bolsas de marca verde"</span></p>
  <div class="w-full flex items-center justify-center gap-[1vw] p-[2vh] ">
    <input placeholder="Pantuflas amarillas" class="placeholder:italic bg-[#D9D9D9] rounded-lg w-[20vw] h-[5vh] px-[1vw]">
    <button class="cursor-pointer">
      <img :src="lupa" alt="Lupa" class="w-[2vw] h-[2vw]" />
    </button>
  </div>
</div>
<div class="w-full h-[60vh] mb-[10vh]">
  <img src="https://www.arka.com/cdn/shop/articles/arka-trash-packaging_bwrgfq.jpg?v=1671534726" class="w-full h-full object-cover"/>
</div>

  <div class="w-[100vw] h-fit px-[4vh] my-[4vh] flex justify-end gap-x-[1vw]">
    <button class="bg-black text-white w-[8vw] py-1 rounded-lg">Mas reciente</button>
    <button class="bg-[#91B580] text-[#13341B] w-[8vw] py-1 rounded-lg">Categoria</button>
  </div>
  <div class="w-[100vw] min-h-[93vh] grid grid-cols-5 gap-2 px-[4vh]">
    <ProductCard v-for="index in 10" :key="index" />
  </div>
</template>
