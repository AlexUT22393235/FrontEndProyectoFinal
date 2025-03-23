<template>
  <div class="w-full min-h-screen bg-[#FAF7EC] flex flex-col items-center justify-center p-8">

    <div class="max-w-3xl text-center pt-39">
      <h1 class="text-4xl font-bold text-[#50683E] mb-4">Sobre Nosotros</h1>

      <p class="text-lg text-[#555] leading-relaxed">
        En <span class="font-semibold text-[#27AE60]">Strade</span>, creemos en una economía colaborativa donde las personas pueden
        <span class="font-semibold">intercambiar productos</span> sin la necesidad de dinero. Nuestro objetivo es
        fomentar el consumo sostenible, reducir el desperdicio y crear una comunidad donde todos puedan encontrar
        lo que necesitan sin gastar más.
      </p>
      <p class="text-lg text-[#555] leading-relaxed mt-4">
        A través de nuestra plataforma, puedes publicar artículos que ya no necesitas y encontrar aquellos que
        te interesan. ¡Únete a Strade y empieza a intercambiar de manera fácil, justa y sin dinero de por medio!
      </p>
    </div>


    <div class="max-w-5xl mt-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h2 class="text-2xl font-bold text-[#2C3E50] mb-2">Nuestra Misión</h2>
          <p class="text-lg text-[#555] leading-relaxed">
            Promover el consumo sostenible y reducir el desperdicio a través de una plataforma que conecta a las personas para intercambiar productos de manera justa y sin dinero.
          </p>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-[#2C3E50] mb-2">Nuestra Visión</h2>
          <p class="text-lg text-[#555] leading-relaxed">
            Ser la plataforma líder en intercambio de productos, fomentando una economía colaborativa y sostenible en todo el mundo.
          </p>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-[#2C3E50] mb-2">Nuestros Valores</h2>
          <p class="text-lg text-[#555] leading-relaxed">
            Sostenibilidad, confianza, colaboración y equidad son los pilares que guían cada paso que damos en Strade.
          </p>
        </div>
      </div>
    </div>


    <div class="max-w-5xl mt-12">
      <h2 class="text-3xl font-bold text-[#2C3E50] mb-6 text-center">Nuestro Equipo</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="flex flex-col items-center">
          <!-- <img src="@/assets/images/team1.jpg" alt="Miembro del equipo" class="w-32 h-32 rounded-full mb-4"> -->
          <h3 class="text-xl font-bold text-[#2C3E50]">Kenia Escamilla</h3>
          <p class="text-[#555]">CEO y Fundador</p>
        </div>
        <div class="flex flex-col items-center">
          <!-- <img src="@/assets/images/team2.jpg" alt="Miembro del equipo" class="w-32 h-32 rounded-full mb-4"> -->
          <h3 class="text-xl font-bold text-[#2C3E50]">Fernando Gomez</h3>
          <p class="text-[#555]">Directora de Marketing</p>
        </div>
        <div class="flex flex-col items-center">
          <!-- <img src="@/assets/images/team3.jpg" alt="Miembro del equipo" class="w-32 h-32 rounded-full mb-4"> -->
          <h3 class="text-xl font-bold text-[#2C3E50]">Octavio Cruz</h3>
          <p class="text-[#555]">CTO</p>
        </div>
      </div>
    </div>


    <div class="max-w-3xl text-center mt-12">
      <h2 class="text-3xl font-bold text-[#2C3E50] mb-4">Únete a Nosotros</h2>
      <p class="text-lg text-[#555] leading-relaxed">
        Sé parte de nuestra comunidad y ayuda a construir un futuro más sostenible. ¡Empieza a intercambiar hoy mismo!
      </p>
      <router-link to="/register" class="mt-6 inline-block bg-[#27AE60] text-white py-2 px-6 rounded-lg hover:bg-[#2ecc71]">
        Regístrate Ahora
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
