<template>
    <!-- Utilización de Tailwind para la sección de comentarios, Fernando Gomez Toledo 22393139 -->
  <div class="comment-section mt-10">
    <h2 class="text-2xl font-semibold mb-4">Comentarios</h2>
    <div v-for="comment in comments" :key="comment.id" class="comment border-b border-gray-300 py-3">
      <div class="comment-header flex items-center gap-3">
        <div class="user-photo-wrapper w-10 h-10 min-w-10 min-h-10 aspect-square rounded-full overflow-hidden flex justify-center items-center bg-gray-300">
          <img
            v-if="comment.foto"
            :src="comment.foto"
            alt="Foto de usuario"
            class="user-photo w-full h-full object-cover"
          />
          <div v-else class="user-placeholder text-white font-bold text-lg uppercase">
            {{ comment.user.charAt(0).toUpperCase() }}
          </div>
        </div>
        <p><strong>{{ comment.user }}</strong>: {{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  // Define la interfaz para un comentario, Fernando Gomez Toledo 22393139
  interface Comment {
    id: number;
    user: string;
    text: string;
    foto?: string | null; // Permite null en caso de no tener foto el usuario, Fernando Gomez Toledo 22393139
  }
  
  export default defineComponent({
    name: 'CommentSection',
    props: {
      comments: {
        type: Array as () => Comment[], // Especifica que es un array de Comment, Fernando Gomez Toledo 22393139
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
   /* Estilos responsivos para telefonos Fernando Gomez Toledo 22393139*/
  @media (max-width: 600px) {
    .comment-header {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .user-photo-wrapper {
      width: 35px;
      height: 35px;
      min-width: 35px;
      min-height: 35px;
    }
  }
  </style>
  