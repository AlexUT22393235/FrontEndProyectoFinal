import { defineStore } from 'pinia';
import type { IProductDetail } from '../interfaces/IProductDetail';
import { getProductByIdService, getUserByIdService } from '../services/productService';

export const useProductStore = defineStore('product', {
  state: () => ({
    product: null as IProductDetail | null,
    products: [] as IProductDetail[], // Aquí almacenas los productos de un usuario
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
    },

    // Acción para obtener todos los productos de un usuario
    async fetchAllProducts(userId: number) {
      try {
        const response = await getUserByIdService(userId); // Llamada a la nueva función de servicio

        if (response) {
          this.products = response.map((product: any) => ({
            idImagen: product.imagenes?.[0]?.idImagen || 0,
            nombre: product.nombre,
            descripcion: product.descripcion,
            fechaCreacion: product.fechaCreacion,
            urlImagen: product.imagenes?.[0]?.urlImagen || '/images/default.jpg',
            imagenes: product.imagenes || [],
            usuarioId: product.usuarioId,
          }));
        } else {
          console.error('No se encontraron productos para este usuario.');
          this.products = [];
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        this.products = [];
      }
    },
  },
});
