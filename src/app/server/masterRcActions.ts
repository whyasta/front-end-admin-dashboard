'use server'

import type { RcAddEdit } from '@/types/apis/rcRequest'
import { fetchData } from '../api/fetchData'
import type { ResponseType } from '@/types/apis/response'

export const getData = async () => {
  const response = await fetchData('/v2/mngRC', {}, 'GET')

  return response?.data
}

export const addData = async (data: RcAddEdit) => {
  const response = await fetchData('/v2/mngRC/add', data, 'POST')

  return response
}

export const editData = async (data: RcAddEdit): Promise<ResponseType> => {
  const response = await fetchData('/v2/mngRC/edit', data, 'POST')

  return response
}

export const deleteData = async (id: number) => {
  const response = await fetchData(`/v2/mngRC/delete/${id}`, {}, 'GET')

  return response
}
