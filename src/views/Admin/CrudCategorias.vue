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
                      <p className='font-semibold text-2xl'>Categoria</p>
                      <button class="bg-green-600 w-[7vw] text-white rounded-md py-1 cursor-pointer" @click="openModal">Agregar</button>
                    </div>
                    <table className='  w-full table-fixed rounded-3xl my-[3vh] bg-[#dfe6da]'>
                        <thead className=''>
                            <tr className='border-zinc-400  text-zinc-600'>
                                <th className='font-semibold px-[1vw] py-[1vh] w-[20%]'>Imagen</th>
                                <th className='font-semibold px-[1vw] py-[1vh] w-[20%]'>Id</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Nombre</th>
                                <th className='font-semibold px-[1vw] py-[1vh] w-[20%]'>Acciones</th>

                            </tr>
                        </thead>
                        <tbody className='text-zinc-600'>
                            <tr v-for="(item, index) in data" :key="index">
                              <td className='px-[1vw] py-[1vh] border-t border-r border-zinc-400 '>
                                  <div class="w-[10vh] h-[10vh] m-auto">
                                    <img :src="item.imagenCategoria" class="object-cover w-full h-full rounded-2xl  " />
                                  </div>
                                </td>
                                <td className='px-[1vw] py-[1vh] border-t border-r border-zinc-400 text-center'>{{ item.idCategoria }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.nombre }}</td>

                                <td className='px-[1vw] py-[1vh] border-t border-l border-zinc-400 '>
                                  <div class="w-full flex justify-center">
                                    <button class="bg-red-500 w-[7vw] text-white rounded-md py-1 m-auto cursor-pointer" @click="deleteItem(item.idCategoria)">Eliminar</button>
                                    <button class="bg-yellow-500 w-[7vw] text-white rounded-md py-1 m-auto" @click="openEditModal(item.idCategoria)">Editar</button>
                                  </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>

      </main>
    </div>

    <AddCategoryModal :isOpen="isModalOpen" :isEdit="isEdit" :editId="editId" @close="closeModal"  />
  </div>



</template>

<script setup lang="ts">
import { getCategoriesService, deleteCategoryService } from '@/services/categorieService';
import AddCategoryModal from '@/components/AddCategoryModal.vue';
import { ref } from 'vue';
import axios from 'axios'

const isModalOpen = ref(false);
const isEdit = ref(false);
const editId = ref(0);

const data = ref();
const fetchData = async () => {
    try {
      const response = await getCategoriesService()
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
      await deleteCategoryService(id)
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  fetchData();

  const openModal = () => { isModalOpen.value = true; };
  const openEditModal = (id:number) => { isModalOpen.value = true; isEdit.value = true ; editId.value = id};

  const closeModal = () => { isModalOpen.value = false; isEdit.value = false ; editId.value = 0; fetchData()};


</script>
