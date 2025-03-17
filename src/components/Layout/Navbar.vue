<script setup lang="ts">
// No necesitamos lógica adicional por ahora
</script>

<template>
  <div class="navbar">
    <nav class="nav-links">
      <RouterLink to="/product">Productos</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/landing">Landing</RouterLink>
      <RouterLink to="/login">Prueba Login</RouterLink>
      <RouterLink to="/register">Prueba register</RouterLink>
      <RouterLink to="/estarutanoexisteeeeloooll">Prueba error 404</RouterLink>
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