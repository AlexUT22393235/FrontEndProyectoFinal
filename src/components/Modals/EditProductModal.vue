<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
    <div class="bg-white w-full max-w-lg rounded-lg shadow-xl flex flex-col p-6 relative">

      <button @click="emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
        &times;
      </button>

      <div class="mt-4 text-gray-700 text-center space-y-2">
        <h2 class="text-xl font-bold text-gray-800 text-center">Editar Producto</h2>

        <form @submit.prevent="handleEdit" class="mt-4 space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-gray-700 mb-1">Nombre del Producto*</label>
            <input v-model="product.nombre" type="text" class="w-full px-4 py-2 border rounded-lg" />
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-gray-700 mb-1">Descripción*</label>
            <textarea v-model="product.descripcion" rows="3" class="w-full px-4 py-2 border rounded-lg"></textarea>
          </div>

          <!-- Tipo de transacción -->
          <div>
            <label class="block text-gray-700 mb-1">Tipo de transacción*</label>
            <select v-model="product.intercambio" class="w-full px-4 py-2 border rounded-lg">
              <option :value="true">Intercambio</option>
              <option :value="false">Donación</option>
            </select>
          </div>

          <!-- Categorías - Sección integrada -->
          <div>
            <label class="block text-gray-700 mb-1">Categorías*</label>
            
            <!-- Chips de categorías seleccionadas -->
            <div class="flex flex-wrap gap-2 mb-2 min-h-10">
              <div 
                v-for="category in selectedCategories" 
                :key="'selected-'+category.idCategoria"
                class="flex items-center bg-green-100 px-3 py-1 rounded-lg text-sm"
              >
                {{ category.nombre }}
                <button 
                  @click.prevent="toggleCategory(category)"
                  class="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
              <p v-if="selectedCategories.length === 0" class="text-gray-400 text-sm">No hay categorías seleccionadas</p>
            </div>

            <!-- Lista de categorías disponibles -->
            <div class="border rounded-lg p-1 max-h-40 overflow-y-auto">
              <button 
                v-for="category in allCategories" 
                :key="category.idCategoria" 
                @click.prevent="toggleCategory(category)"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                :class="{ 
                  'bg-gray-100': product.categoriasIds.includes(category.idCategoria),
                  'opacity-50': product.categoriasIds.includes(category.idCategoria)
                }"
              >
                {{ category.nombre }}
              </button>
            </div>
          </div>

          <!-- Imágenes -->
          <div>
            <label class="block text-gray-700 mb-1">Imágenes*</label>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              @change="handleImageUpload" 
              class="w-full px-4 py-2 border rounded-lg" 
            />
            <div class="flex flex-wrap gap-2 mt-2">
              <!-- Imágenes existentes -->
              <div 
                v-for="(image, index) in props.productData.imagenes" 
                :key="'existing-'+index" 
                class="relative w-20 h-20 border rounded"
              >
                <img :src="image.urlImagen" class="w-full h-full object-cover" />
                <button 
                  @click.prevent="removeImage('existing', index)" 
                  class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
              
              <!-- Nuevas imágenes (previews) -->
              <div 
                v-for="(preview, index) in previewImages" 
                :key="'new-'+index" 
                class="relative w-20 h-20 border rounded"
              >
                <img :src="preview" class="w-full h-full object-cover" />
                <button 
                  @click.prevent="removeImage('new', index)" 
                  class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>

          <!-- Botones -->
          <div class="mt-6 flex justify-center gap-4">
            <button 
              @click="emit('close')" 
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Guardar Cambios</span>
              <span v-else>Procesando...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductUpdateStore } from '@/stores/productUpdateStore';

import type { ProductPatchDTO } from '@/dtos/ProductPatchDTO'
import { getCategoriesService } from '@/services/categorieService';

const isLoading = ref(false); // Inicializa isLoading como false

