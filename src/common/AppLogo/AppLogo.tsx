import './styles.scss'

import { config } from '@config'
import { FC, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

const AppLogo: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <div className={`app-logo ${className}`} {...rest}>
      <img src='/branding/logo.svg' alt={config.APP_NAME} />
      <Link className='app-logo__link' to={''} />
    </div>
  )
}

export default AppLogo
