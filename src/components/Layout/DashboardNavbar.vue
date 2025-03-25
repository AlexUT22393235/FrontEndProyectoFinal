<template>
  <header class="bg-[#FAF7EC] shadow-md p-6 flex justify-between items-center">
    <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
    <div class="flex gap-[2vw]">
      <RouterLink to="/admin/users">Usuarios</RouterLink>
      <RouterLink to="/admin/categories">Categorias</RouterLink>
      <RouterLink to="/admin/products">Productos</RouterLink>
    </div>
  </header>
</template>
