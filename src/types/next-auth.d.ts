// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    data: object | any
    menu: VerticalMenuDataType[]
  }

  // export type { AuthOptions as NextAuthOptions } from '@core/types'
}
