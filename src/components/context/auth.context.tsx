'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { getUser, signout } from '@/apis/auth'

import { User } from '@supabase/supabase-js'
import { getUserId } from '@/apis/managecar'

interface AuthContextProps {
  // access_token: string;
  // refresh_token: string;
  user: User | null
  // dataUser: User | null;
  // setDataUser: (value: User) => void;
  // setUser: (value: User) => void;
  handleGetAuthInfo: () => void
  handleSignout: () => void
  loading: boolean
  phoneVerify: any
  setPhoneVerify?: any
  userId: string | null
  authId: string | null
  authUser: any
}

const AuthContext = createContext<AuthContextProps | null>(null)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [authId, setAuthId] = useState<string | null>(null)
  const [authUser, setAuthUser] = useState<any | null>(null)

  const [phoneVerify, setPhoneVerify] = useState()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserId(true)
      .then(res => {
        // @ts-ignore
        setUser(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleGetAuthInfo = async () => {
    try {
      // lay auth user
      const res = await getUser()

      console.log('xxxxxxxxxx', res);
      // @ts-ignore
      setAuthUser(res?.data?.user)

      // @ts-ignore
      setAuthId(res?.data?.user?.id)
      getUserId(true).then(res => {
        // @ts-ignore
        setUser(res)
      })
    } catch (error) {
      console.error('step:error', error)
    }
  }

  useEffect(() => {
    handleGetAuthInfo()
  }, [])

  const handleSignout = async () => {
    await signout()
    // handleSetUser(null);
    setAuthId(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        // setUser: handleSetUser,
        handleGetAuthInfo,
        handleSignout,
        loading,
        phoneVerify,
        setPhoneVerify,
        // setDataUser: handleSetDataUser,
        userId: user?.id ?? '',
        user,
        authId,
        authUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw Error('Not context auth')
  return context
}
