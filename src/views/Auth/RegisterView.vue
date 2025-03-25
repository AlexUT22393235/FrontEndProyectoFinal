<script setup lang="ts">

</script>
<template >
    <container class="bg-[#50683E] w-full h-screen flex flex-row">

        <div class="flex justify-center items-center w-1/2 h-full bg-[#264026]">
            <div class="w-full h-[50rem] flex flex-col justify-center items-center">
        <img src="@/assets/Images/noTrash.jpeg" alt="Logo" class="w-[50rem] h-[50rem]" />
       </div>
            </div>
            <div class="main-container flex flex-col justify-center items-center w-1/2 h-[50rem]  bg-[#50683E]">
                <div class=" m-4 p-4">
                    <h1 class="text-3xl font-bold text-[#FAF7EC] text-center ">Registrate</h1>
                </div>

                <div class="bg-[#FAF7EC] w-[30rem] h-[30rem] flex flex-col justify-center items-center">

                    <input type="text" class="w-[20rem] h-[2rem] border-2 border-[#50683E] rounded-md mb-2" placeholder="Nombre">
                    <input type="text" class="w-[20rem] h-[2rem] border-2 border-[#50683E] rounded-md mb-2" placeholder="Apellido">
                  <input type="text" class="w-[20rem] h-[2rem] border-2 border-[#50683E] rounded-md mb-2" placeholder="Telefono">
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
<style scoped>
.main-container {

 background: url('@/assets/Images/loginBackground.png')  center center;
background-repeat: repeat;
}


</style>
