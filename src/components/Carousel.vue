<template>
    <div class="carousel">
      <div v-for="(image, index) in images" :key="index" class="carousel-item">
        <div class="card">
          <img :src="image" :alt="'Imagen ' + (index + 1)" class="carousel-image" />
          
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Carousel',
    props: {
      images: {
        type: Array as () => string[], 
        required: true,
      },
    },
  });
  </script>
  

  <style scoped>
  /* Estilos para las cart del carrucel */
  .carousel {
    display: flex;
    overflow-x: auto;
    gap: 20px; /* Espacio entre las tarjetas */
    padding: 10px;
    margin-top: 20px;
  }
  
  .carousel-item {
    flex: 0 0 auto; /* Evita que los elementos se estiren */
  }
  
  .card {
    border: 1px solid #ddd; /* Borde de la tarjeta */
    border-radius: 10px; /* Bordes redondeados */
    overflow: hidden; /* Asegura que la imagen no sobresalga */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para efecto de elevación */
    transition: transform 0.3s ease; /* Efecto de hover */
  }
  
  .card:hover {
    transform: translateY(-5px); /* Efecto de elevación al pasar el mouse */
  }
  
  .carousel-image {
    width: 200px; /* Tamaño fijo para las imágenes */
    height: 150px; /* Tamaño fijo para las imágenes */
    object-fit: cover; /* Ajusta la imagen sin distorsionarla */
  }
  
  .card-footer {
    padding: 10px;
    text-align: center;
    background-color: #f9f9f9; /* Color de fondo del pie de tarjeta */
  }
  
  .card-footer p {
    margin: 0;
    font-size: 14px;
    color: #333;
  }


/* Estilos para dispositivos móviles, Fernando Gomez Toledo 22393139 */
@media (max-width: 768px) {
  .carousel-image {
    width: 150px; /* Tamaño más pequeño para móviles */
    height: 100px;
  }

  .card-footer p {
    font-size: 12px; /* Texto más pequeño en móviles */
  }
}

  </style>