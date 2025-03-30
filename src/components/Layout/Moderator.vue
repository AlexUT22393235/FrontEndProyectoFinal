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
      <Navbar/>
      <main class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div class=" col-span-2 ">

          <router-view />

        </div>
      </main>
    </div>


  </div>
</template>

<script lang="ts" setup>
  import Navbar from './ModeratorNavbar.vue'
</script>
