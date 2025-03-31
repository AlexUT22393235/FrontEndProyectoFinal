<template>
    <div class="w-full min-h-screen bg-[#FAF7EC] relative px-10 pt-4 ">
      <div class="bg-amber-500 w-full h-50rem flex items-center justify-center text-center py-20 m-4">

        <h3 class="text-bold text-6xl pb-4n text-[#FAF7EC]">Mis Productos</h3>
.
      </div>


      <div class=" w-full text-center p-4 rounded-md text-white flex justify-between flex-wrap px-[1vw]">
        <button class="bg-[#5d7e4e] w-[10vw] py-[1vh] rounded-lg cursor-pointer" @click="isModalOpen = true">Agregar Producto</button>
        <button v-if="hasNegotiation === true" class="bg-green-800 w-[10vw] py-[1vh] rounded-lg cursor-pointer" @click="onNegotiation = !onNegotiation">{{ onNegotiation === false ? 'Ver en negociacion' : 'Ver todos' }}</button>
      </div>

      <!-- <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4 py-6"> -->
        <div v-if="data.length > 0" class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4 py-6">
      <MyProductCard
        v-for="(item, index) in data"
        :key="index"
        :id="item.idProducto"
        :imgSrc="item.imagenes?.[0]?.urlImagen || '/images/default.jpg'"
        :categories="item.categorias"
        @delete-request="handleDeleteRequest"
        @edit-request="handleEditRequest"
      >
        <template v-slot:title>
          {{ item?.nombre }}
        </template>
        <template v-slot:description>
          {{ item?.descripcion }}
        </template>
      </MyProductCard>
    </div>

    <div v-else class="text-center text-gray-600 text-lg py-10">
      <p>No tienes productos agregados aún.</p>
    </div>

      <!-- </div> -->

      <AddProductModal v-if="isModalOpen" :is-open="isModalOpen" @close="isModalOpen = false" />
      <EditProductModal v-if="isEditModalOpen" :product-id="productIdToEdit" @close="isEditModalOpen = false" @product-edited="handleProductEdited" />
      <DeleteProductModal v-if="isDeleteModalOpen" :product-id="productIdToDelete" @close="isDeleteModalOpen = false" @product-deleted="handleProductDeleted" />
    </div>
  </template>

  <script setup lang="ts">
  import MyProductCard from '@/components/MyProductCard.vue';
  import { useProductStore } from '@/stores/productStore';
  import { useAuthStore } from '@/stores/authStore';
  import { ref, onMounted, watch, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import AddProductModal from '@/components/Modals/AddProductModal.vue';
  import EditProductModal from '@/components/Modals/EditProductModal.vue';
  import DeleteProductModal from '@/components/Modals/DeleteProductModal.vue';
import type { IProduct } from '@/interfaces/IProduct';

  const productsStore = useProductStore();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  const isModalOpen = ref(false);
  const isDeleteModalOpen = ref(false);
  const onNegotiation = ref(false)
  const data = ref<IProduct[]>([])
  const ogData = ref<IProduct[]>([])
  const productIdToDelete = ref(0);
  const productIdToEdit = ref(0);
  const isEditModalOpen = ref(false);


  const fetchData = async () => {
    try {
      await productsStore.fetchProductsByUser(user.value.id);
      ogData.value = productsStore.productsPerUser.filter((item) => item.noVisible === false)
      data.value = ogData.value
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteRequest = (productId: number) => {
    productIdToDelete.value = productId;
    isDeleteModalOpen.value = true;
  };
  const handleEditRequest = (productId: number) => {
    productIdToEdit.value = productId;
    isEditModalOpen.value = true;
  };

  const handleProductDeleted = async() => {
    fetchData()
  };

  const hasNegotiation = computed(() => {
      return ogData.value.some((product) => product.procesoNegociacion === true);
    });

  onMounted(async () => {
    if (user.value && user.value.id) {
      await productsStore.fetchProductsByUser(user.value.id);
      data.value = productsStore.productsPerUser.filter((item) => item.noVisible === false)
      ogData.value = data.value
    } else {
      console.error("Id no disponible en authStore");
    }
  });

  watch(onNegotiation, () => {
  if(onNegotiation.value === true){
    return data.value = ogData.value.filter((item) => item.procesoNegociacion === true)
  }else{
    return data.value = ogData.value
  }
});
  </script>
