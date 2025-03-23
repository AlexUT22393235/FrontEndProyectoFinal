<template>
    <div class="product-view">
      <ProductDetails :product="product" />
      <CommentSection :comments="comments" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ProductDetails from '@/components/ProductDetails.vue';
  import CommentSection from '@/components/CommentSection.vue';
  
  // Imagenes Importadas de /src/assest/img. Fernando Gomez Toledo 22393139
  import bancanoronha from '../assets/Images/BANCADANORONHA.png';
  import frontal from '../assets/Images/frontal.png';
  import frontalderecha from '../assets/Images/Frontalderecha.png';
  import mueble from '../assets/Images/mueble.png';
  import mueble2 from '../assets/Images/Mueble2.png';
  import medidas from '../assets/Images/Medidas.png';
  import muebles3 from '../assets/Images/Mueble3.png';
  import Usuario1 from'../assets/Images/Usuario1.png';
  import Usuario3 from'../assets/Images/Usuario3.png';
  import Usuario4 from'../assets/Images/Usuario4.png';

  export default defineComponent({
    name: 'ProductView',
    components: {
      ProductDetails,
      CommentSection,
    },
    data() {
      return {
        product: {
          image: bancanoronha, // Se usa  la imagen importada, 22393139
          name: 'Banca de Noronha',
          user: 'Fernando Gomez Toledo',
          description: '"Este muebe de alta calidad es perfecta para interiores, diseñada con materiales resistentes de madera  que garantizan durabilidad y comodidad. Tiene una  estructura robusta, fabricada con madera tratada y acero inoxidable, la hace ideal para poner la tele, guardar objetos y poner objetos decorativos. Su diseño  proporciona una experiencia elegante. Con un estilo elegante y atemporal, este mueble complementará cualquier espacio de tu hogar, brindando un lugar acogedor para el descanso y la convivencia."',
          images: [
            frontal, // Se usa la imagen importada, 22393139
            frontalderecha, // Se usa la imagen importada, 22393139
            mueble, // Se usa la imagen importada, 22393139
            mueble2,
            medidas,
            muebles3,
          ],
        },
        comments: [
          { id: 1, user: 'yesica Hernandez', text: '¡Me encanta este producto!, es ideal para tener un espacio comodo en el hogar, Exelente calidad', foto: Usuario1 },
          { id: 2, user: 'Paola Andrea', text: 'Muy buena calidad.', foto: Usuario3 },
          {id: 3, user: 'Juan Lopez', text: 'Exelente producto muy buena calidad y facil de negociar', foto: Usuario4 } // se agrega la foto del usuario Fernando GOmez Toledo 22393139
        ],
      };
    },
  });
  </script>
  
  
  <style scoped>
  .product-view {
    padding: 20px;
  }
  </style>