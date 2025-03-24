<template>
  <div class="flex h-screen bg-[#FAF7EC]">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#50683E] text-white flex flex-col">
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

    </aside> 


    <div class="flex-1 flex flex-col">
      <header class=" shadow-md p-6 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-800">{{ activeMenu.name }}</h1>
      </header>


      <main class="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-[#D4E0CD] p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Nuevos Usuarios</h2>
          <div ref="newUsersChart" class="w-full h-64"></div>
        </div>

        <div class="bg-[#D4E0CD] p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Productos Reportados</h2>
          <div ref="reportedProductsChart" class="w-full h-64"></div>
        </div>

        <div class="bg-[#D4E0CD] p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Usuarios Reportados</h2>
          <div ref="reportedUsersChart" class="w-full h-64"></div>
        </div>

        <div class="bg-[#D4E0CD] p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Errores del Sistema</h2>
          <div ref="systemErrorsChart" class="w-full h-64"></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

// Menú lateral
const menuItems = ref([
  { name: "Dashboard", component: "dashboard" },
  { name: "Usuarios", component: "users" },
  { name: "Productos", component: "products" },
  { name: "Reportes", component: "reports" }
]);
const activeMenu = ref(menuItems.value[0]);
const setActive = (index) => activeMenu.value = menuItems.value[index];
const logout = () => alert("Sesión cerrada");


const newUsersChart = ref(null);
const reportedProductsChart = ref(null);
const reportedUsersChart = ref(null);
const systemErrorsChart = ref(null);

onMounted(() => {

  const chart1 = echarts.init(newUsersChart.value);
  chart1.setOption({
    title: { text: "Nuevos Usuarios", left: "center" },
    xAxis: { type: "category", data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"] },
    yAxis: { type: "value" },
    series: [{
      name: "Usuarios",
      type: "line",
      data: [20, 45, 60, 75, 90, 120],
      smooth: true,
      color: "#34D399"
    }]
  });


  const chart2 = echarts.init(reportedProductsChart.value);
  chart2.setOption({
    title: { text: "Productos Reportados", left: "center" },
    xAxis: { type: "category", data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"] },
    yAxis: { type: "value" },
    series: [{
      name: "Reportes",
      type: "bar",
      data: [5, 8, 4, 10, 12, 6],
      color: "#10B981"
    }]
  });

  const chart3 = echarts.init(reportedUsersChart.value);
  chart3.setOption({
    title: { text: "Usuarios Reportados", left: "center" },
    series: [{
      type: "pie",
      radius: ["50%", "70%"],
      label: { show: false },
      data: [
        { value: 30, name: "Advertencia", itemStyle: { color: "#FBBF24" } },
        { value: 15, name: "Baneados", itemStyle: { color: "#EF4444" } },
        { value: 10, name: "Investigación", itemStyle: { color: "#3B82F6" } }
      ]
    }]
  });


  const chart4 = echarts.init(systemErrorsChart.value);
  chart4.setOption({
    title: { text: "Errores del Sistema", left: "center" },
    series: [{
      type: "pie",
      data: [
        { value: 3, name: "Errores críticos", itemStyle: { color: "#DC2626" } },
        { value: 7, name: "Errores leves", itemStyle: { color: "#FBBF24" } },
        { value: 15, name: "Alertas", itemStyle: { color: "#34D399" } }
      ]
    }]
  });


  window.addEventListener("resize", () => {
    chart1.resize();
    chart2.resize();
    chart3.resize();
    chart4.resize();
  });
});
</script>
