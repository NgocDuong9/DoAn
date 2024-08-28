import GarageDetail from './GarageDetail'
import HeaderBar from '@/components/header/header'
import { Suspense } from 'react'
import { createClient } from '@/libs/supabase/server'
import { redirect } from 'next/navigation'

async function Product({ params }: any) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <Suspense>
      <div className="flex-col w-[100vw] h-[100vh] justify-center ">
        <HeaderBar />
        <div className="h-full">
          <GarageDetail params={{ ...params, user_id: user?.id }} />
        </div>
      </div>
    </Suspense>
  )
}

export default Product
