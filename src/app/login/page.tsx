import LoginPage from './LoginPage'
import { createClient } from '@/libs/supabase/server'
import { redirect } from 'next/navigation'

export default async function Login({
  searchParams
}: {
  searchParams: { message: string }
}) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/')
  }

  return (
    <div>
      <LoginPage />
    </div>
  )
}
