import type { IProduct } from '@/interfaces/IProduct';
import { genericRequest } from '../utils/genericRequest'
import type { postTrade } from '@/dtos/postTradeDto';

const base_url = 'https://localhost:7140/api' // --- Aqui estuvo el skill issue

// Obtener productos  22393264 - Yo lo cree
export const getProductsService = async () => {
  return await genericRequest(base_url + '/producto', 'GET')
};

// Obtener producto por ID. 22393139 FGT
export const getProductByIdService = async (id: number) => {
  return await genericRequest(`${base_url}/producto/detail/${id}`, 'GET');
};

// Obtener usuario por ID. 22393139 FGT
export const getUserByIdService = async (id: number) => {
  const response = await genericRequest(`${base_url}/Usuario/${id}`, 'GET');
  if (!response.data) throw new Error('Usuario no encontrado');
  return response;
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

export const postTradeService = async (item:postTrade) => {
  return await genericRequest(base_url + '/intercambio/', 'POST', item)
}


export const hideProductService = async (item: any) => {
  return await genericRequest('https://localhost:7140/api/Producto/fecha-creacion-null', 'PUT', item)
};


