<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">Reportar producto</h2>
      <form @submit.prevent="reportProduct">
        <div class="mb-4">
          <label class="block text-sm font-medium">Motivo del reporte</label>
          <select v-model="reportReason" class="input-field">
            <option value="spam">Spam</option>
            <option value="acoso">Acoso</option>
            <option value="contenido_inapropiado">Contenido inapropiado</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">Detalles adicionales (opcional)</label>
          <textarea v-model="reportDetails" class="input-field" rows="3"></textarea>
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" class="btn-cancel" @click="emit('close')">Cancelar</button>
          <button type="submit" class="btn-submit">Enviar Reporte</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ReportProductDto } from '@/dtos/ReportProductDto';
import { reportProductService } from '@/services/productService';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';

const emit = defineEmits(['close', 'submit']);
const reportReason = ref('');
const reportDetails = ref('');
const toast = useToast();
const route = useRoute()

const reportProduct = async () => {  //Falta validar un poco
  try {
    const product:ReportProductDto = { idProducto:Number(route.params.id), reportado:true };
    await reportProductService(product);
    console.log('si jala')
    emit('close')
    toast.success('Reporte enviado correctamente.');
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-cancel {
  background: #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit {
  background: #e53e3e;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
