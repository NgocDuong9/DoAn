'use client'

import { Box, Text } from '@mantine/core'

import { Card } from '@/components/custom/card/card'
import ForgotPasswordForm from './ForgotPassword'

export default function ConfirmEmail({ handleNextTab, setPhoneNumber }: any) {
  return (
    <section className="h-[100vh] flex justify-center items-center">
      <Card
        // className="mx-auto min-w-[600px] py-10 px-8"
        className="mx-auto mt-24 w-[90%] py-10 md:min-w-[800px] px-8 rounded-[42px] bg-white bg-opacity-25 backdrop-blur-xl"
      >
        <Box>
          <Text className="text-3xl text-center font-bold text-white">
            Xác thực tài khoản
          </Text>
          <Text className="text-center text-sm text-white">
            Vui lòng điền email đăng ký tài khoản để hệ thống xác thực tài khoản
          </Text>
        </Box>
        <Box className="flex flex-col gap-4">
          <ForgotPasswordForm
            handleNextTab={handleNextTab}
            setPhoneNumber={setPhoneNumber}
          />
        </Box>
      </Card>
    </section>
  )
}
