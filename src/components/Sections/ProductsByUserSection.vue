<template>
    <div class="data-history bg-[#D4E0CD] py-8 px-6 rounded-xl shadow-lg" v-if="isCurrenUser">
      <ul>
        <li v-for="(item, index) in productsStore.products" :key="index"
            class="mb-6 p-6 bg-white rounded-lg shadow-md flex items-start space-x-6 transition-transform transform hover:scale-105">
  
          <div class="w-24 h-24 overflow-hidden rounded-lg">
            <img :src="item.urlImagen" :alt="item.nombre" class="w-full h-full object-cover" />
          </div>
  
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-[#2C3E50] mb-2">{{ item.nombre }}</h3>
            <p class="text-sm text-gray-600">Descripcion:
              <span class="font-medium text-[#2C3E50]">{{ item.descripcion }}</span>
            </p>
            <p class="text-sm text-gray-600">Fecha:
              <span class="font-medium text-[#2C3E50]">{{ formatDate(item.fechaCreacion) }}</span>
            </p>
          </div>
        </li>
  
        <li v-if="productsStore.products.length == 0"
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
  import { useProductStore } from '@/stores/productStore'
  import { useAuthStore } from '@/stores/authStore';
  import { storeToRefs } from 'pinia';
  import { computed, onMounted } from 'vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const profileIdFromUrl = ref(Number(route.params.id));  
  const productsStore = useProductStore();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  
  const formatDate = (date: Date) => {
    const dateStr = new Date(date).toISOString().slice(0, 10);
    return dateStr;
  };

  console.log("Id de perfil: ", profileIdFromUrl);
  console.log("Id de usuario logeado: ",user.value?.id)

  const isCurrenUser = computed(()=>{
    const result = Number(profileIdFromUrl.value)===Number(user.value?.id)
    return result
  })
  
  
  onMounted(async () => {
    if (authStore.user && authStore.user.id) {
      await productsStore.fetchProductsByUser(authStore.user.id);
    } else {
      console.error("Id no disponible en authstore");
    }
  });
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