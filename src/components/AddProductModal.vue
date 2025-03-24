<script setup lang="ts">
import { ref } from 'vue';


// Prop para controlar la visibilidad del modal, Fernando Gomez Toledo 22393139
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});


// Emit para cerrar el modal, Fernando Gomez Toledo 22393139
const emit = defineEmits(['close']);


// Datos del nuevo producto
const newProduct = ref({
  name: '',
  description: '',
  images: [] as File[],
  type: 'intercambio', //'Intercambio' o 'Donacion'
});



// Error de validación, Fernando Gomez Toledo 22393139
const errors = ref ({
    name: '',
    decription:'',
    images: '',
});


// Funcion para manejar la subida de imagenes Fernando Gomez Toledo 22393139
const handleImageUpload = (event: Event) => {
    const input = event. target as HTMLInputElement;
    if(input.files){
        newProduct.value.images = Array.from (input.files);
        errors.value.images=''; // Limpiar el error si hay imágenes
    }
};


//Funcion para validar el formulario
const validateForm = () => {
  let isValid = true;

  if (!newProduct.value.name.trim()) {
    errors.value.name = 'El nombre del producto es requerido.';
    isValid = false;
  } else {
    errors.value.name = '';
  }

  if (!newProduct.value.description.trim()) {
    errors.value.description = 'La descripción es requerida.';
    isValid = false;
  } else {
    errors.value.description = '';
  }

  if (newProduct.value.images.length === 0) {
    errors.value.images = 'Debes subir al menos una imagen.';
    isValid = false;
  } else {
    errors.value.images = '';
  }

  return isValid;
};


// Función para enviar el formulario (simulación), Fernando Gomez Toledo 22393139
const submitProduct = () => {
  console.log('Producto agregado:', newProduct.value);
  emit('close'); // Cierra el modal después de enviar
};

</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-3xl">
      <div class="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6">Agregar Producto</h2>
        <form @submit.prevent="submitProduct">
          <!-- Nombre del producto -->
          <div class="mb-4">
            <label class="block text-gray-700">Nombre del Producto</label>
            <input v-model="newProduct.name" type="text" class="w-full px-4 py-2 border rounded-lg" />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>

          <!-- Descripción del producto -->
          <div class="mb-4">
            <label class="block text-gray-700">Descripción</label>
            <textarea v-model="newProduct.description" class="w-full px-4 py-2 border rounded-lg"></textarea>
            <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
          </div>

          <!-- Tipo de producto (Intercambio o Donación) -->
          <div class="mb-4">
            <label class="block text-gray-700">Tipo</label>
            <select v-model="newProduct.type" class="w-full px-4 py-2 border rounded-lg">
              <option value="intercambio">Intercambio</option>
              <option value="donacion">Donación</option>
            </select>
          </div>

          <!-- Subida de imágenes -->
          <div class="mb-4">
            <label class="block text-gray-700">Imágenes</label>
            <input type="file" multiple @change="handleImageUpload" class="w-full px-4 py-2 border rounded-lg" />
            <p v-if="errors.images" class="text-red-500 text-sm">{{ errors.images }}</p>
          </div>

          <!-- Botones -->
          <div class="flex justify-end">
            <button type="button" @click="$emit('close')" class="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800">
              Cancelar
            </button>
            <button type="submit" class="px-6 py-2 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A]">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
