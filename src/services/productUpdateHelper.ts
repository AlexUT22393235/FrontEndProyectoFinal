import type { ProductPatchDTO } from "@/dtos/ProductPatchDTO";

export const createProductUpdateFormData = (dto: ProductPatchDTO): FormData => {
    const formData = new FormData();
    
    formData.append('IdProducto', dto.IdProducto.toString());
    
    if (dto.Nombre !== undefined) formData.append('Nombre', dto.Nombre);
    if (dto.Descripcion !== undefined) formData.append('Descripcion', dto.Descripcion);
    if (dto.Intercambio !== undefined) formData.append('Intercambio', dto.Intercambio.toString());
    
    dto.CategoriasIds.forEach(id => {
      formData.append('CategoriasIds', id.toString());
    });
    
    if (dto.Imagenes && dto.Imagenes.length > 0) {
      dto.Imagenes.forEach(file => {
        formData.append('Imagenes', file);
      });
    }
    
    return formData;
  };