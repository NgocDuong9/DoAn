import { Box } from '@mantine/core'
import { Card } from '@/components/custom/card/card'
import UpdatePasswordForm from './UpdatePasswordForm'

export default function UpdatePassword({ OTP, phoneNumber }: any) {
  return (
    <section className="h-[100vh] flex justify-center items-center">
      <Card className="mx-auto mt-24 w-[90%] py-10 md:min-w-[800px] px-8 rounded-[42px] bg-white bg-opacity-25 backdrop-blur-xl">
        <UpdatePasswordForm OTP={OTP} phoneNumber={phoneNumber} />
      </Card>
    </section>
  )
}
