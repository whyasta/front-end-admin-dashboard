// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

import { config, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab, fas, far)
config.autoAddCss = false

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

import '@/libs/fontwaesome'

export const metadata = {
  title: 'Finpay - Admin Dashboard',
  description:
    'Finpay - Admin Dashboard'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col font-kiro'>{children}</body>
    </html>
  )
}

export default RootLayout
