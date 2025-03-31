<template>
    <div class="w-full min-h-screen bg-[#FAF7EC] relative px-10 pt-4 ">
      <h3 class="text-bold text-6xl pb-4">Mis Productos</h3>

      <div class="bg-[#5d7e4e] w-50 text-center px-2 p-4 rounded-md text-white">
        <button @click="isModalOpen = true">Agregar Producto</button>
      </div>

      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4 py-6">
        <MyProductCard
          v-for="(item, index) in productsStore.productsPerUser"
          :key="index"
          :id="item.idProducto"
          :imgSrc="item.imagenes?.[0]?.urlImagen || '/images/default.jpg'"
          :categories="item.categorias"
          @delete-request="handleDeleteRequest"
        >
          <template v-slot:title>
            {{ item?.nombre }}
          </template>
          <template v-slot:description>
            {{ item?.descripcion }}
          </template>
        </MyProductCard>
      </div>
      <AddProductModal v-if="isModalOpen" :is-open="isModalOpen" @close="isModalOpen = false" />
      <DeleteProductModal v-if="isDeleteModalOpen" :product-id="productIdToDelete" @close="isDeleteModalOpen = false" @product-deleted="handleProductDeleted" />
    </div>
  </template>

  <script setup lang="ts">
  import MyProductCard from '@/components/MyProductCard.vue';
  import { useProductStore } from '@/stores/productStore';
  import { useAuthStore } from '@/stores/authStore';
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import AddProductModal from '@/components/Modals/AddProductModal.vue';
  import DeleteProductModal from '@/components/Modals/DeleteProductModal.vue';

  const productsStore = useProductStore();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  const isModalOpen = ref(false);
  const isDeleteModalOpen = ref(false);
  const productIdToDelete = ref(0);

  const handleDeleteRequest = (productId: number) => {
    productIdToDelete.value = productId;
    isDeleteModalOpen.value = true;
  };

  const handleProductDeleted = () => {
  };

  onMounted(async () => {
    if (user.value && user.value.id) {
      await productsStore.fetchProductsByUser(user.value.id);
    } else {
      console.error("Id no disponible en authStore");
    }
  });
  </script>
