
import type { CreateUserDto } from '@/dtos/CreateUserDto'
import { genericRequest } from '../utils/genericRequest'
import type { UpdateUserDto } from '@/dtos/UpdateUserDto'
import type { banUserDto } from '@/dtos/banUserDto'


const base_url = 'https://localhost:7140/api'

export const getUsersService = async () => {
  return await genericRequest(base_url + '/usuario', 'GET')
}

export const getUserService = async (id:number) => {
  return await genericRequest(base_url + `/usuario/${id}`, 'GET')
}

export const deleteUserService = async (id:number) => {
  return await genericRequest(base_url + `/usuario/${id}`, 'DELETE')
}

export const createUserService = async (item:CreateUserDto) => {
  return await genericRequest(base_url + '/usuario/', 'POST', item)
}

export const updateUserService = async (item:UpdateUserDto) => {
  return await genericRequest(base_url + `/usuario/${item.idUsuario}`, 'PUT', item)
}

export const banUserService = async (item:banUserDto) => {
  return await genericRequest(base_url + '/usuario/ban-usuario', 'PATCH', item)
}
