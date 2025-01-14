import { v4 } from 'uuid'

import logger from '@/libs/logger'

export async function fetchData(uri: string, params = {}, method: string = 'POST') {
  try {
    const url = process.env.CORE_API_DASHBOARD_URL + uri
    const traceId = v4()

    logger.info('outcoming request', { traceId, method, url, params })

    let request = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    } as any

    if (method !== 'GET') {
      request.body = JSON.stringify(params)
    }

    const response = await fetch(url, request)
      .then(res => {
        return res.json()
      })
      .then(data => {
        // console.log('result fetch data', data)

        return data
      })
      .catch(error => {
        // console.log(error)
        logger.error(`Failed fetchData | ${error} `)

        return { error: true, message: error.message }
      })

    if (response?.rc === '00') {
      logger.info('incoming response', { traceId, response })
    } else {
      logger.error('incoming response', { traceId, response })
    }

    //wait 5s before return response
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return response
  } catch (error) {
    logger.error(`Error fetchData | ${error} `)

    return false
  }
}
