<script setup lang="ts">
import { ref, watch } from 'vue';
import { createUserService, getUserService, updateUserService } from '@/services/usersService';
import type { CreateUserDto } from '@/dtos/CreateUserDto';
import type { UpdateUserDto } from '@/dtos/UpdateUserDto';
import { getRolesService } from '@/services/roleService';

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

const createObject = ref<CreateUserDto>({
  nombre: '',
  apellido: '',
  correoElectronico: '',
  telefono: '',
  contrasenia: '',
  rolId: 0
});

const updateObject = ref<UpdateUserDto>({
  idUsuario: props.editId,
  nombre: '',
  apellido: '',
  correoElectronico: '',
  telefono: '',
  contrasenia: '',
  rolId: 0
});

const errors = ref ({
    name: '',
    description:'',
    images: '',
});

const fetchObject = async() => {
  const response = await getUserService(props.editId);
  console.log(response)

  updateObject.value.idUsuario = props.editId
  updateObject.value.nombre = response.nombre;
  updateObject.value.apellido = response.apellido
  updateObject.value.correoElectronico = response.correoElectronico
  updateObject.value.telefono = response.telefono;
  updateObject.value.contrasenia = response.contrasenia
  updateObject.value.rolId = response.rolId
}
const roles = ref()
const fetchRoles = async () => {
  try{
    const response = await getRolesService()
    roles.value = response
  } catch(error){
    console.log(error)
  }
}

fetchRoles()

watch(
  () => props.isEdit,
  (newVal) => {
    if (newVal === true) {
      fetchObject();
    }
  },
  { immediate: true }
);

const submitProduct = async() => {
  if(props.isEdit == true){
    try {
      await updateUserService(updateObject.value)
    } catch (error) {
      console.log(error)
    }
  } else{
    try {
      await createUserService(createObject.value)
    } catch (error) {
      console.log(error)
    }
  }

  emit('close');
};

</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-3xl">
      <div class="bg-white p-8 rounded-lg w-full max-w-md">

        <h2 class="text-2xl font-bold mb-6" v-if="props.isEdit == true">Editar Usuario</h2>
        <h2 class="text-2xl font-bold mb-6" v-else>Agregar Usuario</h2>

        <form @submit.prevent="submitProduct">
          <!-- Nombre de la cat -->
          <div class="mb-4">
            <label class="block text-gray-700">Nombre de usuario</label>
            <input v-if="props.isEdit === false" v-model="createObject.nombre" type="text" placeholder="Ie: Alberto" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <input v-else v-model="updateObject.nombre" type="text" placeholder="Ie: Alberto" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Apellido</label>
            <input v-if="props.isEdit === false" v-model="createObject.apellido" type="text" placeholder="Ie: Perez" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <input v-else v-model="updateObject.apellido" type="text" placeholder="Ie: Perez" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Correo electronico</label>
            <input v-if="props.isEdit === false" v-model="createObject.correoElectronico" type="text" placeholder="Ie: example@mail.com" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <input v-else v-model="updateObject.correoElectronico" type="text" placeholder="Ie: example@mail.com" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Numero telefonico</label>
            <input v-if="props.isEdit === false" v-model="createObject.telefono" type="text" placeholder="Ie: 9982828417" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <input v-else v-model="updateObject.telefono" type="text" placeholder="Ie: 9982828417" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Contraseña</label>
            <input v-if="props.isEdit === false" v-model="createObject.contrasenia" type="text" placeholder="Ie: Usuario010~!" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <input v-else v-model="updateObject.contrasenia" type="text" placeholder="Ie: Usuario010~!" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>


          <div class="mb-4">
            <label class="block text-gray-700">Rol</label>
            <select v-if="props.isEdit === false" v-model="createObject.rolId" placeholder="Ie: Usuario010~!" class="w-full px-4 py-2 border rounded-lg placeholder:italic">
              <option value="">Selecciona una respuesta</option>
              <option v-for="(item, index) in roles" :key="index" :value="item.idRol">{{ item.nombreRol }}</option>
            </select>

            <select v-else v-model="updateObject.rolId" placeholder="Ie: Usuario010~!" class="w-full px-4 py-2 border rounded-lg placeholder:italic">
              <option value="">Selecciona una respuesta</option>
              <option v-for="(item, index) in roles" :key="index" :value="item.idRol">{{ item.nombreRol }}</option>
            </select>

            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
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
