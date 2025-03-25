<script setup lang="ts">
import { ref, watch } from 'vue';
import { createUserService, getUserService, updateUserService } from '@/services/usersService';
import type { CreateUserDto } from '@/dtos/CreateUserDto';
import type { UpdateUserDto } from '@/dtos/UpdateUserDto';
import { getRolesService } from '@/services/roleService';
import { useForm, } from 'vee-validate'
import * as yup from 'yup'

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: yup.object({
    nombre: yup.string().min(4, 'Se necesitan al menos 4 caracteres').required('Por favor ingrese nombre'),
    apellido: yup.string().min(4, 'Se necesitan al menos 4 caracteres').required('Por favor ingrese apellido'),
    correo: yup.string().email('Correo no valido').required('Por favor ingrese un correo'),
    telefono: yup.string().min(4, 'Se necesitan al menos 4 caracteres').required('Por favor ingrese un telefono'),
    contrasenia: yup.string().min(4, 'Se necesitan al menos 4 caracteres').required('Por favor ingrese una contraseña'),
    rol: yup.number().required('Por favor escoja un rol'),
  }),
})

const [nombreValue, nombreAttrs] = defineField('nombre', {
  validateOnModelUpdate: true,
});
const [apellidoValue, apellidoAttrs] = defineField('apellido', {
  validateOnModelUpdate: true,
});
const [correoValue, correoAttrs] = defineField('correo', {
  validateOnModelUpdate: true,
});
const [telefonoValue, telefonoAttrs] = defineField('telefono', {
  validateOnModelUpdate: true,
});
const [contraseniaValue, contraseniaAttrs] = defineField('contrasenia', {
  validateOnModelUpdate: true,
});
const [rolValue, rolAttrs] = defineField('rol', {
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

const fetchObject = async() => {
  const response = await getUserService(props.editId);

  updateObject.value.idUsuario = props.editId

  resetForm({
      values: {
        nombre: response.nombre,
        apellido: response.apellido,
        correo: response.correoElectronico,
        telefono: response.telefono,
        contrasenia: response.contrasenia,
        rol: response.rolId,
      },
    });
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

const submitProduct = handleSubmit(async(values) => {
  if(props.isEdit == true){
    try {
      updateObject.value.nombre = values.nombre
      updateObject.value.apellido = values.apellido
      updateObject.value.correoElectronico = values.correo
      updateObject.value.telefono = values.telefono
      updateObject.value.contrasenia = values.contrasenia
      updateObject.value.rolId = values.rol

      await updateUserService(updateObject.value)
    } catch (error) {
      console.log(error)
    }
  } else{
    try {

      createObject.value.nombre = values.nombre
      createObject.value.apellido = values.apellido
      createObject.value.correoElectronico = values.correo
      createObject.value.telefono = values.telefono
      createObject.value.contrasenia = values.contrasenia
      createObject.value.rolId = values.rol

      await createUserService(createObject.value)
    } catch (error) {
      console.log(error)
    }
  }

  emit('close');
}
)

</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-3xl">
      <div class="bg-white p-8 rounded-lg w-full max-w-md">

        <h2 class="text-2xl font-bold mb-6" >{{ props.isEdit === false ? 'Agregar usuario' : 'Editar usuario' }}</h2>


        <form @submit.prevent="submitProduct">

          <div class="mb-4">
            <label class="block text-gray-700">Nombre de usuario</label>
            <input v-model="nombreValue" v-bind="nombreAttrs" type="text" placeholder="Ie: Alberto" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.nombre" class="text-red-500 text-sm">{{ errors.nombre}}</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Apellido</label>
            <input v-model="apellidoValue" v-bind="apellidoAttrs" type="text" placeholder="Ie: Perez" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.apellido" class="text-red-500 text-sm">{{ errors.apellido }}</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Correo electronico</label>
            <input v-model="correoValue" v-bind="correoAttrs" type="text" placeholder="Ie: example@mail.com" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.correo" class="text-red-500 text-sm">{{ errors.correo }}</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Numero telefonico</label>
            <input v-model="telefonoValue" v-bind="telefonoAttrs" type="text" placeholder="Ie: 9982828417" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.telefono" class="text-red-500 text-sm">{{ errors.telefono }}</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Contraseña</label>
            <input v-model="contraseniaValue" v-bind="contraseniaAttrs" type="text" placeholder="Ie: Usuario010~!" class="w-full px-4 py-2 border rounded-lg placeholder:italic" />
            <p v-if="errors.contrasenia" class="text-red-500 text-sm">{{ errors.contrasenia }}</p>
          </div>


          <div class="mb-4">
            <label class="block text-gray-700">Rol</label>
            <select v-model="rolValue" v-bind="rolAttrs" placeholder="Ie: Usuario010~!" class="w-full px-4 py-2 border rounded-lg placeholder:italic">
              <option value="">Selecciona una respuesta</option>
              <option v-for="(item, index) in roles" :key="index" :value="item.idRol">{{ item.nombreRol }}</option>
            </select>

            <p v-if="errors.rol" class="text-red-500 text-sm">{{ errors.rol }}</p>
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
