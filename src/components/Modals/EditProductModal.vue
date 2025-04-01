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
            <input 
              v-model="product.nombre" 
              type="text" 
              class="w-full px-4 py-2 border rounded-lg"
              :class="{ 'border-red-500': errors.nombre }" 
              @input="validateField('nombre')"
              maxlength="100"
            />
            <p v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</p>
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-gray-700 mb-1">Descripción*</label>
            <textarea 
              v-model="product.descripcion" 
              rows="3" 
              class="w-full px-4 py-2 border rounded-lg"
              :class="{ 'border-red-500': errors.descripcion }"
              @input="validateField('descripcion')"
              maxlength="500"
            ></textarea>
            <p v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</p>
          </div>

          <!-- Tipo de transacción -->
          <div>
            <label class="block text-gray-700 mb-1">Tipo de transacción*</label>
            <select 
              v-model="product.intercambio" 
              class="w-full px-4 py-2 border rounded-lg"
            >
              <option :value="true">Intercambio</option>
              <option :value="false">Donación</option>
            </select>
          </div>

          <!-- Categorías -->
          <div>
            <label class="block text-gray-700 mb-1">Categorías*</label>
            <p v-if="errors.categorias" class="text-red-500 text-sm mb-1">{{ errors.categorias }}</p>
            
            <!-- Mappin de categorias selccionadas -->
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
              <p v-if="selectedCategories.length === 0 && !errors.categorias" class="text-gray-400 text-sm">No hay categorías seleccionadas</p>
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
            <p class="text-sm text-gray-500 mt-1">Deja vacío para mantener las imágenes actuales</p>
            <p v-if="errors.imagenes" class="text-red-500 text-sm mt-1">{{ errors.imagenes }}</p>
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
                v-for="(preview, index) in previewImages.slice(props.productData.imagenes.length)" 
                :key="'new-'+index" 
                class="relative w-20 h-20 border rounded"
              >
                <img :src="preview" class="w-full h-full object-cover" />
                <button 
                  @click.prevent="removeImage('new', index + props.productData.imagenes.length)" 
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
              :disabled="isLoading || hasErrors"
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
import { ref, onMounted, computed } from 'vue';
import { useProductUpdateStore } from '@/stores/productUpdateStore';
import type { ProductPatchDTO } from '@/dtos/ProductPatchDTO';
import { getCategoriesService } from '@/services/categorieService';

// Props
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

// Emits
const emit = defineEmits(['close', 'update-success']);

// Estados reactivos
const isLoading = ref(false);
const errors = ref({
  nombre: '',
  descripcion: '',
  categorias: '',
  imagenes: ''
});

const product = ref({
  idProducto: props.productData.idProducto,
  nombre: props.productData.nombre,
  descripcion: props.productData.descripcion,
  intercambio: props.productData.intercambio,
  categoriasIds: [...props.productData.categoriasIds],
});

const allCategories = ref<{ idCategoria: number; nombre: string }[]>([]);
const selectedCategories = ref<{ idCategoria: number; nombre: string }[]>([]);
const previewImages = ref<string[]>(props.productData.imagenes.map(img => img.urlImagen));
const newImageFiles = ref<File[]>([]);
const deletedExistingImages = ref<number[]>([]);
const productUpdateStore = useProductUpdateStore();
// Computed properties
const hasErrors = computed(() => {
  return Object.values(errors.value).some(error => error !== '');
});

// Métodos
const sanitizeInput = (input: string): string => {
  let sanitized = input.replace(/<[^>]*>?/gm, '');
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  return sanitized.replace(/[^\w\sáéíóúÁÉÍÓÚñÑ.,;:¿?¡!()\-@]/gi, '');
};

