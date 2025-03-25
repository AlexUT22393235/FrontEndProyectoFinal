import { genericRequest } from '../utils/genericRequest'
import type { IProduct } from '@/interfaces/IProduct';

const base_url = 'https://localhost:7140/api' // --- Aqui estuvo el skill issue

export const getProductsService = async () => {
  return await genericRequest(base_url + '/producto', 'GET')
};


export const postProductService = async (data: any) => {
  return await genericRequest(base_url + '/producto', 'POST', data);
};

export const getProductByIdService = async (id: number) => {
  return await genericRequest(`${base_url}/producto/detail/${id}`, 'GET');
};