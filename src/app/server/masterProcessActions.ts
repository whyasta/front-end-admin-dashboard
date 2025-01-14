'use server'

import type { ProcessRequestType } from '@/types/apis/processRequest'
import { fetchData } from '../api/fetchData'
import type { ResponseType } from '@/types/apis/response'

export const getData = async () => {
  const response = await fetchData('/v2/mngProcess', {}, 'GET')

  return response?.data
}

export const addData = async (data: ProcessRequestType) => {
  const response = await fetchData('/v2/mngProcess/add', data, 'POST')

  return response
}

export const editData = async (data: ProcessRequestType): Promise<ResponseType> => {
  const response = await fetchData('/v2/mngProcess/edit', data, 'POST')

  return response
}

export const deleteData = async (id: number) => {
  const response = await fetchData(`/v2/mngProcess/delete/${id}`, {}, 'GET')

  return response
}
