import { genericRequest } from '../utils/genericRequest'

const base_url = 'https://localhost:7140/api'


export const exampleService = async (newItem: string) => {
  return await genericRequest(base_url + '/items', 'POST', newItem)
}
