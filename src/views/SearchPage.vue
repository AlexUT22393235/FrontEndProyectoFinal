<script lang="ts" setup>
  import ProductCard from '@/components/ProductCard.vue';
 
</script>
<template>
<div class=" bg-[#6d805c]">
  <div class="w-full h-[50vh] search-container flex flex-col justify-center items-center ">
  <p class="text-[4rem] font-bold text-[#FAF7EC]">500 Resultados de Busqueda</p>
  <p class="text-[1.5rem] text-white">para <span class="text-[#d5d0b6]">"bolsas de marca verde"</span></p>
  <div class="w-full flex items-center justify-center gap-[1vw] p-[2vh] ">
    <input placeholder="Pantuflas amarillas" class="placeholder:italic bg-[#D9D9D9] rounded-lg w-[20vw] h-[5vh] px-[1vw]">
    <button class="cursor-pointer">
      <svg width="50px" height="54px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FAF7EC"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#FAF7EC" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.9992 21L14.9492 14.95" stroke="#FAF7EC" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    </button>
  </div>
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
<style scoped>
.search-container {

 background: url('@/assets/Images/loginBackground.png')  center center;
background-repeat: repeat;
}


</style>
