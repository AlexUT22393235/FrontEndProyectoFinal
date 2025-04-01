<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
    <div class="bg-white w-full max-w-lg rounded-lg shadow-xl flex flex-col p-6 relative">

      <button @click="emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
        &times;
      </button>

      <div class="mt-4 text-gray-700 text-center space-y-2">
        <h2 class="text-xl font-bold text-gray-800 text-center">Editar Producto</h2>

      <form @submit.prevent="handleEdit" class="mt-4 space-y-4">
        <div>
          <label class="block text-gray-700 mb-1">Nombre del Producto*</label>
          <input v-model="product.nombre" type="text" class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Descripción*</label>
          <textarea v-model="product.descripcion" rows="3" class="w-full px-4 py-2 border rounded-lg"></textarea>
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Tipo de transacción*</label>
          <select v-model="product.intercambio" class="w-full px-4 py-2 border rounded-lg">
            <option :value="true">Intercambio</option>
            <option :value="false">Donación</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Seleccionar categorías*</label>
          <div class="border rounded-lg p-1 max-h-40 overflow-y-auto">
            <button v-for="category in categories" :key="category.idCategoria" @click.prevent="toggleCategory(category)"
              class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
              :class="{ 'bg-gray-100': product.categoriasIds.includes(category.idCategoria) }"
              >
              {{ category.nombre }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Imágenes*</label>
          <input type="file" multiple accept="image/*" @change="handleImageUpload" class="w-full px-4 py-2 border rounded-lg" />
          <div class="flex flex-wrap gap-2 mt-2">
            <div v-for="(image, index) in previewImages" :key="index" class="relative w-20 h-20 border rounded">
              <img :src="image" alt="Vista previa" class="w-full h-full object-cover" />
              <button @click.prevent="removeImage(index)" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5">&times;</button>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center gap-4">
          <button @click="emit('close')" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500">Guardar Cambios</button>
        </div>
      </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/productStore';
import { ref, onMounted } from 'vue';
import type { ProductPartialUpdateDTO } from '@/dtos/ProductPartialUpdateDTO';
import { getCategoriesService } from '@/services/categorieService'; // Importa el servicio de categorías

const props = defineProps<{ isOpen: boolean; productData: any ; productId: number}>();
const emit = defineEmits(['close', 'product-updated']);

const product = ref<ProductPartialUpdateDTO>({
  idProducto: props.productId,
  nombre: props.productData.nombre,
  descripcion: props.productData.descripcion,
  intercambio: props.productData.intercambio,
  categoriasIds: props.productData.categorias.map((cat: any) => cat.idCategoria),
  imagenes: props.productData.imagenes.map((img: any) => ({ urlImagen: img.urlImagen })),
});

const productStore = useProductStore();
const categories = ref<{ idCategoria: number; nombre: string }[]>([]);
const previewImages = ref<string[]>(product.value.imagenes.map(img => img.urlImagen) || []);
const newImages = ref<File[]>([]); // Para almacenar los nuevos archivos de imagen seleccionados

onMounted(async () => {
  try {
    categories.value = await getCategoriesService();
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
});

const handleEdit = async () => {
  try {
    // Crear FormData para enviar los datos, incluyendo las nuevas imágenes
    const formData = new FormData();
    formData.append('IdProducto', String(props.productId));
    if (product.value.nombre) {
      formData.append('Nombre', product.value.nombre);
    }
    if (product.value.descripcion) {
      formData.append('Descripcion', product.value.descripcion);
    }
    if (product.value.intercambio !== undefined) {
      formData.append('Intercambio', String(product.value.intercambio));
    }
    product.value.categoriasIds.forEach((id) => {
      formData.append('CategoriasIds', String(id));
    });

    // Append nuevas imágenes
    newImages.value.forEach((file) => {
      formData.append('Imagenes', file);
    });

    // Llamar al servicio para actualizar el producto (asumiendo que tu backend acepta FormData)
    await productStore.updatePartialProduct(props.productId, formData as any);
    emit('product-updated', props.productId);
    emit('close');
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
};

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const files = Array.from(input.files);
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        previewImages.value.push(URL.createObjectURL(file));
        newImages.value.push(file); // Almacenar el archivo para enviarlo
      }
    });
  }
};

const toggleCategory = (category: any) => {
  const index = product.value.categoriasIds.indexOf(category.idCategoria);
  if (index === -1) {
    product.value.categoriasIds.push(category.idCategoria);
  } else {
    product.value.categoriasIds.splice(index, 1);
  }
};

const removeImage = (index: number) => {
  URL.revokeObjectURL(previewImages.value[index]);
  previewImages.value.splice(index, 1);
  newImages.value.splice(index, 1); // Eliminar el archivo correspondiente
};
</script>