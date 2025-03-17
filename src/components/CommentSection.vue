<template>
    <div class="comment-section">
      <h2>Comentarios</h2>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <div class="user-photo-wrapper">
            <img
              v-if="comment.foto"
              :src="comment.foto"
              alt="Foto de usuario"
              class="user-photo"
            />
            <div v-else class="user-placeholder">
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
    foto?: string | null; // Permite null en caso de no tener foto el usuario 
  }
  
  export default defineComponent({
    name: 'CommentSection',
    props: {
      comments: {
        type: Array as () => Comment[], // Especifica que es un array de Comment
        required: true,
      },
    },
  });
  </script>
  


  <style scoped>
   /* Estilos para los comentarios Fernando Gomez Toledo 22393139 */
  .comment-section {
    margin-top: 40px;
  }
  
  .comment {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  
  .comment-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .user-photo-wrapper {
    width: 40px;
    height: 40px;
    min-width: 40px; /* Evita que se deforme */
    min-height: 40px;
    aspect-ratio: 1/1; /* Mantiene el círculo perfecto */
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc; /* Color de fondo si no hay imagen */
  }
  
  .user-photo {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Recorta la imagen para que siempre llene el círculo */
  }
  
  .user-placeholder {
    font-weight: bold;
    color: white;
    text-transform: uppercase;
    font-size: 1rem;
  }
  
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
  