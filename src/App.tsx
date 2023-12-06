import { config } from '@config'
import { AnimatePresence } from 'framer-motion'
import {
  FC,
  HTMLAttributes,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { ToastContainer } from 'react-toastify'

import { AppNavbar, Loader } from '@/common'
import { useWeb3Context, ZkpContextProvider } from '@/contexts'
import { bus, BUS_EVENTS, ErrorHandler } from '@/helpers'
import { useNotification, useViewportSizes } from '@/hooks'

const App: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  useViewportSizes()

  const [isAppInitialized, setIsAppInitialized] = useState(false)

  const { showToast } = useNotification()
  const { provider, init: initWeb3 } = useWeb3Context()

  const init = useCallback(async () => {
    if (provider?.address) return

    try {
      await initWeb3()

      document.title = config.APP_NAME
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }

    setIsAppInitialized(true)
  }, [initWeb3, provider?.address])

  useEffect(() => {
    const showSuccessToast = (payload: unknown) => showToast('success', payload)
    const showWarningToast = (payload: unknown) => showToast('warning', payload)
    const showErrorToast = (payload: unknown) => showToast('error', payload)
    const showInfoToast = (payload: unknown) => showToast('info', payload)

    let mountingInit = async () => {
      bus.on(BUS_EVENTS.success, showSuccessToast)
      bus.on(BUS_EVENTS.warning, showWarningToast)
      bus.on(BUS_EVENTS.error, showErrorToast)
      bus.on(BUS_EVENTS.info, showInfoToast)

      await init()
    }

    mountingInit()

    return () => {
      bus.off(BUS_EVENTS.success, showSuccessToast)
      bus.off(BUS_EVENTS.warning, showWarningToast)
      bus.off(BUS_EVENTS.error, showErrorToast)
      bus.off(BUS_EVENTS.info, showInfoToast)

      mountingInit = async () => {
        /* empty */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id='app'>
      <Suspense fallback={<></>}>
        <AppNavbar />
        <AnimatePresence>
          <div className='app__main'>
            <AnimatePresence>
              <ZkpContextProvider>
                {isAppInitialized ? children : <Loader />}
              </ZkpContextProvider>
            </AnimatePresence>
          </div>
        </AnimatePresence>
      </Suspense>
      <ToastContainer newestOnTop={true} />
    </div>
  )
}

export default memo(App)
