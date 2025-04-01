// src/stores/productUpdateStore.ts
import { defineStore } from 'pinia';
import { updateProductPartialService, createProductUpdateFormData } from '@/services/ProductUpdateService'
import type { ProductPatchDTO, UpdatedProductResponse, ProductUpdateState } from '@/interfaces/productInterfaces';

export const useProductUpdateStore = defineStore('productUpdate', {
  state: (): ProductUpdateState => ({
    updatedProduct: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async updateProductPartial(id: number, productData: ProductPatchDTO) {
      this.loading = true;
      this.error = null;
      
      try {
        // Convertir el DTO a FormData
        const formData = createProductUpdateFormData(productData);
        
        // Llamar al servicio
        const response = await updateProductPartialService(id, formData);
        
        // Actualizar el estado
        this.updatedProduct = {
          idProducto: productData.IdProducto,
          nombre: productData.Nombre || '',
          descripcion: productData.Descripcion || '',
          intercambio: productData.Intercambio || false,
          categoriasIds: productData.CategoriasIds,
          imagenes: [] 
        };
        
        return this.updatedProduct;
      } catch (error: any) {
        this.error = error.message || 'Error al actualizar el producto';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    clearUpdateState() {
      this.updatedProduct = null;
      this.error = null;
    }
  },
  
  getters: {
    isUpdated: (state) => !!state.updatedProduct,
    getUpdatedProduct: (state) => state.updatedProduct,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
});