<template>
  <div class="bg-[#D4E0CD] py-8 px-6 rounded-xl shadow-lg">
    <!-- Verificamos si hay productos antes de mostrar la lista -->
    <ul v-if="products.length > 0">
      <li v-for="(product, index) in products" :key="index"
          class="mb-6 p-6 bg-white rounded-lg shadow-md flex items-start space-x-6 transition-transform transform hover:scale-105">

        <!-- Imagen del producto -->
        <div class="w-24 h-24 overflow-hidden rounded-lg">
          <img :src="product.imagenes[0]?.urlImagen || '/images/default.jpg'" :alt="product.nombre" class="w-full h-full object-cover" />
        </div>

        <div class="flex-1">
          <p class="text-sm text-gray-600 mt-2 font-medium">Producto publicado:</p>
          <h3 class="text-xl font-semibold text-[#2C3E50] mb-2">{{ product.nombre }}</h3>

          <p class="text-sm text-gray-600 mt-2 font-medium">Fecha de publicación</p>
          <p class="text-sm text-gray-600">Fecha:
            <span class="font-medium text-[#2C3E50]">{{ product.fechaCreacion }}</span>
          </p>

          <p class="text-sm text-gray-600 mt-2 font-medium">Descripción del producto</p>
          <p class="text-sm text-gray-600 mt-3 text-justify">{{ product.descripcion }}</p>
        </div>
      </li>
    </ul>

    <!-- Mensaje si no hay productos -->
    <p v-else class="text-center text-gray-600">No hay productos disponibles para este usuario.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { IProduct } from '@/interfaces/IProduct';
import { useProductStore } from '@/stores/productStore';

const products = ref<IProduct[]>([]);
const productStore = useProductStore();
const userId = ref<number | null>(null); // Usuario logueado

// Obtén el perfil del usuario logueado
const fetchUserProducts = async () => {
  try {
    const response = await axios.get('https://localhost:7140/api/Producto');
    // Asegurarse de que la respuesta contenga datos
    const perfilActual = response.data.find((perfil: any) => perfil.idPerfil === 5);

    if (perfilActual) {
      userId.value = perfilActual.usuarioId;
      console.log('Usuario logueado ID:', userId.value);
      // Aquí podrías agregar una llamada para obtener los productos del usuario
      await fetchProducts();
    } else {
      console.error('No se encontró el perfil con idPerfil = 5');
    }
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
  }
};

// Función para obtener los productos del usuario
const fetchProducts = async () => {
  try {
    if (!userId.value) {
      throw new Error('No se ha determinado el usuario logueado');
    }

    const response = await axios.get(`https://localhost:7140/api/Producto/${userId.value}`);
    products.value = response.data;
    console.log('Productos del usuario:', products.value);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
};

// Llama a ambas funciones al montar el componente
onMounted(async () => {
  await fetchUserProducts(); // Obtén el usuario logueado y los productos
});
</script>

<style scoped>
/* Puedes agregar estilos aquí si es necesario */
</style>
