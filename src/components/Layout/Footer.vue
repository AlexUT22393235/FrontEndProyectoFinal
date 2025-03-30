<template>
  <footer class="bg-[#FAF7EC] text-[#50683E] py-8 w-full border-t border-[#6b6565]">
    <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 md:px-8">
      <!-- Sección del Logo -->
      <div class="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start gap-4">
        <div class="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start gap-4 w-full">
          <img src="@/assets/Images/logostrade.png" alt="Logo Strade" class="w-32 sm:w-40 md:w-48 h-auto">
          <h1 class="text-lg sm:text-xl font-bold text-center sm:text-left">Strade, Intercambia, Reutiliza y Conecta</h1>
        </div>
      </div>

      <!-- Sección de Enlaces -->
      <div class="flex flex-col gap-3 items-center sm:items-start">
        <h2 class="text-lg font-semibold">Enlaces</h2>
        <RouterLink to="/about" class="hover:text-[#2F4F2F] transition-colors">Nosotros</RouterLink>
        <RouterLink to="/contact" class="hover:text-[#2F4F2F] transition-colors">Contacto</RouterLink>
        <RouterLink to="/privacy" class="hover:text-[#2F4F2F] transition-colors">Privacidad</RouterLink>
      </div>

      <!-- Sección de Redes Sociales -->
      <div class="flex flex-col gap-4 items-center sm:items-start">
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

      <!-- Sección de Reporte -->
      <div class="flex flex-col items-center sm:items-start">
        <h2 class="text-lg font-semibold">¿Tienes algún problema?</h2>
        <div class="flex flex-col sm:flex-row lg:flex-col gap-2 w-full mt-2">
          <input
            class="bg-white rounded-md w-full sm:w-48 lg:w-full h-10 px-3 text-sm"
            placeholder="Describe tu problema...">
          <button class="bg-[#50683E] text-white px-4 py-1 rounded-md hover:bg-[#3A4D3A] transition-colors text-sm">
            Enviar
          </button>
        </div>
      </div>
    </div>

    <!-- Sección de Derechos de Autor -->
    <div class="text-center mt-8 pt-4 border-t border-[#6b6565]">
      <p class="text-sm">Strade © 2025. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>