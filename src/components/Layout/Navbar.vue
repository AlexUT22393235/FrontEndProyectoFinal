<script setup lang="ts">
// No necesitamos lógica adicional por ahora
</script>

<template>
  <div class="navbar">
    <nav class="nav-links">
      <RouterLink to="/landing">Inicio</RouterLink>
      <RouterLink to="/negotiating">Negociando</RouterLink>
      <RouterLink to="/search">Productos</RouterLink> <!-- Pendiente?  Actualmente envia a search-->
      <RouterLink to="/categories">Categorias</RouterLink> <!-- Pendiente? Actualmente envia a search-->

      <!-- Las paginas que actualmente envian a search pueden ser ajustadas al momento de consumir para solo agregar ternarios -->

      <RouterLink to="/about">Nosotros</RouterLink> <!-- Pendiente -->
      <RouterLink to="/login">Cerrar sesion </RouterLink> <!-- obvio no es funcional tios->
      <RouterLink to="/profile">
        <div class=" relative bg-amber-500 w-[4vh] h-[4vh] rounded-full">
          <img src="htps://ninguno.com.mx" />
        </div>
    </RouterLink> <!-- Pendiente -->
    </nav>
  </div>
</template>

<style scoped>
/* Estilos básicos (sin media queries) */
.navbar {
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.nav-links a:hover {
  color: #128c7e;
}
</style>
