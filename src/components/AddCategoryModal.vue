<script setup lang="ts">
import { ref, watch } from 'vue';
import { createCategoryService, getCategoryService, updateCategoryService } from '@/services/categorieService';
import type { CreateCategoryDto } from '@/dtos/createCategoryDto';
import type { UpdateCategoryDto } from '@/dtos/updateCategoryDto';
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: yup.object({
    nombre: yup.string().min(4, 'Se necesitan al menos 4 caracteres').required('Por favor rellene el campo'),
    imgUrl: yup
      .string()
      .min(6, 'Se necesitan al menos 6 caracteres')
      .required('Por favor, ingrese el url de la imagen'),
  }),
});

const [nombreValue, nombreAttrs] = defineField('nombre', {
  validateOnModelUpdate: true,
});
const [imgUrlValue, imgUrlAttrs] = defineField('imgUrl', {
  validateOnModelUpdate: true,
});

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },

  isEdit: {
    type: Boolean,
    required: true,
  },

  editId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['close']);

const createObject = ref<CreateCategoryDto>({
  nombre: '',
  imagenCategoria: '',
});

const updateObject = ref<UpdateCategoryDto>({
  idCategoria: props.editId,
  nombre: '',
  imagenCategoria: '',
});

const fetchObject = async() => {
  const response = await getCategoryService(props.editId);

  updateObject.value.idCategoria = props.editId

  resetForm({
      values: {
        nombre: response.nombre,
        imgUrl: response.imagenCategoria
      },
    });

}


watch(
  () => props.isEdit,
  (newVal) => {
    if (newVal === true) {
      fetchObject();
    }
  },
  { immediate: true }
);

const submitProduct = handleSubmit(async() => {
  if(props.isEdit == true){
    try {

      updateObject.value.nombre = nombreValue.value
      updateObject.value.imagenCategoria = imgUrlValue.value

      await updateCategoryService(updateObject.value)
    } catch (error) {
      console.log(error)
    }
  } else{
    try {

      createObject.value.nombre = nombreValue.value
      createObject.value.imagenCategoria = imgUrlValue.value

      await createCategoryService(createObject.value)
    } catch (error) {
      console.log(error)
    }
  }

  emit('close');
})

</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-3xl">
      <div class="bg-white p-8 rounded-lg w-full max-w-md">

        <h2 class="text-2xl font-bold mb-6" >{{ props.isEdit === false ? 'Agregar categoria' : 'Editar Categoria' }}</h2>

        <form @submit.prevent="submitProduct">
          <!-- Nombre de la cat -->
          <div class="mb-4">
            <label class="block text-gray-700">Nombre de la categoria</label>
            <input v-bind="nombreAttrs" v-model="nombreValue" type="text" placeholder="Ie: Hogar" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.nombre" class="text-red-500 text-sm">{{ errors.nombre }}</p>
          </div>

          <!-- Url img -->
          <div class="mb-4">
            <label class="block text-gray-700">Url de la imagen</label>
            <input v-bind="imgUrlAttrs" v-model="imgUrlValue" placeholder="Ie: https:////images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1170&" class="w-full px-4 py-2 border rounded-lg placeholder:italic"/>
            <p v-if="errors.imgUrl" class="text-red-500 text-sm">{{ errors.imgUrl }}</p>
          </div>

          <!-- Botones -->
          <div class="flex justify-end">
            <button type="button" @click="$emit('close')" class="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer">
              Cancelar
            </button>
            <button type="submit" class="px-6 py-2 bg-[#5B735D] text-white rounded-lg hover:bg-[#4A5D4A] cursor-pointer">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
