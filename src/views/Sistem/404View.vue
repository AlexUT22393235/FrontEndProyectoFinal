<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToLanding = () => {
  router.push("/landing");
};
</script>

<template>
  <div class="main-container h-screen flex justify-center items-center">
    <div class="content w-full h-full flex flex-col justify-center items-center px-4">
      <!-- Código de error 404 -->
      <div class="text-9xl text-[#FAF7EC] font-bold font-sans">404</div>

      <!-- Mensaje de error -->
      <div class="text-3xl text-[#FAF7EC] mt-4">Ups, Página no encontrada</div>

      <!-- Imagen -->
      <div class="flex justify-center items-center w-full mt-6">
        <img src="@/assets/Images/no-hay-resultados.png" alt="404 Image" class="w-1/4 h-auto" />
      </div>

    
      <button
        @click="goToLanding"
        class="mt-6 px-6 py-2 bg-[#a1c9a6] text-[#3d491a] font-semibold rounded-md hover:bg-[#e5e0d6] transition">
        Volver a Inicio
      </button>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background: url('@/assets/Images/background.gif') center center;
  background-repeat: repeat;
  background-size: cover;
}

.content {
  background: rgba(61, 73, 26, 0.8);
  text-align: center;
}
</style>
