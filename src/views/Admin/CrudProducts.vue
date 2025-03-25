<template>
  <div class="flex h-screen bg-[#FAF7EC]">
    <!-- Sidebar -->
    <!-- <aside class="w-64 bg-[#50683E] text-white flex flex-col">
      <div class="p-6 text-2xl font-bold">Admin Panel</div>
      <nav class="flex-1">
        <ul class="space-y-2">
          <li v-for="(item, index) in menuItems" :key="index">
            <button
              class="w-full text-left px-6 py-3 hover:bg-[#3A4F2A] transition duration-200"
              @click="setActive(index)">
              {{ item.name }}
            </button>
          </li>
        </ul>
      </nav>

    </aside> -->


    <div class="flex-1 flex flex-col">
      <header class="bg-[#FAF7EC] shadow-md p-6 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
      </header>


      <main class="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 ">

        <div class=" col-span-2">
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
                                    <button class="bg-red-500 w-[7vw] text-white rounded-md py-1 m-auto cursor-pointer" @click="deleteItem(item.idProducto)">Eliminar</button>
                                  </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>

      </main>
    </div>

  </div>



</template>

<script setup lang="ts">
import { getProductsService, deleteProductService } from '@/services/productService';

import { ref } from 'vue';
import axios from 'axios'

const data = ref();
const fetchData = async () => {
    try {
      const response = await getProductsService()
      data.value = response;
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
      await deleteProductService(id)
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  fetchData();

</script>
