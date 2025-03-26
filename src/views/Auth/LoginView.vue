<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const toast = useToast();

const handleLogin = async () => {
    try {
        console.log('Iniciando proceso de login...');
        const response = await authStore.login(email.value, password.value);
        if (!response.success) {
            toast.error(response.message || 'Error al iniciar sesión. Inténtalo nuevamente.');
            return;
        }
        console.log('Login exitoso, ID del usuario:', user.value?.id);
        toast.success('Inicio de sesión exitoso!');
        console.log('Consultando usuarios...');
        const usuariosResponse = await axios.get('https://localhost:7140/api/Usuario');
        console.log('Usuarios obtenidos:', usuariosResponse.data);

        const usuario = usuariosResponse.data.find((u: any) => Number(u.idUsuario) === Number(user.value?.id));
        if (!usuario) {
            console.log('Usuario no encontrado en la lista de usuarios.');
            toast.error('Usuario no encontrado');
            return;
        }
        console.log('Consultando perfil...');
        try {
            const perfilResponse = await axios.get(`https://localhost:7140/api/Perfil/${user.value?.id}`);
            console.log('Respuesta del perfil:', perfilResponse);

            if (perfilResponse.status === 200 && perfilResponse.data) {

                console.log('Usuario tiene perfil, redirigiendo a /landing...');
                router.push('/landing');
            }
        } catch (perfilError) {
            if (perfilError.response?.status === 404) {

                console.log('Usuario no tiene perfil, redirigiendo a strade...');
                router.push('/createProfile');
            } else {
                console.error('Error al consultar el perfil:', perfilError);
                toast.error('Error al consultar el perfil.');
            }
        }
    } catch (error) {
        console.error('Error de autenticación:', error);
        toast.error('Ocurrió un problema al iniciar sesión.');
    }
};
</script>




<template>
  <div class="bg-[#4b6934] w-full h-screen flex flex-row">
    <div class="flex justify-center items-center w-1/2 h-full bg-[#264026]">
      <div class="w-full h-[45rem] flex flex-col justify-center items-center">
        <img src="@/assets/Images/donate.jpeg" alt="Logo" class="w-[45rem] h-[50rem]" />
      </div>
    </div>
    <div class="main-container flex flex-col justify-center items-center w-1/2 h-[50rem] bg-[#50683E]">
      <div class="m-4 p-4">
        <h1 class="text-3xl font-bold text-[#FAF7EC] text-center">Login Page</h1>
      </div>

      <div class="bg-[#FAF7EC] w-[30rem] h-[30rem] flex flex-col justify-center items-center rounded-lg">
        <input
          type="text"
          class="w-[20rem] h-[2rem] border-2 border-[#50683E] rounded-md mb-2"
          placeholder="Email"
          v-model="email"
          required
        >
        <input
          type="password"
          class="w-[20rem] h-[2rem] border-2 border-[#50683E] rounded-md mb-2"
          placeholder="Password"
          v-model="password"
          required
        >
        <button
          class="w-[20rem] h-[2rem] bg-[#1a493d] text-[#FAF7EC] rounded-md"
          @click="handleLogin"
        >
          Login
        </button>
        <div class="flex flex-row gap-2 mt-2">
          <p>Aún no tienes una cuenta?</p>
          <router-link to="/register" class="text-[#3d491a]">¡ÚNETE!</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background: url('@/assets/Images/Background.gif') center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0.9;
}
</style>
