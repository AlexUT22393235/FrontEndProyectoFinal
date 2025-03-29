<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCategoriesService } from '@/services/categorieService';
import { postProductService } from '@/services/productService';
import { useAuthStore } from '@/stores/authStore'; // Importa el store de autenticación
import { useToast } from 'vue-toastification';
const toast = useToast();

// Props y emits
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'product-added']);

// Accede al ID del usuario logueado desde el authStore
const authStore = useAuthStore();
const usuarioId = authStore.user?.id; // Obtén el ID del usuario logueado

// Datos del producto
const newProduct = ref({
  name: '',
  description: '',
  procesoNegociacion: false,
  intercambio: true,
  usuarioId: usuarioId || null, // Usa el ID del usuario logueado
  categoriasIds: [] as number[],
  images: [] as File[],
  fechaCreacion: '', // Campo para la fecha de creación
});

// Estados del componente
const categories = ref<{ idCategoria: number; nombre: string }[]>([]);
const selectedCategories = ref<{ idCategoria: number; nombre: string }[]>([]);
const errors = ref({
  nombre: '',
  descripcion: '',
  images: '',
  categorias: '',
});
const previewImages = ref<string[]>([]);
const isLoading = ref(false);

// Función para manejar la subida de imágenes
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const files = Array.from(input.files);

    if (previewImages.value.length + files.length > 7) {
      errors.value.images = 'No puedes subir más de 7 imágenes.';
    } else {
      files.forEach((file) => {
        if (file.type.startsWith('image/')) {
          previewImages.value.push(URL.createObjectURL(file));
          newProduct.value.images.push(file);
        }
      });
      errors.value.images = '';
    }
  }
};

// Función para eliminar una imagen
const removeImage = (index: number) => {
  URL.revokeObjectURL(previewImages.value[index]);
  previewImages.value.splice(index, 1);
  newProduct.value.images.splice(index, 1);
};

// Manejo de categorías
const selectCategory = (category: any) => {
  if (!selectedCategories.value.some((c) => c.idCategoria === category.idCategoria)) {
    selectedCategories.value.push(category);
    newProduct.value.categoriasIds.push(category.idCategoria);
  }
};

const removeCategory = (categoryId: number) => {
  selectedCategories.value = selectedCategories.value.filter(
    (category) => category.idCategoria !== categoryId
  );
  newProduct.value.categoriasIds = newProduct.value.categoriasIds.filter((id) => id !== categoryId);
};

// Validación del formulario
const validateForm = () => {
  let isValid = true;
  errors.value = { nombre: '', descripcion: '', images: '', categorias: '' };

  if (!newProduct.value.name.trim()) {
    errors.value.nombre = 'El nombre del producto es requerido.';
    isValid = false;
  }

  if (!newProduct.value.description.trim()) {
    errors.value.descripcion = 'La descripción es requerida.';
    isValid = false;
  }

  if (newProduct.value.images.length === 0) {
    errors.value.images = 'Debes subir al menos una imagen.';
    isValid = false;
  }

  if (newProduct.value.categoriasIds.length === 0) {
    errors.value.categorias = 'Debes seleccionar al menos una categoría.';
    isValid = false;
  }

  return isValid;
};

// Envío del formulario
const submitProduct = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  // Asignar la fecha actual al campo `fechaCreacion`
  newProduct.value.fechaCreacion = new Date().toISOString();

  const formData = new FormData();
  formData.append('Nombre', newProduct.value.name);
  formData.append('Descripcion', newProduct.value.description);
  formData.append('ProcesoNegociacion', String(newProduct.value.procesoNegociacion));
  formData.append('Intercambio', String(newProduct.value.intercambio));
  formData.append('UsuarioId', String(newProduct.value.usuarioId)); // Usa el ID del usuario logueado
  formData.append('FechaCreacion', newProduct.value.fechaCreacion); // Agregar la fecha de creación

  newProduct.value.categoriasIds.forEach((id) => {
    formData.append('CategoriasIds', String(id));
  });

  newProduct.value.images.forEach((file) => {
    formData.append('Imagenes', file);
  });

  try {
    const response = await postProductService(formData);
    resetForm();
    emit('product-added', response);
    emit('close');

  toast.success('¡Producto creado con éxito!');
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    // Opcional: mostrar mensaje de error
    toast.error('Error al crear el producto');
  } finally {
    isLoading.value = false;
  }
};


