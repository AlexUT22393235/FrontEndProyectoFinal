import { defineStore } from 'pinia';
import type { ICategory } from '../interfaces/ICategory'; 
import { getCategoriesService } from '../services/categorieService'; 

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as ICategory[],
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await getCategoriesService();
        if (response) {
          this.categories = response.map((category: any) => ({
            idCategoria: category.idCategoria,
            nombre: category.nombre,
            imagenCategoria: category.imagenCategoria,
          })) as ICategory[];
        } else {
          console.error('No se encontraron categorías.');
          this.categories = [];
        }
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        this.categories = [];
      }
    },
  },
});