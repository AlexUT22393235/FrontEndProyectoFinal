<template>
    <div class="w-[100vw] h-[100vh] fixed top-0 left-0 bg-black/40 backdrop-blur-xs flex justify-center items-center">
      <div class="bg-white w-[40vw] h-[70vh] rounded-lg shadow-lg flex flex-col p-[5vh] flex-wrap gap-y-[3%] px-[3vw] justify-around relative">
        <p class='font-semibold text-xl w-full text-center text-slate-700'>¿Deseas eliminar este producto?</p>
        <button @click="emit('close')" type='button' class='text-red-500 font-bold absolute top-[1vh] right-[1vw] cursor-pointer w-[1vw] h-[1vw]'>X</button>
        <div class='flex flex-wrap flex-col text-xl justify-between gap-[2vh]'>
          <p class="text-red-600">¿Estás seguro que deseas eliminar este producto?</p>
          <p>Esta acción es irreversible y el producto se eliminará permanentemente.</p>
          <p>Por favor, confirma que deseas continuar con la eliminación.</p>
        </div>
        <div class="w-full flex justify-between">
          <button @click="emit('close')" class='bg-gray-500 w-[45%] transition delay-75 duration-300 ease-in hover:bg-gray-400 active:transition-none active:outline-2 active:outline-offset-2 active:outline-gray-400 active:bg-gray-600 rounded-md py-[1vh] text-white font-semibold cursor-pointer'>
            Cancelar
          </button>
          <button @click="handleDelete" class='bg-red-600 text-center w-[45%] transition delay-75 duration-300 ease-in hover:bg-red-500 active:transition-none active:outline-2 active:outline-offset-2 active:outline-red-500 active:bg-red-700 rounded-md py-[1vh] text-white font-semibold cursor-pointer'>
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
  
  const props = defineProps<{
    productId: number;
  }>();
  
  const handleDelete = async () => {
    try {
      await productStore.deleteProduct(props.productId);
      emit('product-deleted', props.productId);
      emit('close');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      // Manejar el error aquí (mostrar un mensaje, etc.)
    }
  };
  </script>