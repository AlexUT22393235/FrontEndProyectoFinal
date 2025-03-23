<template>
  <footer class="bg-[#FAF7EC] text-[#50683E] py-4 w-full h-auto">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">

      <div class=" flex flex-col text-lg font-bold">


        <div class="flex flex-col gap-4 mt-2 md:mt-0">
        <RouterLink to="/about" class="hover:underline">Nosotros</RouterLink>
        <RouterLink to="/contact" class="hover:underline">Contacto</RouterLink>
        <RouterLink to="/privacy" class="hover:underline">Privacidad</RouterLink>
      </div>


      <div class="flex flex-col gap-4 mt-2 md:mt-0">
        <a href="https://facebook.com" target="_blank" class="hover:text-gray-300">
          <i class="fab fa-facebook"></i> Facebook
        </a>
        <a href="https://twitter.com" target="_blank" class="hover:text-gray-300">
          <i class="fab fa-twitter"></i> Twitter
        </a>
        <a href="https://instagram.com" target="_blank" class="hover:text-gray-300">
          <i class="fab fa-instagram"></i> Instagram
        </a>
      </div>
      Strade © 2025

      </div>

    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid #6b6565;
}
</style>
