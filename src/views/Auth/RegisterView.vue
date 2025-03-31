<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUserService } from "@/services/usersService";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();


const nombre = ref("");
const apellido = ref("");
const correoElectronico = ref("");
const telefono = ref("");
const contrasenia = ref("");
const loading = ref(false);


const registrarUsuario = async () => {

  if (!nombre.value || !apellido.value || !correoElectronico.value || !telefono.value || !contrasenia.value) {
    toast.error("Todos los campos son obligatorios.");
    return;
  }

  // Validar formato del correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correoElectronico.value)) {
    toast.error("El correo electrónico no es válido.");
    return;
  }


  if (contrasenia.value.length < 6) {
    toast.error("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  const newUser = {
    nombre: nombre.value,
    apellido: apellido.value,
    correoElectronico: correoElectronico.value,
    telefono: telefono.value,
    contrasenia: contrasenia.value,
    baneado: false,
    rolId: 1,
  };

  loading.value = true;

  try {
    await createUserService(newUser);
    toast.success("Registro exitoso. Redirigiendo a strade!...");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err: any) {
    console.error("Error en registro:", err);
    const errorMessage = err.response?.data?.message || "Hubo un problema con el registro.";
    toast.error(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>


<template>
  <div class="bg-[#4b6934] w-full h-screen flex flex-col lg:flex-row justify-center items-center">
    <div class="hidden lg:flex justify-center items-center w-1/2 h-full bg-[#264026]">
      <div class="w-[40rem] h-[40rem]">
        <img src="@/assets/Images/noTrash.jpeg" alt="Logo" class="w-[40rem] h-[40rem]" />
      </div>
    </div>

    <div class="main-container flex flex-col justify-center items-center w-full lg:w-1/2 lg:h-[50rem] bg-[#50683E]">
      <div class="m-4 p-4">
        <h1 class="text-3xl font-bold text-[#FAF7EC] text-center">Regístrate</h1>
      </div>

      <div class="bg-[#FAF7EC] w-[90%] sm:w-[80%] lg:w-[30rem] lg:h-[30rem] flex flex-col justify-center items-center rounded-lg p-6 lg:p-4">
        <input 
          v-model="nombre" 
          type="text" 
          class="w-full lg:w-[20rem] h-[2.5rem] lg:h-[2rem] border-2 border-[#50683E] rounded-md mb-2 p-2" 
          placeholder="Nombre" 
        />
        <input 
          v-model="apellido" 
          type="text" 
          class="w-full lg:w-[20rem] h-[2.5rem] lg:h-[2rem] border-2 border-[#50683E] rounded-md mb-2 p-2" 
          placeholder="Apellido" 
        />
        <input 
          v-model="telefono" 
          type="text" 
          class="w-full lg:w-[20rem] h-[2.5rem] lg:h-[2rem] border-2 border-[#50683E] rounded-md mb-2 p-2" 
          placeholder="Teléfono" 
        />
        <input 
          v-model="correoElectronico" 
          type="email" 
          class="w-full lg:w-[20rem] h-[2.5rem] lg:h-[2rem] border-2 border-[#50683E] rounded-md mb-2 p-2" 
          placeholder="Email" 
        />
        <input 
          v-model="contrasenia" 
          type="password" 
          class="w-full lg:w-[20rem] h-[2.5rem] lg:h-[2rem] border-2 border-[#50683E] rounded-md mb-4 lg:mb-2 p-2" 
          placeholder="Contraseña" 
        />

        <p v-if="error" class="text-red-500 mt-2 text-sm lg:text-base">{{ error }}</p>

        <button
          @click="registrarUsuario"
          :disabled="loading || !nombre || !apellido || !correoElectronico || !telefono || !contrasenia"
          class="w-full lg:w-[20rem] h-[2.5rem] lg:h-[2rem] bg-[#3d491a] text-[#FAF7EC] rounded-md disabled:bg-gray-500 flex items-center justify-center"
        >
          <span v-if="loading" class="loader"></span>
          <span v-else>Registrarse</span>
        </button>

        <div class="flex flex-row gap-2 mt-4 lg:mt-2">
          <p class="text-sm lg:text-base">¿Ya tienes una cuenta?</p>
          <router-link to="/login" class="text-[#3d491a] text-sm lg:text-base">Ingresa</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background: url("@/assets/Images/nuevo.png") center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  height: 100%;
}

.loader {
  border: 2px solid #FAF7EC;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 1023px) {
  .main-container {
    min-height: 100vh;
    padding: 1rem 0;
  }
  
  div.bg-\[\#FAF7EC\] {
    margin: 1rem 0;
  }
}
</style>
