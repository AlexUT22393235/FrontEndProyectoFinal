<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { getUserService } from '@/services/usersService';
import { getProfileService } from '@/services/profileService';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const toast = useToast();

const handleLogin = async () => {
    try {
        const response = await authStore.login(email.value, password.value);
        if (!response.success) {
          return toast.error(response.message || 'Error al iniciar sesión. Inténtalo nuevamente.');
        }
        toast.success('Inicio de sesión exitoso!');
        const usuario = await getUserService(user.value?.id)
        if (!usuario) {
            return toast.error('Usuario no encontrado');
        }

        try {
            const response = await getProfileService(user.value.id)
            if (response.length > 0) {
                return router.push('/landing');
            }
            router.push('/createProfile');
        } catch (error) {
          console.error(error)
          return toast.error('Error al consultar el perfil.');
        }
    } catch (error) {
        console.error('Error de autenticación:', error);
        toast.error('Ocurrió un problema al iniciar sesión.');
    }
};
</script>

<template>
  <div class="bg-[#4b6934] w-full h-screen flex flex-row justify-center items-center">
    <div class="flex justify-center items-center w-1/2 h-full bg-[#264026]">
      <div class="w-[40rem] h-[40rem]">
        <img src="@/assets/Images/noTrash.jpeg" alt="Logo" class="w-[40rem] h-[40rem]" />
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
  background: url('@/assets/Images/nuevo.png') center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}
</style>
