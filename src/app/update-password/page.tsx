import { Card } from '@/components/custom/card/card'
import UpdatePasswordForm from '@/views/update-password/UpdatePasswordForm'
import Link from 'next/link'
import { Suspense } from 'react'
// import UpdatePasswordForm from '../forgot-password/update-password/UpdatePasswordForm'

export default function UpdatePassword({ OTP, phoneNumber }: any) {
  return (
    <Suspense>
      <div
        className="h-[100vh] flex flex-col justify-center items-center overflow-y-auto"
        style={{
          backgroundImage: 'url(/logo/login_bg.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="fixed flex md:flex-row flex-row items-center top-0 md:px-10 pl-5 w-full mt-2">
          <Link href="/">
            <img
              src="/logo/applogo.png"
              className="relative md:absolute md:w-[120px] md:top-0 w-[100px] md:block"
            />
          </Link>
          <div className=" md:text-4xl text- font-black text-white md:py-6 py-2 mx-auto  md:block">
            TRỢ LÝ Ô TÔ luôn bên bạn!
          </div>
        </div>
        <section className="h-[100vh] flex justify-center items-center">
          <Card className="mx-auto w-full mt-24 py-10 md:min-w-[800px] px-8 rounded-[42px] bg-white bg-opacity-25 backdrop-blur-xl">
            <UpdatePasswordForm />
          </Card>
        </section>
      </div>
    </Suspense>
  )
}
