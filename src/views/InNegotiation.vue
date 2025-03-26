<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { getProductsService } from '@/services/productService';
import type { IProduct } from '@/interfaces/IProduct';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const handleNegotiation = () => {
  console.log('oa')
}

  const data = ref<IProduct[]>([]);

  const fetchData = async () => {
    try {
      const response = await getProductsService();
      const asorted = response.sort(
        (a: IProduct, b: IProduct) =>
          new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
      ); //user.value.id
      data.value = asorted.filter((item: IProduct) => item.procesoNegociacion == true && item.usuarioId === 4);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.error(error);
      }
    }
  };

  fetchData();
</script>
<template>

  <div class="w-[100vw] h-fit px-[4vh] my-[6vh]">
    <h2 class="text-2xl font-semibold text-[#14421f] underline decoration-double underline-offset-[1vh]">
      <span class="bold"> > </span> Articulos en negociacion: <span class="text-[#5d7e4e]">10</span>
    </h2>
  </div>

  <div class="w-[100vw] h-fit px-[4vh] my-[4vh] flex justify-end gap-x-[1vw]">
    <button class="bg-black text-white w-[8vw] py-1 rounded-lg">Mas reciente</button>
    <button class="bg-[#91B580] text-[#13341B] w-[8vw] py-1 rounded-lg">Categoria</button>
  </div>
  <!-- Error, Se desvordan las imagenes de las cards. 22393139 FGT-->
  <div class="w-[100vw] min-h-[93vh] grid grid-cols-5 gap-6 px-[6vh]">
        <ProductCard
          v-for="(item, index) in data"
          :key="index"
          :id="item.idProducto"
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
