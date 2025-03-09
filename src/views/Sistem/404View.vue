<script setup lang="ts">
</script>

<template>
  <div class="main-container">
    <container class="content">
      <div class="text-9xl flex justify-center items-center w-full text-[#FAF7EC] font-bold font-sans">
        404
      </div>

      <div class="text-3xl flex justify-center items-center w-full text-[#FAF7EC]">
        Ups, Página no encontrada
      </div>

      <div class="flex justify-center items-center w-full">
        <img src="@/assets/Images/no-hay-resultados.png" alt="404 Image" class="w-1/4 h-auto" />
      </div>
    </container>
  </div>
</template>

<style scoped>
.main-container {
 
  background: url('@/assets/Images/background.gif')  center center;
background-repeat: repeat;
}

.content {
  width: 100%;
  height: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(61, 73, 26, 0.8); /* Un fondo semitransparente encima del GIF */
 
}
</style>
