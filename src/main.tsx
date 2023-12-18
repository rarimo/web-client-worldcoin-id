import '@/styles/index.scss'
import '@/localization'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppRoutes } from '@/routes'

const root = createRoot(document.getElementById('root') as Element)

if (import.meta.env.MODE === 'development') {
  root.render(<AppRoutes />)
} else {
  root.render(
    <StrictMode>
      <AppRoutes />
    </StrictMode>,
  )
}
