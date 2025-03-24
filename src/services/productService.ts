import { genericRequest } from '../utils/genericRequest'

const base_url = 'https://localhost:7140/api' // --- Aqui estuvo el skill issue

export const getProductsService = async () => {
  return await genericRequest(base_url + '/producto', 'GET')
}
