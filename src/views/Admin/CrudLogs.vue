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
      <Navbar />

      <main class="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 ">

        <div class=" col-span-2">
          <div class='w-full h-[88vh] p-[2vw] overflow-scroll'>
                    <div class="flex w-full justify-between">
                      <p class='font-semibold text-2xl'>Logs</p>

                    </div>
                    <table class='  w-full table-fixed rounded-3xl my-[3vh] bg-[#dfe6da]'>
                        <thead class=''>
                            <tr class='border-zinc-400  text-zinc-600'>
                                <th class='font-semibold px-[1vw] py-[1vh] w-[5%]'>Id</th>
                                <th class='font-semibold px-[1vw] py-[1vh]'>Mensaje</th>
                                <th class='font-semibold px-[1vw] py-[1vh]'>Fecha en que ocurrio</th>
                                <th class='font-semibold px-[1vw] py-[1vh]'>Origen</th>
                                <th class='font-semibold px-[1vw] py-[1vh] w-[8%]'>Severidad</th>
                                <th class='font-semibold px-[1vw] py-[1vh]'>StackTrace</th>
                            </tr>
                        </thead>
                        <tbody class='text-zinc-600'>
                            <tr v-for="(item, index) in data" :key="index">
                                <td class='px-[1vw] py-[1vh] border-t border-r border-zinc-400 text-center'>{{ item.idLogError }}</td>
                                <td class='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.mensaje }}</td>
                                <td class='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ new Date(item.fechaOcurrencia).toLocaleDateString('es-MX', dateConfig) }}</td>
                                <td class='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.origen  }}</td>
                                <td class="px-[1vw] py-[1vh] border-t border-x border-zinc-400"
                                    :class="item.severidad == 'Error' ? 'text-red-600' : 'text-yellow-600'">
                                    {{ item.severidad }}
                                </td>
                                <td class="px-[1vw] py-[1vh] border-t border-x border-zinc-400">
                                  <div class="max-h-[10vh] overflow-y-auto whitespace-pre-wrap break-all">
                                    {{ item.stackTrace ? item.stackTrace : 'No disponible' }}
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

import Navbar from '@/components/Layout/DashboardNavbar.vue'

import { ref } from 'vue';
import axios from 'axios'
import { getLogsService } from '@/services/logService';

const data = ref();

const dateConfig: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',

    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

const fetchData = async () => {
    try {
      const response = await getLogsService()
      data.value = response;
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.message);
      } else{
        console.error(error);
      }
    }
  }

  fetchData();

</script>
