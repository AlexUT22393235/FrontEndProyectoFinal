<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4 text-center">Eliminar Cuenta</h2>
      <p class="mb-4 text-center">¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
      <div class="flex justify-center gap-4">
        <button @click="confirmDelete" class="btn-delete">Eliminar</button>
        <button @click="emit('close')" class="btn-cancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'confirm']);
const toast = useToast();

const confirmDelete = async () => {
  try {
    await axios.delete(`https://localhost:7140/api/Perfil/${props.userProfile.idPerfil}`);
    toast.success('Cuenta eliminada correctamente.');
    emit('confirm'); // Emite confirm para manejarlo en el padre
  } catch (error) {
    toast.error('Error al eliminar la cuenta.');
    console.error(error);
  }
};
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
  text-align: center;
}

.btn-delete {
  background: #e53e3e;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  background: #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
