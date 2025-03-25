import type { CreateCategoryDto } from '@/dtos/createCategoryDto'
import { genericRequest } from '../utils/genericRequest'
import type { UpdateCategoryDto } from '@/dtos/updateCategoryDto'

const base_url = 'https://localhost:7140/api'

export const getCategoriesService = async () => {
  return await genericRequest(base_url + '/categoria', 'GET')
}

export const getCategoryService = async (id:number) => {
  return await genericRequest(base_url + `/categoria/${id}`, 'GET')
}

export const deleteCategoryService = async (id:number) => {
  return await genericRequest(base_url + `/categoria/${id}`, 'DELETE')
}

export const createCategoryService = async (item:CreateCategoryDto) => {
  return await genericRequest(base_url + '/categoria/', 'POST', item)
}

export const updateCategoryService = async (item:UpdateCategoryDto) => {
  console.log(item)
  return await genericRequest(base_url + `/categoria/${item.idCategoria}`, 'PUT', item)
}
