<template>
  <div class="bg-[#f4f4f4] w-full h-screen flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold text-[#4b6934] mb-4">¡Bienvenido a Strade!</h1>
    <p class="text-lg text-[#264026] mb-6">Completa tu perfil para empezar a explorar.</p>

    <div class="bg-white w-[30rem] p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-[#50683E] mb-4">Crea tu perfil</h2>

      <form @submit.prevent="handleProfileCreate">
        <div class="mb-4">
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="nombre"
            v-model="nombre"
            class="w-full p-2 border border-[#50683E] rounded-md"
            required
          />
        </div>

        <div class="mb-4">
          <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
            v-model="descripcion"
            class="w-full p-2 border border-[#50683E] rounded-md"
            rows="4"
            required
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="imagenPerfil" class="block text-sm font-medium text-gray-700">Imagen de perfil (URL)</label>
          <input
            type="url"
            id="imagenPerfil"
            v-model="imagenPerfil"
            class="w-full p-2 border border-[#50683E] rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#264026] text-white py-2 rounded-md mt-4"
        >
          Guardar Perfil
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from "@/stores/authStore";

const nombre = ref('');
const descripcion = ref('');
const imagenPerfil = ref('');
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const usuarioId = authStore.user?.id;

const handleProfileCreate = async () => {
  try {
    if (!usuarioId) {
      toast.error('Usuario no autenticado');
      return;
    }

    const response = await axios.post('https://localhost:7140/api/Perfil', {
      usuarioId: usuarioId,
      imagenPerfil: imagenPerfil.value,
      nombrePerfil: nombre.value,
      descripcion: descripcion.value,
    });

    if (response.status === 201) {
      toast.success('¡Perfil creado con éxito!');
      router.push('/landing');
    }
  } catch (error) {
    toast.error('Hubo un error al crear tu perfil. Intenta nuevamente.');
    console.error('Error al crear el perfil:', error);
  }
};
</script>

<style scoped>

</style>
