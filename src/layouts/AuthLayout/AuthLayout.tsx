import { AnimatePresence } from 'framer-motion'
import { FC, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

const AuthLayout: FC<Props> = ({ children }) => {
  return <AnimatePresence>{children}</AnimatePresence>
}

export default AuthLayout
