<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
    <div class="bg-white w-full max-w-lg rounded-lg shadow-xl flex flex-col p-6 relative">
      <!-- Cerrar -->
      <button @click="emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
        &times;
      </button>

      <!-- Título -->
      <h2 class="text-xl font-bold text-gray-800 text-center">Eliminar Producto</h2>

      <!-- Contenido -->
      <div class="mt-4 text-gray-700 text-center space-y-2">
        <p class="text-red-600 font-medium">¿Estás seguro de que deseas eliminar este producto?</p>
        <p>Esta acción es irreversible y el producto se eliminará permanentemente.</p>
        <p>Por favor, confirma que deseas continuar.</p>
      </div>

      <!-- Botones -->
      <div class="mt-6 flex justify-center gap-4">
        <button @click="emit('close')"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition">
          Cancelar
        </button>
        <button @click="handleDelete"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();
const emit = defineEmits(['close', 'product-deleted']);
const props = defineProps<{ productId: number }>();

const handleDelete = async () => {
  try {
    await productStore.deleteProduct(props.productId);
    emit('product-deleted', props.productId);
    emit('close');
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};
</script>
