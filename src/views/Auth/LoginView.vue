<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';


const email = ref('');
const password = ref('');
const loginError = ref('');
const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const handleLogin = async () => {
  loginError.value = '';
  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      console.log('ID del usuario:', user.value?.id);
      router.push('/landing');
    } else {
      loginError.value = 'Error al iniciar sesión. Credenciales incorrectas.';
    }
  } catch (error: any) {
    loginError.value = error.message || 'Error al iniciar sesión.';
  }
}; 
</script>
<template>
  <container class="bg-[#50683E] w-full h-full flex flex-row">
    <div class="flex justify-center items-center w-1/2 h-[50rem] bg-[#264026]">
      <div class="w-full h-[50rem] flex flex-col justify-center items-center">
        <img src="@/assets/Images/noTrash.jpeg" alt="Logo" class="w-[55rem] h-[50rem]" />
      </div>
    </div>
    <div class="main-container flex flex-col justify-center items-center w-1/2 h-[50rem] bg-[#50683E]">
      <div class=" m-4 p-4">
        <h1 class="text-3xl font-bold text-[#FAF7EC] text-center ">Login Page</h1>
      </div>

      <div class="bg-[#FAF7EC] w-[30rem] h-[30rem] flex flex-col justify-center items-center">
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
          class="w-[20rem] h-[2rem] bg-[#3d491a] text-[#FAF7EC] rounded-md"
          @click="handleLogin"
        >
          Login
        </button>
        <p v-if="loginError" style="color: red;">{{ loginError }}</p>
        <div class="flex flex-row gap-2 mt-2">
          <p>Aun no tienes una cuenta?</p>
          <router-link to="/register" class="text-[#3d491a]">UNETE!!</router-link>
        </div>
      </div>
    </div>
  </container>
</template>
<style scoped>
.main-container {
  background: url('@/assets/Images/loginBackground.png') center center;
  background-repeat: repeat;
}
</style>