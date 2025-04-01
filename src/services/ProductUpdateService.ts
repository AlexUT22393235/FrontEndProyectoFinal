import { genericRequest } from '../utils/genericRequest';
import type { ProductPatchDTO } from '@/dtos/ProductPatchDTO';

const base_url = 'https://localhost:7140/api';
export const updateProductPartialService = async (id: number, productData: FormData) => {
    return await genericRequest(`${base_url}/Producto/producto-update-parcial/${id}`, 'PATCH', productData, {
      'Content-Type': 'multipart/form-data'
    });
  };
  
  export const createProductUpdateFormData = (dto: ProductPatchDTO): FormData => {
    const formData = new FormData();
    
    formData.append('IdProducto', dto.IdProducto.toString());
    if (dto.Nombre) formData.append('Nombre', dto.Nombre);
    if (dto.Descripcion) formData.append('Descripcion', dto.Descripcion);
    if (dto.Intercambio !== undefined) formData.append('Intercambio', dto.Intercambio.toString());
    
    dto.CategoriasIds.forEach(id => {
      formData.append('CategoriasIds', id.toString());
    });
    
    if (dto.Imagenes) {
      dto.Imagenes.forEach((file, index) => {
        formData.append(`Imagenes`, file);
      });
    }
    
    return formData;
  };