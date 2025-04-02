<template>
  <ConfirmationDash v-if="isConfirmationModalOpen === true" :accion="confirmationStuff.accion" tipo="producto" :nombre="confirmationStuff.nombre" @close="closeConfirmation" @act="confirmationStuff.action"/>
            <div className='w-full h-[88vh] p-[2vw] overflow-scroll'>
                    <div class="flex w-full justify-between">
                      <p className='font-semibold text-2xl'>Productos</p>

                    </div>
                    <table className='  w-full table-fixed rounded-3xl my-[3vh] bg-[#dfe6da]'>
                        <thead className=''>
                            <tr className='border-zinc-400  text-zinc-600'>
                                <th className='font-semibold px-[1vw] py-[1vh] w-[5%]'>Id</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Motivo</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Fecha</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Nombre del producto</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='text-zinc-600'>
                            <tr v-for="(item, index) in data" :key="index">
                                <td className='px-[1vw] py-[1vh] border-t border-r border-zinc-400 text-center'>{{ item.idReporte }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.motivoReporte }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.fechaReporte }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.nombreProducto  }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-l border-zinc-400 '>
                                  <div class="w-full flex justify-center">
                                    <button class="bg-black w-[45%] text-white rounded-md py-1 m-auto cursor-pointer" @click="openConfirmation('eliminar', item.nombre, () => deleteItem(item.productoId))" >Eliminar</button>
                                  </div>
                                </td>

                            </tr>
                            <tr v-if="!data || data.length === 0">
                              <td colspan="7" class="text-center py-4">No hay nada aún.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
</template>

<script setup lang="ts">
import { deleteProductService, reportProductService, getReportsProductService } from '@/services/productService';
import ConfirmationDash from '@/components/Modals/ConfirmationDash.vue';
import type { ReportProductDto } from '@/dtos/ReportProductDto'
import type { IProduct } from '@/interfaces/IProduct'
import { ref, onMounted } from 'vue';
import axios from 'axios'


const isConfirmationModalOpen = ref(false)

const confirmationStuff = ref({
  accion: '',
  nombre: '',
  action: () => {},
})


const openConfirmation = (accion:string, nombre:string, action: () => void) => {
  confirmationStuff.value.accion = accion
  confirmationStuff.value.nombre = nombre
  confirmationStuff.value.action = action;


  isConfirmationModalOpen.value = true
}
const closeConfirmation = () => {
  confirmationStuff.value.accion = ''
  confirmationStuff.value.nombre = ''

  isConfirmationModalOpen.value = false
}
const data = ref();


const fetchData = async () => {
    try {
      data.value = await getReportsProductService()
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.message);
      } else{
        console.error(error);
      }
    }
  }

  const deleteItem = async (id:number) => {
    try {
      const response = await deleteProductService(id)
      console.log(response)
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const discardReport = async (id:number) => {
    try {
      const reportProduct:ReportProductDto = { idProducto: id, reportado: false }
      await reportProductService(reportProduct)

      closeConfirmation()
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(async () => {
    await fetchData();
    await fetchReports();
});


</script>
