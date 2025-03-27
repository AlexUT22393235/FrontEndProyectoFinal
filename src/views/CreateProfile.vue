
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
const imagePreview = ref<string | null>(null);
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
const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        imagePreview.value = reader.result as string;
        imagenPerfil.value = reader.result as string;
      }
    };

    reader.readAsDataURL(file);
  }
};


const previewImage = () => {
  if (imagenPerfil.value && !imagenPerfil.value.startsWith('http')) {
    toast.error('La URL de la imagen debe comenzar con "http".');
  }
};
</script>
<template>
<div class="background">
  <div class=" w-full h-screen flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold text-[#4b6934] mb-4">¡Bienvenido a Strade!</h1>
    <p class="text-lg text-[#264026] mb-6">Completa tu perfil para empezar a explorar.</p>

    <div class="bg-[#D4E0CD] w-[46rem] h-[46rem] p-8 rounded-lg shadow-xl">
      <h2 class="text-2xl font-semibold text-[#50683E] mb-6">Crea tu perfil</h2>

      <form @submit.prevent="handleProfileCreate">

        <div class="mb-6 flex justify-center items-center">
          <label
            for="imagenPerfil"
            class="block text-sm font-medium text-gray-700 text-center cursor-pointer"
          >
            <input
              type="file"
              id="imagenPerfil"
              accept="image/*"
              @change="handleImageChange"
              class="hidden"
            />
            <div
              class="w-52 h-52 bg-gray-200 rounded-full border-4 border-white flex justify-center items-center overflow-hidden"
            >

              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt="Vista previa imagen de perfil"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-gray-500 text-xl">+</span>
            </div>
          </label>
        </div>


        <!-- <div class="mb-4">
          <label for="imagenUrl" class="block text-sm font-medium text-gray-700">URL de imagen</label>
          <input
            type="url"
            id="imagenUrl"
            v-model="imagenPerfil"
            @input="previewImage"
            class="w-full p-2 border border-[#50683E] rounded-md"
            placeholder="Ingresa una URL de imagen"
          />
        </div> -->

        <!-- Campo de nombre -->
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

        <!-- Campo de descripción -->
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

        <!-- Botón para guardar el perfil -->
        <button
          type="submit"
          class="w-full bg-[#264026] text-white py-2 rounded-md mt-4"
        >
          Guardar Perfil
        </button>
      </form>
    </div>
  </div>
</div>

</template>


<style scoped>
.background {
  background: url('@/assets/Images/profile.png') center center;
  background-repeat: repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
