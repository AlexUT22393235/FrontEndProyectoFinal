<template>
  <div class="product-view">
    <ProductDetails
      v-if="product"
      :product="product"
      @contact-whatsapp="showWhatsAppModal"
    />
    <div v-else-if="loading" class="loading">Cargando producto...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <!-- @contact-whatsapp="showWhatsAppModal" Este debe estar arriba justo abajo de :product="product" -->


    <!-- <div v-else-if="loading" class="loading">Cargando producto...</div>
    <div v-else-if="error" class="error">{{ error }}</div> -->

    <!-- Modal de WhatsApp -->
    <!-- <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Confirmar contacto</h3>
        <p>¿Deseas contactar a {{ userData?.nombre }}?</p>
        <div class="modal-actions">
          <button @click="showModal = false">Cancelar</button>
          <button @click="handleWhatsAppRedirect">Continuar</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { IProductDetail } from '../interfaces/IProductDetail';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductDetails from '../components/ProductDetails.vue';
import { useProductStore } from '../stores/productStore';
const product = ref<IProductDetail | null>(null);
const productStore = useProductStore();
const route = useRoute();

const loading = ref(true);
const error = ref<string | null>(null);

const showModal = ref(false);

// Obtener el ID del producto desde la ruta
const productId = Number(route.params.id);

onMounted(async () => {
  try {
    loading.value = true;
    await productStore.fetchProductDetails(productId);
    product.value = productStore.product; // Asignar el producto al estado local
  } catch (err) {
    console.error('Error al cargar el producto:', err);
    error.value = 'No se pudo cargar el producto. Intenta nuevamente.';
  } finally {
    loading.value = false;
  }
});

const showWhatsAppModal = () => {
  showModal.value = true;
};


    // const showWhatsAppModal = () => {
    //   showModal.value = true;
    // };

    // const handleWhatsAppRedirect = () => {
    //   if (userData.value?.telefono) {
    //     const phone = userData.value.telefono.replace(/\D/g, '');
    //     const message = `Hola ${userData.value.nombre}, estoy interesado en tu producto "${product.value?.nombre}"`;
    //     window.open(
    //       `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`,
    //       '_blank'
    //     );
    //   }
    //   showModal.value = false;
    // };

    // // Cargar datos cuando cambie el ID en la ruta

    // return {
    //   product,
    //   userData,
    //   loading,
    //   error,
    //   showModal,
    //   showWhatsAppModal,
    //   handleWhatsAppRedirect,
    // };

</script>

<style scoped>
.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
}

.error {
  color: #ff4444;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-weight: 500;
}

.modal-actions button:first-child {
  background: #f5f5f5;
}

.modal-actions button:last-child {
  background: #25D366;
  color: white;
}
</style>
