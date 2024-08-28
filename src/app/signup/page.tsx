import { Box, Text } from '@mantine/core'

import { Card } from '@/components/custom/card/card'
import Link from 'next/link'
import { OAuthButtons } from '../login/oauthSignin'
import Signup from './Signup'
import { createClient } from '@/libs/supabase/server'
import { redirect } from 'next/navigation'

// import { Label } from "@/components/ui/label";

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
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <Card className="mx-auto min-w-[600px] py-10 px-8">
        <Box>
          <Text className="text-3xl text-center uppercase font-bold">
            Đăng ký tài khoản
          </Text>
        </Box>
        <Box className="flex flex-col gap-4">
          <Signup />
          <div className="border-t"></div>
          <label className="text-sm text-center">Hoặc tiếp tục với</label>
          <OAuthButtons />
          <div className="border-t"></div>
          <div className="text-center text-sm">
            Bạn đã có tài khoản?{' '}
            <Link href="#" className="text-[#F8664F]">
              Đăng nhập
            </Link>
          </div>
        </Box>
      </Card>
    </section>
  )
}
