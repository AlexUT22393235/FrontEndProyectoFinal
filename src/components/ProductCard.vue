<template>
  <RouterLink :to="`/products/${props.id}`" class="bg-[#C4D8BA] w-full h-[55vh] rounded-xl transition-all duration-300 hover:scale-105">
    <div class="w-full pt-4 h-[70%] flex items-center justify-center">
      <div class="w-[18rem] h-[18rem] bg-white rounded-xl flex items-center justify-center shadow-lg">
        <img
          :src="imgSrc"
          class="object-cover w-full h-full rounded-xl" />
      </div>
    </div>
    <div class="w-full h-[12.5%] px-[2rem] pt-1">
      <p class="text-[#5B735D] font-bold">
        <slot name="title"></slot>
      </p>
      <p class="text-[#749176] text-sm line-clamp-2">
        <slot name="description"></slot>
      </p>
    </div>
    <div class="w-full h-[12.5%] flex flex-wrap px-[2rem] py-2 gap-1">
      <button class="text-sm font-semibold py-1 px-2 bg-black text-white rounded-xl w-fit h-fit text-center">
        Etiqueta
      </button>
      <button class="text-sm font-semibold py-1 px-2 bg-black text-white rounded-xl w-fit h-fit text-center">
        Etiqueta
      </button>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';

  const props = defineProps<{
      imgSrc: string;
      id: number;
    }>();
    console.log(props.imgSrc)
</script>
