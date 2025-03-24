<template>
  <div class="max-w-2xl mx-auto p-4  shadow-lg rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">Valoraciones Recibidas</h2>

    <div v-if="reviews.length > 0">
      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="border-b last:border-b-0 py-4"
      >
        <div class="flex items-center gap-2">
          <span class="font-semibold">{{ review.user }}</span>
          <div class="flex text-yellow-500">
            <span v-for="star in 5" :key="star" class="text-lg">
              {{ star <= review.rating ? "★" : "☆" }}
            </span>
          </div>
        </div>
        <p class="text-gray-600 mt-2">{{ review.comment }}</p>
        <p class="text-sm text-gray-400">Producto: {{ review.product }}</p>
      </div>
    </div>

    <p v-else class="text-gray-500">Aún no hay valoraciones.</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const reviews = ref([
  { user: "Carlos Pérez", rating: 5, comment: "Excelente producto!", product: "Laptop Dell" },
  { user: "Ana Gómez", rating: 4, comment: "Buen servicio, pero tardó en llegar.", product: "Auriculares Sony" },
  { user: "Luis Martínez", rating: 3, comment: "Regular calidad, esperaba más.", product: "Mouse inalámbrico" },
]);
</script>