const props = defineProps({
  isOpen: Boolean,
  productId: Number,
  productData: {
    type: Object as () => {
      idProducto: number;
      nombre: string;
      descripcion: string;
      intercambio: boolean;
      categoriasIds: number[];
      imagenes: Array<{ urlImagen: string }>;
    },
    required: true
  }
});

const emit = defineEmits(['close', 'update-success']);

// Estado del producto (compatible con tu v-model en el template)
const product = ref({
  idProducto: props.productData.idProducto,
  nombre: props.productData.nombre,
  descripcion: props.productData.descripcion,
  intercambio: props.productData.intercambio,
  categoriasIds: [...props.productData.categoriasIds],
});

// Imágenes (manteniendo tu estructura de previewImages)

const allCategories = ref<{ idCategoria: number; nombre: string }[]>([]);
const selectedCategories = ref<{ idCategoria: number; nombre: string }[]>([]);
const previewImages = ref<string[]>(props.productData.imagenes.map(img => img.urlImagen));
const newImageFiles = ref<File[]>([]);

// Cargar categorías al montar el componente
onMounted(async () => {
  try {
    allCategories.value = await getCategoriesService();
    // Mapear categorías seleccionadas iniciales
    selectedCategories.value = allCategories.value.filter(cat => 
      product.value.categoriasIds.includes(cat.idCategoria)
    );
  } catch (error) {
    console.error('Error loading categories:', error);
  }
});
// Store
const productUpdateStore = useProductUpdateStore();

const toggleCategory = (category: { idCategoria: number; nombre: string }) => {
  const index = product.value.categoriasIds.indexOf(category.idCategoria);
  
  if (index === -1) {
    product.value.categoriasIds.push(category.idCategoria);
    selectedCategories.value.push(category);
  } else {
    product.value.categoriasIds.splice(index, 1);
    selectedCategories.value = selectedCategories.value.filter(
      c => c.idCategoria !== category.idCategoria
    );
  }
};;



// Manejo de imágenes (compatible con tu template)
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      newImageFiles.value.push(file);
      
      // Crear vista previa (como lo tenías)
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Resetear el input para permitir cargar la misma imagen otra vez
    input.value = '';
  }
};

// Eliminar imagen (ajustado a tu template)
const removeImage = (type: string, index: number) => {
  if (type === 'existing') {
    // Eliminar la imagen del array de props.productData.imagenes
    props.productData.imagenes.splice(index, 1);
    // Eliminar también del preview
    previewImages.value.splice(index, 1);
  } else {
    // Es una imagen nueva (preview)
    const newIndex = index - props.productData.imagenes.length;
    previewImages.value.splice(index, 1);
    newImageFiles.value.splice(newIndex, 1);
  }
};

// Submit del formulario
const handleEdit = async () => {
  try {
    // Validación básica
    if (!product.value.nombre.trim() || !product.value.descripcion.trim()) {
      alert('Nombre y descripción son campos obligatorios');
      return;
    }

    if (product.value.categoriasIds.length === 0) {
      alert('Debe seleccionar al menos una categoría');
      return;
    }

    // Preparar el DTO para el servicio
    const updateData: ProductPatchDTO = {
      IdProducto: product.value.idProducto,
      Nombre: product.value.nombre,
      Descripcion: product.value.descripcion,
      Intercambio: product.value.intercambio,
      CategoriasIds: product.value.categoriasIds,
      Imagenes: newImageFiles.value.length > 0 ? newImageFiles.value : undefined
    };

    // Llamar al store para actualizar
    await productUpdateStore.updateProductPartial(updateData.IdProducto, updateData);
    
    // Éxito: emitir evento y cerrar modal
    emit('update-success', {
      ...product.value,
      imagenes: previewImages.value.map(url => ({ urlImagen: url }))
    });
    emit('close');
    
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    // Aquí podrías mostrar un mensaje más elegante
    alert('Ocurrió un error al actualizar el producto');
  }
};
</script>