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
      const response = await getProductByIdService(productId);

      if (response) {
        this.product = {
          idImagen: response.imagenes[0]?.idImagen || 0,
          nombre: response.nombre,
          descripcion: response.descripcion,
          urlImagen: response.imagenes[0]?.urlImagen || '/images/default.jpg',
          imagenes: response.imagenes || [], // Mapeamos para el carrusel
          usuarioId: response.usuarioId,
        };
      } else {
        console.error('Producto no encontrado.');
        this.product = null;
      }
    },
  },
});
