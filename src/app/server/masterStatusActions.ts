'use server'

import type { StatusRequestType } from '@/types/apis/statusRequest'
import { fetchData } from '../api/fetchData'
import type { ResponseType } from '@/types/apis/response'

export const getData = async () => {
  const response = await fetchData('/v2/mngStatus', {}, 'GET')

  return response?.data
}

export const addData = async (data: StatusRequestType) => {
  const response = await fetchData('/v2/mngStatus/add', data, 'POST')

  return response
}

export const editData = async (data: StatusRequestType): Promise<ResponseType> => {
  const response = await fetchData('/v2/mngStatus/edit', data, 'POST')

  return response
}

export const deleteData = async (id: number) => {
  const response = await fetchData(`/v2/mngStatus/delete/${id}`, {}, 'GET')

  return response
}
