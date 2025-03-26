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
  <div class="bg-[#4b6934] w-full h-screen flex flex-row">
    <!-- Lado izquierdo con imagen -->
    <div class="flex justify-center items-center w-1/2 h-full bg-[#264026]">
      <div class="w-[40rem] h-[40rem]">
        <img src="@/assets/Images/noTrash.jpeg" alt="Logo" class="w-[40rem] h-[40rem]" />
      </div>
    </div>

    <!-- Lado derecho con formulario -->
    <div class="main-container flex flex-col justify-center items-center w-1/2 h-[50rem] bg-[#50683E]">
      <div class="m-4 p-4">
        <h1 class="text-3xl font-bold text-[#FAF7EC] text-center">Regístrate</h1>
      </div>

      <div class="bg-[#FAF7EC] w-[30rem] h-[30rem] flex flex-col justify-center items-center p-4 rounded-lg">
        <input v-model="nombre" type="text" class="input-field" placeholder="Nombre" />
        <input v-model="apellido" type="text" class="input-field" placeholder="Apellido" />
        <input v-model="telefono" type="text" class="input-field" placeholder="Teléfono" />
        <input v-model="correoElectronico" type="email" class="input-field" placeholder="Email" />
        <input v-model="contrasenia" type="password" class="input-field" placeholder="Contraseña" />

        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>

        <button
          @click="registrarUsuario"
          :disabled="loading || !nombre || !apellido || !correoElectronico || !telefono || !contrasenia"
          class="w-[20rem] h-[2rem] bg-[#3d491a] text-[#FAF7EC] rounded-md mt-2 disabled:bg-gray-500 flex items-center justify-center"
        >
          <span v-if="loading" class="loader"></span>
          <span v-else>Registrarse</span>
        </button>

        <div class="flex flex-row gap-2 mt-2">
          <p>¿Ya tienes una cuenta?</p>
          <router-link to="/login" class="text-[#3d491a]">Ingresa</router-link>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0.9;
}

.input-field {
  width: 20rem;
  height: 2rem;
  border: 2px solid #50683e;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}

button:disabled {
  cursor: not-allowed;
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
</style>
