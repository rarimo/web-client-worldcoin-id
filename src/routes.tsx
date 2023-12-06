import { lazy } from 'react'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

import App from '@/App'
import { Web3ProviderContextProvider } from '@/contexts'
import { RoutesPaths } from '@/enums'

export const AppRoutes = () => {
  const AuthProof = lazy(() => import('@/pages/AuthProof'))
  const AuthConfirmation = lazy(() => import('@/pages/AuthConfirmation'))
  const AuthSuccess = lazy(() => import('@/pages/AuthSuccess'))

  const router = createBrowserRouter([
    {
      element: (
        <Web3ProviderContextProvider>
          <App>
            <Outlet />
          </App>
        </Web3ProviderContextProvider>
      ),
      children: [
        {
          index: true,
          // path: RoutesPaths.authProof,
          element: <AuthProof />,
        },
        {
          path: RoutesPaths.authConfirmation,
          element: <AuthConfirmation />,
        },
        {
          path: RoutesPaths.authSuccess,
          element: <AuthSuccess />,
        },

        {
          path: '',
          element: <Navigate replace to={`/`} />,
        },
        {
          path: '/',
          element: <Navigate replace to={`/`} />,
        },
        {
          path: '*',
          element: <Navigate replace to={`/`} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
