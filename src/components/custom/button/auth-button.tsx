'use client'
import { navigate } from '@/apis/auth'
import { useAuth } from '@/components/context/auth.context'
import { Fragment, cloneElement } from 'react'

const AuthButton = ({
  children,
  onClick,
  ...props
}: {
  children: HTMLDivElement | HTMLButtonElement | any
  onClick?: () => void
  [key: string]: any
}) => {
  const { userId } = useAuth()

  const handleClick = () => {
    if (!userId) {
      // window.location.replace('/login')
      navigate('/login')
    } else {
      onClick && onClick()
    }
  }

  return (
    <Fragment>
      {cloneElement(children, {
        onClick: handleClick,
        ...props
      })}
    </Fragment>
  )
}

export default AuthButton
