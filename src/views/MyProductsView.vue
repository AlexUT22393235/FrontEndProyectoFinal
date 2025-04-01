<template>
  <div class="w-full min-h-screen bg-[#FAF7EC] relative px-12"
>     <div class="pl-80  w-full max-w-[100vw] md:max-w-[90rem] h-auto md:h-[20vh] lg:h-[30rem] flex items-center justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-2">

    <img src="@/assets/Images/misproductos.png" alt="Logo" class=" w-full max-w-[80rem] object-contain" />
          </div>



    <div class="px-40  w-full text-center pb-6 rounded-md text-white flex justify-between flex-wrap ">
      <button class="bg-[#5d7e4e] w-[10vw] py-[1vh] rounded-lg cursor-pointer" @click="isModalOpen = true">Agregar Producto</button>
      <button v-if="hasNegotiation === true" class="bg-green-800 w-[10vw] py-[1vh] rounded-lg cursor-pointer" @click="onNegotiation = !onNegotiation">{{ onNegotiation === false ? 'Ver en negociacion' : 'Ver todos' }}</button>
    </div>

    <!-- <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4 py-6"> -->
      <div v-if="data.length > 0" class="pb-5 pl-10 ml-30 w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
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

    <AddProductModal 
  v-if="isModalOpen" 
  :is-open="isModalOpen" 
  @close="isModalOpen = false" 
  @update-success="handleProductAdded"
/>


    <EditProductModal
  v-if="isEditModalOpen"
  :is-open="isEditModalOpen"
  :product-id="productIdToEdit"
  :product-data="getProductData(productIdToEdit)"
  @close="isEditModalOpen = false"
  @update-success="handleProductEdited"
/>
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
import { getCategoriesService } from '@/services/categorieService';

const categoriesList = ref<{idCategoria: number, nombre: string}[]>([]);

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

// Función corregida con tipo de retorno explícito
const getProductData = (productId: number) => {
  const product = data.value.find(product => product.idProducto === productId);
  
  if (!product) {
    throw new Error(`Producto con ID ${productId} no encontrado`);
  }

  return {
    idProducto: product.idProducto,
    nombre: product.nombre || '',
    descripcion: product.descripcion || '',
    intercambio: product.intercambio || false,
    categoriasIds: product.categorias?.map(c => c.idCategoria) || [],
    imagenes: product.imagenes?.map(img => ({ urlImagen: img.urlImagen })) || []
  };
};

const handleProductAdded = async () => {
  try {
        await fetchData();
    isModalOpen.value = false;
  } catch (error) {
    console.error('Error al manejar el producto agregado:', error);
  }
};

const fetchData = async () => {
  try {
    if (user.value?.id) {
      await productsStore.fetchProductsByUser(user.value.id);
      ogData.value = productsStore.productsPerUser.filter((item) => item.noVisible === false);
      data.value = onNegotiation.value 
        ? ogData.value.filter((item) => item.procesoNegociacion === true)
        : ogData.value;
    }
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
};


const handleEditRequest = (productId: number) => {
  productIdToEdit.value = productId;
  isEditModalOpen.value = true;
};



const handleDeleteRequest = (productId: number) => {
  productIdToDelete.value = productId;
  isDeleteModalOpen.value = true;
};

const handleProductDeleted = async() => {
  fetchData()
};

const hasNegotiation = computed(() => {
  return ogData.value.some((product) => product.procesoNegociacion === true);
});

onMounted(async () => {
  if (user.value && user.value.id) {
    try {
      await Promise.all([
        productsStore.fetchProductsByUser(user.value.id),
        loadCategories()
      ]);
      
      data.value = productsStore.productsPerUser.filter((item) => item.noVisible === false);
      ogData.value = data.value;
    } catch (error) {
      console.error("Error loading data:", error);
    }
  } else {
    console.error("Id no disponible en authStore");
  }
});

const loadCategories = async () => {
  try {
    categoriesList.value = await getCategoriesService();
  } catch (error) {
    console.error('Error loading categories:', error);
  }
};

const handleProductEdited = () => {
  fetchData(); // Recargar los datos después de editar
};

watch(onNegotiation, () => {
  if(onNegotiation.value === true){
    data.value = ogData.value.filter((item) => item.procesoNegociacion === true)
  } else {
    data.value = ogData.value
  }
});
</script>