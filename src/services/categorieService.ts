import { genericRequest } from '../utils/genericRequest'

const base_url = 'https://localhost:7140/api'

export const getCategoriesService = async () => {
  return await genericRequest(base_url + '/categoria', 'GET')
}
