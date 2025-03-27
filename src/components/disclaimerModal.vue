<script setup lang="ts">
import { postTradeService } from '@/services/productService.ts'
import type { postTrade } from '@/dtos/postTradeDto.ts'
import axios from 'axios'



  const handleTrade = async () => {
    try {
      const response = await postTradeService(props.trade)
      console.log(response)
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.message)
      } else{
        console.error(error)
      }
    }
  }


  const emit = defineEmits(['close']);

  const props = defineProps<{
      userName?: string;
      phone?: string;
      productName?: string;

      trade: postTrade;
    }>();

    console.log(props.trade)

</script>
<template>
  <div class="w-[100vw] h-[100vh] absolute bg-black/40 backdrop-blur-xs flex justify-center items-center">
    <div class="bg-white w-[40vw] h-[70vh] rounded-lg shadow-lg flex flex-col p-[5vh] flex-wrap gap-y-[3%] px-[3vw] justify-around relative">
      <p class='font-semibold text-xl w-full text-center  text-slate-700'>¿Deseas iniciar un nuevo intercambio?</p>
      <button @click="$emit('close')" type='button' class='text-red-500 font-bold absolute top-[1vh] right-[1vw] cursor-pointer w-[1vw] h-[1vw]'>X</button>
        <div class='flex flex-wrap flex-col text-xl justify-between gap-[2vh]'>
          <p class="text-green-900">¿Estás seguro que deseas iniciar un nuevo intercambio?</p>
          <p>En Strade&#8482; procuramos fomentar un ambiente en el que se pueda comerciar libremente etre usuarios, por dicha razon proporcionamos las herrammientas adecuadas
              para que diferentes usuarios puedan interactuar. Sin embargo, no podemos controlar las interacciones entre los usuarios afuera de la pagina.
          </p>
          <p>Por este motivo, <span class="text-green-800">pedimos que al momento de comerciar, sea amable y tenga cuidado.</span> Tambien recuerde en señalar como completado el intercambio despues de finalizar.
          </p>
        </div>
        <div class="w-full flex justify-between">
          <button @click="$emit('close')"  class='bg-red-500 w-[45%] transition delay-75 duration-300 ease-in hover:bg-[#f48734] active:transition-none active:outline-2 active:outline-offset-2 active:outline-[#f48734] active:bg-[#ff760e] rounded-md py-[1vh] text-white font-semibold cursor-pointer' >
            Cancelar
          </button>
          <a @click="handleTrade"
              target="_blank"
              class='bg-green-800 text-center w-[45%] transition delay-75 duration-300 ease-in hover:bg-[#f48734] active:transition-none active:outline-2 active:outline-offset-2 active:outline-[#f48734] active:bg-[#ff760e] rounded-md py-[1vh] text-white font-semibold cursor-pointer'
              :href="`https://api.whatsapp.com/send/?phone=52${props.phone}&text=Hola+${props.userName},+estoy+interesado+en+${props.productName}&type=phone_number&app_absent=0`"
            >
            Iniciar intercambio
          </a>
      </div>
    </div>
  </div>
</template>
