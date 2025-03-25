import { genericRequest } from '../utils/genericRequest'
import type { IProductCreate } from '../interfaces/IProductCreate';

const base_url = 'https://localhost:7140/api' // --- Aqui estuvo el skill issue

// Obtener productos. 22393139 FGT 
export const getProductsService = async () => {
  return await genericRequest(base_url + '/producto', 'GET')
};

// Obtener producto por ID. 22393139 FGT
export const getProductByIdService = async (id: number) => {
  return await genericRequest(`${base_url}/producto/detail/${id}`, 'GET');
};

export const deleteProductService = async (id:number) => {
  return await genericRequest(base_url + `/producto/${id}`, 'DELETE')
}

// Crear producto completo con imágenes. 22393139 FGT
export const postProductService = async (formData: FormData) => {
  return await genericRequest(`${base_url}/Producto/completo-con-imagenes`, 'POST', formData, {
    'Content-Type': 'multipart/form-data',
  });
};


