// stores/productStore.ts
import { defineStore } from 'pinia';
import type { IProductDetail } from '../interfaces/IProductDetail';
import { getProductByIdService } from '../services/productService';

export const useProductStore = defineStore('product', {
  state: () => ({
    product: null as IProductDetail | null,
  }),
  actions: {
        async fetchProductDetails(productId: number) {
      try {
        const response = await getProductByIdService(productId);

        if (response) {
          this.product = {
            idImagen: response.imagenes?.[0]?.idImagen || 0,
            nombre: response.nombre,
            descripcion: response.descripcion,
            fechaCreacion: response.fechaCreacion,
            urlImagen: response.imagenes?.[0]?.urlImagen || '/images/default.jpg',
            imagenes: response.imagenes || [],
            usuarioId: response.usuarioId,
          } as IProductDetail; 
        } else {
          console.error('Producto no encontrado.');
          this.product = null;
        }
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        this.product = null;
      }
    }
    },

});
