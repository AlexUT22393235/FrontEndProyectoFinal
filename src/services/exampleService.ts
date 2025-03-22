import { genericRequest } from '../utils/genericRequest'

const base_url = 'http://localhost:8080'


export const exampleService = async (newItem: string) => {
  return await genericRequest(base_url + '/items', 'POST', newItem)
}
