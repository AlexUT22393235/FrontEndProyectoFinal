import { genericRequest } from '../utils/genericRequest';
import type { IExchange, IExchangeOffer, IProductDetail } from '@/interfaces/IExchange';

const base_url = 'https://localhost:7140/api';

// Obtener intercambios por ID de usuario 22393139 FGT 26/03/2025
export const getExchangesByUserIdService = async (userId: number): Promise<IExchange[]> => {
  return await genericRequest(`${base_url}/Intercambio/${userId}`, 'GET');
};

// Obtener oferta por ID de ofertante 22393139 FGT 26/03/2025
export const getOfferByUserIdService = async (userId: number): Promise<IExchangeOffer[]> => {
  return await genericRequest(`${base_url}/Intercambio/ofertante/${userId}`, 'GET');
};

// Obtener detalle del producto por ID 22393139 FGT 26/03/2025
export const getProductDetailByIdService = async (productId: number): Promise<IProductDetail> => {
  return await genericRequest(`${base_url}/Producto/detail/${productId}`, 'GET');
};
