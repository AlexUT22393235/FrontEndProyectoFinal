<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Deja una valoración</h2>

    <form @submit.prevent="submitReview">

      <div class="mb-4">
        <label class="block font-medium mb-1">Calificación:</label>
        <div class="flex space-x-2 text-yellow-500 text-2xl">
          <span
            v-for="star in 5"
            :key="star"
            class="cursor-pointer"
            @click="rating = star"
          >
            {{ star <= rating ? "★" : "☆" }}
          </span>
        </div>
      </div>


      <div class="mb-4">
        <label class="block font-medium mb-1">Comentario:</label>
        <textarea
          v-model="comment"
          class="w-full p-2 border rounded"
          rows="3"
          placeholder="Escribe tu opinión..."
        ></textarea>
      </div>


      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        :disabled="rating === 0 || comment.trim() === ''"
      >
        Enviar Valoración
      </button>
    </form>

    <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const rating = ref(0);
const comment = ref("");
const message = ref("");

const submitReview = () => {
  if (rating.value === 0 || comment.value.trim() === "") {
    return;
  }


  console.log("Valoración enviada:", {
    rating: rating.value,
    comment: comment.value,
  });

  message.value = "¡Gracias por tu valoración!";
  rating.value = 0;
  comment.value = "";
};
</script>
