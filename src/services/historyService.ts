import { genericRequest } from '../utils/genericRequest';
import type { IExchange, IExchangeOffer, IProductDetail } from '@/interfaces/IExchange';

const base_url = 'https://localhost:7140/api';

export const getExchangesByUserIdService = async (userId: number): Promise<IExchange[]> => {
    try {
      const response = await genericRequest(`${base_url}/Intercambio/solicitante/${userId}`, 'GET');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error en getExchangesByUserIdService:', error);
      return [];
    }
  };
  
  export const getOfferByUserIdService = async (userId: number): Promise<IExchangeOffer[]> => {
    try {
      const response = await genericRequest(`${base_url}/Intercambio/ofertante/${userId}`, 'GET');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error en getOfferByUserIdService:', error);
      return [];
    }
  };
  
  export const getProductDetailByIdService = async (productId: number): Promise<IProductDetail> => {
    try {
      return await genericRequest(`${base_url}/Producto/detail/${productId}`, 'GET');
    } catch (error) {
      console.error('Error en getProductDetailByIdService:', error);
      return {
        nombre: '',
        descripcion: '',
        imagenes: []
      };
    }
  };
