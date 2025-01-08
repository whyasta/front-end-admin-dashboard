// Next Imports
import { NextResponse } from 'next/server'

import { fetchData } from '../fetchData'

export async function POST(req: Request) {
  // Vars
  const { email, password } = await req.json()

  // Response
  // let response

  const user = await fetchData('/v2/users/login', { username: email, password })

  if (user && user['rc'] === '00') {
    return NextResponse.json(user)
  } else {
    // We return 401 status code and error message if user is not found
    return NextResponse.json(
      {
        // We create object here to separate each error message for each field in case of multiple errors
        message: [user['rc_desc'] ?? user['message']]
      },
      {
        status: 500,
        statusText: 'Server'
      }
    )
  }
}
