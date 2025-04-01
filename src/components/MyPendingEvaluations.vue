<template>
    <div className='w-full h-[88vh] p-[2vw] overflow-scroll'>
      <div class="flex w-full justify-between">
        <p className='font-semibold text-2xl'>Evaluaciones Pendientes</p>
      </div>
      <table className='w-full table-fixed rounded-3xl my-[3vh] bg-[#dfe6da]'>
        <thead>
          <tr className='border-zinc-400 text-zinc-600'>
            <th className='font-semibold px-[1vw] py-[1vh] w-[20%]'>Fecha Creación</th>
            <th className='font-semibold px-[1vw] py-[1vh]'>Usuario</th>
            <th className='font-semibold px-[1vw] py-[1vh]'>Producto</th>
            <th className='font-semibold px-[1vw] py-[1vh] w-[20%]'>Acciones</th>
          </tr>
        </thead>
        <tbody className='text-zinc-600'>
          <tr v-for="evaluation in evaluations" :key="evaluation.idEvaluacion">
            <td className='px-[1vw] py-[1vh] border-t border-r border-zinc-400 text-center'>{{ evaluation.fechaCreacion }}</td>
            <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ evaluation.nombreUsuario }}</td>
            <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ evaluation.nombreProducto }}</td>
            <td className='px-[1vw] py-[1vh] border-t border-l border-zinc-400 '>
              <div class="w-full flex justify-center">
                <button class="bg-red-500 w-[7vw] text-white rounded-md py-1 m-auto cursor-pointer" @click="deleteEvaluation(evaluation.idEvaluacion)">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script setup lang="ts">
  import { getEvaluationsOfertanteService, getEvaluationsSolicitantService } from '@/services/evaluationService';
  import { useEvaluationStore } from '../stores/evaluationStore'; // Ajusta la ruta
  import { onMounted, computed, ref } from 'vue';
  import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const dataSol = ref();
  const dataOf = ref();

  const evaluationStore = useEvaluationStore();

  const fetchData = async (id:number) => {
    console.log(id)
    try {
      dataSol.value = await getEvaluationsSolicitantService(id)
      console.log(dataSol.value)
    } catch (error) {
      console.error(error)
    }

    try {
      dataOf.value = await getEvaluationsOfertanteService(id)
      console.log(dataOf.value)
    } catch (error) {
      console.error(error)
    }
  }

  const evaluations = computed(() => evaluationStore.evaluations);

  const deleteEvaluation = async (id: number) => {
    try {
      await evaluationStore.deleteEvaluation(id);
      console.log('Evaluación eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la evaluación:', error);
    }
  };

  onMounted(() => {
    fetchData(user.value.id)
  });

  </script>