// Limpiar formulario
const resetForm = () => {
  newProduct.value = {
    name: '',
    description: '',
    procesoNegociacion: false,
    intercambio: true,
    usuarioId: usuarioId || null, // Restablece el ID del usuario logueado
    categoriasIds: [],
    images: [],
    fechaCreacion: '', // Restablece la fecha de creación
  };
  previewImages.value = [];
  selectedCategories.value = [];
  errors.value = { nombre: '', descripcion: '', images: '', categorias: '' };
};

onMounted(async () => {
  try {
    categories.value = await getCategoriesService();
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="emit('close')"
  >
    <div class="bg-white p-8 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl font-bold mb-6">Agregar Producto</h2>
      <form @submit.prevent="submitProduct">
        <!-- Nombre del producto 22393139 FGT-->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Nombre del Producto*</label>
          <input
            v-model="newProduct.name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5B735D] focus:border-transparent"
            :class="{ 'border-red-500': errors.nombre }"
          />
          <p v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</p>
        </div>

        <!-- Descripción del producto. 22393139 FGT -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Descripción*</label>
          <textarea
            v-model="newProduct.description"
            rows="3"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5B735D] focus:border-transparent"
            :class="{ 'border-red-500': errors.descripcion }"
          ></textarea>
          <p v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</p>
        </div>

        <!-- Opciones de negociación. 22393139 FGT-->
        <div class="mb-4 flex items-center">
          <input
            type="checkbox"
            id="procesoNegociacion"
            v-model="newProduct.procesoNegociacion"
            class="mr-2 h-5 w-5 text-[#5B735D] rounded focus:ring-[#5B735D]"
          />
          <label for="procesoNegociacion" class="text-gray-700">Acepta proceso de negociación</label>
        </div>

        <!-- Tipo de producto . 22393139 FGT -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Tipo de transacción*</label>
          <select
            v-model="newProduct.intercambio"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5B735D] focus:border-transparent"
          >
            <option :value="true">Intercambio</option>
            <option :value="false">Donación</option>
          </select>
        </div>


        <!-- Lista de categorías. 22393139 FGT -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Seleccionar categorías*</label>
          <div class="border rounded-lg p-1 max-h-40 overflow-y-auto">
            <button
              v-for="category in categories"
              :key="category.idCategoria"
              @click.prevent="selectCategory(category)"
              :disabled="selectedCategories.some((c) => c.idCategoria === category.idCategoria)"
              class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              :class="{ 'bg-gray-100': selectedCategories.some((c) => c.idCategoria === category.idCategoria) }"
            >
              {{ category.nombre }}
            </button>
          </div>
        </div>


 <!-- Categorías seleccionadas. 22393139 FGT -->
 <div class="mb-4">
          <label class="block text-gray-700 mb-1">Categorias seleccionadas</label>
          <div class="flex flex-wrap gap-2 min-h-10 p-2 " :class="{ 'border-red-500': errors.categorias }">
            <div
              v-for="category in selectedCategories"
              :key="category.idCategoria"
              class="flex items-center bg-green-100 px-3 py-1 rounded-lg text-sm"
            >
              {{ category.nombre }}
              <button
                @click.prevent="removeCategory(category.idCategoria)"
                class="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
            <p v-if="selectedCategories.length === 0" class="text-gray-400 text-sm">No hay categorías seleccionadas</p>
          </div>
          <p v-if="errors.categorias" class="text-red-500 text-sm mt-1">{{ errors.categorias }}</p>
        </div>


        <!-- Subida de imágenes. 22393139 FGT -->
        <div class="mb-6">
          <label class="block text-gray-700 mb-1">Imágenes* (Máx. 7)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleImageUpload"
            class="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#5B735D] file:text-white hover:file:bg-[#4A5D4A]"
            :class="{ 'border-red-500': errors.images }"
          />
          <p v-if="errors.images" class="text-red-500 text-sm mt-1">{{ errors.images }}</p>

          <!-- Vista previa de imágenes. 22393139 FGT -->
          <div v-if="previewImages.length > 0" class="mt-4">
            <div class="flex flex-wrap gap-2">
              <div
                v-for="(image, index) in previewImages"
                :key="index"
                class="relative w-20 h-20 border rounded overflow-hidden group"
              >
                <img :src="image" alt="Vista previa" class="w-full h-full object-cover" />
                <button
                  @click.prevent="removeImage(index)"
                  class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5  flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones. 22393139 FGT -->
        <div class="flex justify-end gap-4 pt-4 border-t">
          <button
            type="button"
            @click="emit('close')"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            :disabled="isLoading"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A] disabled:opacity-50 flex items-center justify-center min-w-24"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Guardar</span>
            <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
