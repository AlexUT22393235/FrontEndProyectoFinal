<template>
    <div class="product-details">
      <!-- Contenedor de las dos columnas (imagen y descripción), Fernando Gomez Toledo 22393139 -->
      <div class="columns-container">

        <!-- Columna Izquierda: Imagen y Título, Fernando Gomez Toledo 22393139 -->
        <div class="left-column">
          <div class="product-image">
            <img :src="product.image" :alt="product.name" class="main-image" />
          </div>

        </div>

        <!-- Columna Derecha: Descripción y Botón, Fernando Gomez Toledo 22393139 -->
        <div class="right-column">

            <h1 class="product-title">{{ product.name }}</h1>
            <p class="user">Publicado por: {{ product.user }}</p>

          <p class="description">{{ product.description }}</p>

          <button class="whatsapp-button">Contactar por WhatsApp</button>
        </div>
      </div>

      <!-- Carrusel de Imágenes (debajo de las dos columnas y ocupa todo el ancho de la paguina), Fernando Gomez Toledo -->
      <div class="carousel-container">
        <Carousel :images="product.images" />
      </div>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue';
  import Carousel from './Carousel.vue';

  export default defineComponent({
    name: 'ProductDetails',
    components: {
      Carousel,
    },
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
  });
  </script>

  <style scoped>

  /* Estilos para Detalles de producto Fernando Gomez Toledo 22393139*/
  .product-details {
    display: flex;
    flex-direction: column; /* Todo en columna (imagen, descripción y carrusel) */
    gap: 20px;
    padding: 20px;
  }

  .columns-container {
    display: flex;
    flex-direction: column; /* Columnas apiladas en móviles */
    gap: 20px;
  }

  .left-column,
  .right-column {
    width: 100%; /* Ocupa todo el ancho en móviles */
  }

  .product-image img.main-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .product-title {
    font-size: 24px;
    margin-top: 10px;
    text-align: center;
  }

  .user {
    font-size: 16px;
    color: #777;
    margin-top: 15px;
  }

  .description {
    text-align: justify  !important; /* Texto justificado para la Descripcion del producto, Fernando Gomez Toledo 22393139*/
    font-size: 16px;
    color: #555;
    margin-top: 25px;
  }

  .whatsapp-button {
    width: 100%; /* Mismo ancho que los demás elementos Boton de Whatsapp*/
    background-color: #5B735D; /* colo oficial para botones */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 80px;
    transition: background-color 0.3s ease;
  }

  .whatsapp-button:hover {
    background-color: #128c7e;
  }

  /* Contenedor del carrusel */
  .carousel-container {
    width: 100%; /* Ocupa todo el ancho */
    margin-top: 20px; /* Espacio entre las columnas y el carrusel */
  }


  /* Estilos para desktop, Fernando Gomez Toledo 22393139 */
  @media (min-width: 768px) {
    .columns-container {
      flex-direction: row; /* Dos columnas en desktop */
      align-items: flex-start; /* Alinea las columnas en la parte superior */
    }

    .left-column {
      width: 50%; /* Columna izquierda ocupa la mitad */
    }

    .right-column {
      width: 50%; /* Columna derecha ocupa la mitad */
      padding-left: 20px; /* Espacio entre columnas */
    }

    .product-title {
      text-align: left; /* Título alineado a la izquierda en desktop */
    }

    .description {
      text-align: left; /* Descripción alineada a la izquierda en desktop */
    }
  }

  /* Estilos para dispositivos móviles, Fernando Gomez Toledo 22393139*/
  @media (max-width: 768px) {
    .product-image img.main-image {
      max-width: 100%; /* Ajusta el tamaño de la imagen en móviles */
    }

    .whatsapp-button {
      width: 100%; /* Botón de ancho completo en móviles */
      padding: 15px; /* Más grande para facilitar el toque */
    }

    .description {
      font-size: 14px; /* Texto un poco más pequeño en móviles */
    }
  }
  </style>
