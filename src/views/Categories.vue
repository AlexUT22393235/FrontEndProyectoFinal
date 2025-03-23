<template>
  <div class="w-full min-h-screen bg-[#FAF7EC] flex flex-col items-center p-8">
    <h1 class="text-5xl font-bold text-[#2C3E50] mb-8">Categorías</h1>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 w-full max-w-7xl">
      <div v-for="(category, index) in categories" :key="index"
           class="bg-white shadow-lg rounded-xl w-72 h-72 flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-110 overflow-hidden relative">
        <img :src="category.image" :alt="category.name" class="w-full h-full object-cover">
        <div class="absolute bottom-0 w-full bg-[#50683E] bg-opacity-70 text-white text-center py-3 text-lg font-semibold">
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const categories = [
  { name: "Electrónica", image: "https://i.pinimg.com/736x/67/4a/a7/674aa767c2f79334dad6f70b77a98381.jpg" },
  { name: "Ropa y Moda", image: "https://i.pinimg.com/736x/8f/9e/7d/8f9e7d90250087a4ddab259faecde767.jpg" },
  { name: "Hogar", image: "https://i.pinimg.com/736x/07/43/d9/0743d91bc7c8e34e65f5f20f19c7101e.jpg" },
  { name: "Deportes", image: "https://i.pinimg.com/736x/40/ec/f9/40ecf97752ad77e030736fb823d20757.jpg" },
  { name: "Juguetes", image: "https://i.pinimg.com/736x/95/da/45/95da45a7a28e7e9475eb56c371215b87.jpg" },
  { name: "Libros", image: "https://i.pinimg.com/736x/b0/7b/4c/b07b4ce59e94da2f872486c3fe96dd99.jpg" },
  { name: "Mascotas", image: "https://i.pinimg.com/736x/fa/a4/d0/faa4d00f61bc882b7efda8cb0214dec1.jpg" },
  { name: "Otros", image: "https://i.pinimg.com/736x/41/72/2f/41722f20ffeef6c3becc2486f11564a2.jpg" },
];
</script>
