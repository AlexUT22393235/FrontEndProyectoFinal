<script setup lang="ts">

</script>
<template >
    <container class="w-full h-full flex flex-row">

        <div class="flex justify-center items-center w-1/2 h-[50rem] bg-[#3d491a]">
            1/2
            </div>
            <div class="flex flex-col justify-center items-center w-1/2 h-[50rem]  bg-[#50683E]">
                <div class=" m-4 p-4">
                    <h1 class="text-3xl font-bold text-[#FAF7EC] text-center ">Registrate</h1>
                </div>
              
                <div class="bg-[#FAF7EC] w-[30rem] h-[30rem] flex flex-col justify-center items-center">
                    <input type="text" class="w-[20rem] h-[2rem] border-2 border-[#50683E] rounded-md mb-2" placeholder="Email">
                    <input type="password" class="w-[20rem] h-[2rem] border-2 border-[#50683E] rounded-md mb-2" placeholder="Password">
                    <button class="w-[20rem] h-[2rem] bg-[#3d491a] text-[#FAF7EC] rounded-md">Registrate</button>
                    <div class="flex flex-row gap-2 mt-2">
                        <p>Ya tienes una cuenta?</p>
                        <router-link to="/login" class="text-[#3d491a]">Ingresa</router-link>
                    </div>  

                </div>
            </div>
        
     
    </container>
      
</template>
<style>
</style>