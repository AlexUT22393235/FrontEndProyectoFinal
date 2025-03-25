<template>
    <div>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="correoElectronico">Correo Electrónico:</label>
          <input type="correoElectronico" id="correoElectronico" v-model="correoElectronico" required>
        </div>
        <div>
          <label for="contrasenia">Contraseña:</label>
          <input type="contrasenia" id="contrasenia" v-model="contrasenia" required>
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p v-if="loginError" style="color: red;">{{ loginError }}</p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore';
  
  const correoElectronico = ref('');
  const contrasenia = ref('');
  const loginError = ref('');
  const router = useRouter();
  const authStore = useAuthStore();
  
  const handleLogin = async () => {
    loginError.value = '';
    try {
      const success = await authStore.login(correoElectronico.value, contrasenia.value);
      if (success) {
        router.push('/landing');
      } else {
        loginError.value = 'Error al iniciar sesión. Credenciales incorrectas.';
      }
    } catch (error: any) {
      loginError.value = error.message || 'Error al iniciar sesión.';
    }
  };
  </script>