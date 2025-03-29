<script setup lang="ts">

  const emit = defineEmits(['close', 'act']);

  const props = defineProps<{
      accion: string
      nombre: string
      tipo: string
    }>();

</script>
<template>
  <div class="w-[100vw] h-[100vh] absolute bg-black/40 backdrop-blur-xs flex justify-center items-center">
    <div class="bg-white w-[40vw] h-[35vh] rounded-lg shadow-lg flex flex-col p-[5vh] flex-wrap gap-y-[3%] px-[3vw] justify-around relative">
      <p class='font-semibold text-xl w-full text-center  text-slate-700'>¿Estas seguro?</p>
      <button @click="emit('close')" type='button' class='text-red-500 font-bold absolute top-[1vh] right-[1vw] cursor-pointer w-[1vw] h-[1vw]'>X</button>
        <div class='flex flex-wrap flex-col text-xl justify-between gap-[2vh]'>
          <p class="text-green-900 w-full text-center">¿Estás seguro que deseas <span class="text-red-600">{{ props.accion }}</span> a el {{ props.tipo }} <span class="text-green-700">{{ props.nombre }}</span></p>
        </div>
        <div class="w-full flex justify-between">
          <button @click="$emit('close')"  class='bg-red-500 w-[45%] transition delay-75 duration-300 ease-in hover:bg-[#f48734] active:transition-none active:outline-2 active:outline-offset-2 active:outline-[#f48734] active:bg-[#ff760e] rounded-md py-[1vh] text-white font-semibold cursor-pointer' >
            Cancelar
          </button>
          <button @click="emit('act')"  class='bg-green-700 w-[45%] transition delay-75 duration-300 ease-in hover:bg-[#f48734] active:transition-none active:outline-2 active:outline-offset-2 active:outline-[#f48734] active:bg-[#ff760e] rounded-md py-[1vh] text-white font-semibold cursor-pointer' >
            Aceptar
          </button>
      </div>
    </div>
  </div>
</template>
