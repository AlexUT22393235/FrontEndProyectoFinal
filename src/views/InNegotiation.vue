<script lang="ts" setup>
  import ProductCard from '@/components/ProductCard.vue';
</script>
<template>

  <div class="w-[100vw] h-fit px-[4vh] my-[4vh]">
    <h2 class="text-2xl font-semibold text-[#14421f] underline decoration-double underline-offset-[1vh]">
      <span class="bold"> > </span> Articulos en negociacion: <span class="text-[#5d7e4e]">10</span>
    </h2>
  </div>

  <div class="w-[100vw] h-fit px-[4vh] my-[4vh] flex justify-end gap-x-[1vw]">
    <button class="bg-black text-white w-[8vw] py-1 rounded-lg">Mas reciente</button>
    <button class="bg-[#91B580] text-[#13341B] w-[8vw] py-1 rounded-lg">Categoria</button>
  </div>
  <div class="w-[100vw] min-h-[93vh] grid grid-cols-5 gap-2 px-[4vh]">
    <ProductCard v-for="index in 10" :key="index" />
  </div>
</template>
