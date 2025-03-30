<template>
  <ConfirmationDash v-if="isConfirmationModalOpen === true" :accion="confirmationStuff.accion" tipo="producto" :nombre="confirmationStuff.nombre" @close="closeConfirmation" @act="confirmationStuff.action"/>
            <div className='w-full h-[88vh] p-[2vw] overflow-scroll'>
                    <div class="flex w-full justify-between">
                      <p className='font-semibold text-2xl'>Productos</p>

                    </div>
                    <table className='  w-full table-fixed rounded-3xl my-[3vh] bg-[#dfe6da]'>
                        <thead className=''>
                            <tr className='border-zinc-400  text-zinc-600'>
                                <th className='font-semibold px-[1vw] py-[1vh] w-[20%]'>Imagen</th>
                                <th className='font-semibold px-[1vw] py-[1vh] w-[5%]'>Id</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Nombre</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Descripción</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Estado de negociación</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Tipo de negociación</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='text-zinc-600'>
                            <tr v-for="(item, index) in data" :key="index">
                                <td className='px-[1vw] py-[1vh] border-t border-r border-zinc-400 '>
                                  <div class="w-[10vh] h-[10vh] m-auto">
                                    <img v-for="(img, index) in item.imagenes" :key="index"  :src="img.urlImagen" class="object-cover w-full h-full rounded-2xl  " />
                                  </div>
                                </td>
                                <td className='px-[1vw] py-[1vh] border-t border-r border-zinc-400 text-center'>{{ item.idProducto }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.nombre }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.descripcion }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.procesoNegociacion == true ? 'En negociación' : 'En espera'  }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.intercambio == true ? 'Intercambio' : 'Donación'}}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-l border-zinc-400 '>
                                  <div class="w-full flex justify-center">
                                    <button class="bg-black w-[45%] text-white rounded-md py-1 m-auto cursor-pointer" @click="openConfirmation('eliminar', item.nombre, () => deleteItem(item.idProducto))" >Eliminar</button>
                                    <button class="bg-green-800 w-[45%] text-white rounded-md py-1 m-auto cursor-pointer" @click="openConfirmation('descartar el reporte', item.nombre, () => discardReport(item.idProducto))">Descartar</button>
                                  </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
</template>

<script setup lang="ts">
import { getProductsService, deleteProductService, reportProductService } from '@/services/productService';
import ConfirmationDash from '@/components/Modals/ConfirmationDash.vue';
import type { ReportProductDto } from '@/dtos/ReportProductDto'
import type { IProduct } from '@/interfaces/IProduct'
import { ref } from 'vue';
import axios from 'axios'

const data = ref();
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

const fetchData = async () => {
    try {
      const response = await getProductsService()
      console.log(response)
      data.value = response.filter((item:IProduct) => item.reportado == true);
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

  fetchData();

</script>
