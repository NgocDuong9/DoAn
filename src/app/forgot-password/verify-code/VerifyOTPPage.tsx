'use client'

import { Box, Text } from '@mantine/core'

import { Card } from '@/components/custom/card/card'
import VerifyOTPForm from './VerifyForm'

export default function VerifyOTPPage({
  phoneNumber,
  setOTP,
  handleNextTab
}: any) {
  return (
    <section className="h-[100vh] flex justify-center items-center">
      <Card className="mx-auto mt-24 w-[90%] py-10 md:min-w-[800px] px-8 rounded-[42px] bg-white bg-opacity-25 backdrop-blur-xl">
        <Box>
          <Text className="text-3xl text-center font-bold text-white">
            Xác thực tài khoản
          </Text>
          <Text className="text-center text-sm text-white">
            Vui lòng nhập mã xác thực để hệ thống xác thực tài khoản
          </Text>
        </Box>
        <Box className="flex flex-col gap-4">
          <VerifyOTPForm
            phoneNumber={phoneNumber}
            setOTP={setOTP}
            handleNextTab={handleNextTab}
          />
        </Box>
      </Card>
    </section>
  )
}