const validateField = (field: 'nombre' | 'descripcion') => {
  const value = product.value[field].trim();
  
  if (!value) {
    errors.value[field] = 'Este campo es obligatorio';
    return false;
  }

  if (field === 'nombre' && value.length > 100) {
    errors.value[field] = 'El nombre no puede exceder los 100 caracteres';
    return false;
  }

  if (field === 'descripcion' && value.length > 500) {
    errors.value[field] = 'La descripción no puede exceder los 500 caracteres';
    return false;
  }

  const dangerousPatterns = [
    /<script.*?>.*?<\/script>/gi,
    /SELECT.*?FROM/gi,
    /INSERT.*?INTO/gi,
    /UPDATE.*?SET/gi,
    /DELETE.*?FROM/gi
  ];

  if (dangerousPatterns.some(pattern => pattern.test(value))) {
    errors.value[field] = 'Contenido no permitido detectado';
    return false;
  }

  errors.value[field] = '';
  return true;
};

const validateForm = (): boolean => {
  let isValid = true;

  if (!validateField('nombre')) isValid = false;
  if (!validateField('descripcion')) isValid = false;
  
  if (product.value.categoriasIds.length === 0) {
    errors.value.categorias = 'Debe seleccionar al menos una categoría';
    isValid = false;
  } else {
    errors.value.categorias = '';
  }

  const remainingExisting = props.productData.imagenes.length - deletedExistingImages.value.length;
  const newImagesCount = previewImages.value.slice(props.productData.imagenes.length).length;
  
  if (remainingExisting + newImagesCount === 0) {
    errors.value.imagenes = 'Debe haber al menos una imagen';
    isValid = false;
  } else {
    errors.value.imagenes = '';
  }

  return isValid;
};

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
  
  if (product.value.categoriasIds.length === 0) {
    errors.value.categorias = 'Debe seleccionar al menos una categoría';
  } else {
    errors.value.categorias = '';
  }
};

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      
      if (!file.type.startsWith('image/')) {
        errors.value.imagenes = 'Solo se permiten archivos de imagen';
        continue;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        errors.value.imagenes = 'Las imágenes no pueden superar los 2MB';
        continue;
      }
      
      newImageFiles.value.push(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    
    if (newImageFiles.value.length > 0) {
      errors.value.imagenes = '';
    }
    
    input.value = '';
  }
};

const removeImage = (type: string, index: number) => {
  if (type === 'existing') {
    const deleteIndex = deletedExistingImages.value.indexOf(index);
    if (deleteIndex === -1) {
      deletedExistingImages.value.push(index);
    } else {
      deletedExistingImages.value.splice(deleteIndex, 1);
    }
  } else {
    const newIndex = index - props.productData.imagenes.length;
    previewImages.value.splice(index, 1);
    newImageFiles.value.splice(newIndex, 1);
  }
  
  validateForm();
};

const handleEdit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const sanitizedData = {
      ...product.value,
      nombre: sanitizeInput(product.value.nombre),
      descripcion: sanitizeInput(product.value.descripcion)
    };

    const updateData: ProductPatchDTO = {
      IdProducto: sanitizedData.idProducto,
      Nombre: sanitizedData.nombre,
      Descripcion: sanitizedData.descripcion,
      Intercambio: sanitizedData.intercambio,
      CategoriasIds: sanitizedData.categoriasIds,
      Imagenes: newImageFiles.value.length > 0 ? newImageFiles.value : undefined
    };

    isLoading.value = true;
    await productUpdateStore.updateProductPartial(updateData.IdProducto, updateData);
    
    const updatedProduct = {
      ...sanitizedData,
      imagenes: [
        ...props.productData.imagenes
          .filter((_, index) => !deletedExistingImages.value.includes(index))
          .map(img => ({ urlImagen: img.urlImagen })),
        ...previewImages.value
          .slice(props.productData.imagenes.length)
          .map(url => ({ urlImagen: url }))
      ]
    };
    
    emit('update-success', updatedProduct);
    emit('close');
    
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    alert('Ocurrió un error al actualizar el producto');
  } finally {
    isLoading.value = false;
  }
};

// Hooks del ciclo de vida
onMounted(async () => {
  try {
    allCategories.value = await getCategoriesService();
    selectedCategories.value = allCategories.value.filter(cat => 
      product.value.categoriasIds.includes(cat.idCategoria)
    );
  } catch (error) {
    console.error('Error loading categories:', error);
  }
});
</script>