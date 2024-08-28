'use client'

import { useEffect } from 'react'
import LandingPageHeader from './landingpage-header'
import { useAuth } from '../context/auth.context'
import { newUserSignInGoogle } from '@/apis/client/auth'
import { redirect } from 'next/navigation'

interface Props {
  type?: 'landing-page' | 'app'
}

function HeaderBar({ type = 'app' }: Props) {
  const { authUser, handleGetAuthInfo } = useAuth()

  useEffect(() => {
    if (!authUser) return
    if (authUser?.app_metadata.providers.includes('google')) {
      newUserSignInGoogle().then(res => {
        if (!res?.error) {
          handleGetAuthInfo()
        }
      })
    }
  }, [authUser?.id])

  return <LandingPageHeader type={type} />
}

export default HeaderBar
