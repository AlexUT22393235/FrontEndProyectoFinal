<template>
  <div class="product-view">
    <ProductDetails 
      v-if="productData && userData" 
      :product="productData"
      :user="userData"
      @contact-whatsapp="showWhatsAppModal"
    />
    <div v-else-if="loading">Cargando producto...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>

    <div v-if="showModal" class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="modal-content bg-white p-6 rounded-lg max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Confirmar contacto</h3>
        <p class="mb-4">Estás a punto de contactar a {{ userData?.nombre }} {{ userData?.apellido }} por WhatsApp</p>
        <div class="flex justify-end gap-3">
          <button 
            @click="showModal = false"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button 
            @click="redirectToWhatsApp"
            class="px-4 py-2 bg-[#25D366] text-white rounded hover:bg-[#128C7E]"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ProductDetails from '../components/ProductDetails.vue';
import { getProductByIdService, getUserByIdService } from '../services/productService';
import type { IProduct } from '../interfaces/IProduct';
import type { IUsuario } from '../interfaces/IUsuario';

export default defineComponent({
  name: 'ProductView',
  components: {
    ProductDetails,
  },
  setup() {
    const productData = ref<IProduct | null>(null);
    const userData = ref<IUsuario | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const showModal = ref(false);
    const selectedProductId = ref<number | null>(null);

    const fetchData = async (productId: number) => {
      try {
        // Obtener producto
        const productResponse = await getProductByIdService(productId);
        productData.value = productResponse.data;
        
        // Obtener datos del usuario
        if (productData.value?.usuarioId) {
          const userResponse = await getUserByIdService(productData.value.usuarioId);
          userData.value = userResponse.data;
        }
      } catch (err: any) {
        error.value = err.message || 'Error al cargar los datos';
      } finally {
        loading.value = false;
      }
    };

    const showWhatsAppModal = () => {
      showModal.value = true;
    };

    const redirectToWhatsApp = () => {
      if (userData.value?.telefono) {
        const phone = userData.value.telefono.replace(/\D/g, ''); // Limpiar formato
        const message = `Hola ${userData.value.nombre}, estoy interesado en tu producto "${productData.value?.nombre}"`;
        const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
        window.open(whatsappUrl, '_blank');
      }
      showModal.value = false;
    };

    onMounted(async () => {
      // Cambiar por this.$route.params.id si usas rutas dinámicas
      const productId = 2; 
      await fetchData(productId);
    });

    return {
      productData,
      userData,
      loading,
      error,
      showModal,
      showWhatsAppModal,
      redirectToWhatsApp,
    };
  },
});
</script>

  
  
  <style scoped>
  .product-view {
    padding: 20px;
  }

  .error-message {
  color: red;
  text-align: center;
  padding: 20px;
}

.modal-content {
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  </style>