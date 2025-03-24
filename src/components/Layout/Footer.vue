<template>
  <footer class="bg-[#FAF7EC] text-[#50683E] py-8 w-full border-t border-[#6b6565]">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left px-6">

      <!-- Sección del Logo -->
       <div class="flex flex-row gap-50 items-center md:items-start">
        <div class="flex flex-row md:items-start w-[30rem]  h-auto">
        <img src="@/assets/Images/logostrade.png" alt="Logo Strade" class="w-54 mb-4">
        <h1 class="text-xl font-bold pt-12">Strade, Intercambia, Reutiliza y Conecta</h1>
      </div>

      <!-- Sección de Enlaces -->
      <div class="flex flex-col gap-3 items-center md:items-start pt-9 pl-8">
        <h2 class="text-lg font-semibold">Enlaces</h2>
        <RouterLink to="/about" class="hover:text-[#2F4F2F] transition-colors">Nosotros</RouterLink>
        <RouterLink to="/contact" class="hover:text-[#2F4F2F] transition-colors">Contacto</RouterLink>
        <RouterLink to="/privacy" class="hover:text-[#2F4F2F] transition-colors">Privacidad</RouterLink>
      </div>

      <!-- Sección de Redes Sociales -->
      <div class="flex flex-col gap-4 items-center md:items-start pt-9">
        <h2 class="text-lg font-semibold">Síguenos</h2>
        <a href="https://facebook.com" target="_blank" class="flex items-center gap-2 hover:text-[#2F4F2F] transition-colors">
          <i class="fab fa-facebook text-xl"></i> Facebook
        </a>
        <a href="https://twitter.com" target="_blank" class="flex items-center gap-2 hover:text-[#2F4F2F] transition-colors">
          <i class="fab fa-twitter text-xl"></i> Twitter
        </a>
        <a href="https://instagram.com" target="_blank" class="flex items-center gap-2 hover:text-[#2F4F2F] transition-colors">
          <i class="fab fa-instagram text-xl"></i> Instagram
        </a>
      </div>
    </div>
       </div>


    <!-- Sección de Derechos de Autor -->
    <div class="text-center mt-8">
      <p class="text-sm">Strade © 2025. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  font-family: 'Inter', sans-serif;
}

footer a {
  transition: color 0.3s ease;
}

img {
  max-width: 300px;
}
</style>
