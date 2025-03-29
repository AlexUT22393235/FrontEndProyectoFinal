<template>
  <div class="flex h-screen bg-[#FAF7EC]">
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
                                <th class='font-semibold px-[1vw] py-[1vh] w-[15%]'>Fecha en que ocurrio</th>
                                <th class='font-semibold px-[1vw] py-[1vh]'>Origen</th>
                                <th class='font-semibold px-[1vw] py-[1vh] w-[8%]'>Severidad</th>
                                <th class='font-semibold px-[1vw] py-[1vh]'>StackTrace</th>
                            </tr>
                        </thead>
                        <tbody class='text-zinc-600'>
                            <tr v-for="(item, index) in data" :key="index">
                                <td class='px-[1vw] py-[1vh] border-t border-r border-zinc-400 text-center'>{{ item.idLogError }}</td>
                                <td class='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.mensaje }}</td>
                                <td class='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ formatDate(item.fechaOcurrencia) }}</td>
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
import type { ILog } from '@/interfaces/ILog';

const data = ref<ILog[]>([]);

const dateConfig: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',

    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  const formatDate = (date:string) => new Date(date).toLocaleDateString('es-MX', dateConfig)

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
