<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">Editar Perfil</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Nombre</label>
          <input
            v-model="editedProfile.nombrePerfil"
            type="text"
            class="input-field"
            placeholder="Nombre del perfil"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Descripción</label>
          <textarea
            v-model="editedProfile.descripcion"
            class="input-field"
            placeholder="Descripción del perfil"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Imagen de Perfil</label>
          <input
            v-model="editedProfile.imagenPerfil"
            type="text"
            class="input-field"
            placeholder="URL de la imagen"
          />
        </div>
        <div class="flex justify-end gap-4">
          <button type="button" @click="$emit('close')" class="btn-cancel">
            Cancelar
          </button>
          <button type="submit" class="btn-submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification'; // Importar el hook useToast
import UserProfile from '@/views/UserProfileView.vue';

const props = defineProps({
  userProfile: {
    type: Object as () => typeof UserProfile,
    required: true,
  },
});

const emit = defineEmits(['close', 'submit']);
const editedProfile = ref({ ...props.userProfile });


const toast = useToast();

watch(
  () => props.userProfile,
  (newProfile) => {
    editedProfile.value = { ...newProfile };
  }
);

const submitForm = async () => {
  try {

    emit('submit', editedProfile.value);


    toast.success('¡Cambios guardados correctamente, recarga para ver los cambios!');
  } catch (error) {

    
    toast.error('Hubo un error al guardar los cambios.');
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
  background: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
