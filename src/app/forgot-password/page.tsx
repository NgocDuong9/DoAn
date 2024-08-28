'use client'

import { Box, Button, Card, Image, Tabs, Text } from '@mantine/core'

import ConfirmEmail from './confirm-pw/ConfirmEmail'
import UpdatePassword from './update-password/UpdatePassword'
import VerifyOTPPage from './verify-code/VerifyOTPPage'
import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/custom/input/input'
import { validateEmail } from '@/utils/validation'
import { sendOTPPhoneNew } from '@/apis/client/auth'
import ModalMessage from '@/components/custom/modal/modal-message'
import { useRouter } from 'next/navigation'

const tabs = ['confirm-email', 'confirm-code', 'update-password']
export default function ForgotPassword() {
  // const [phoneNumber, setPhoneNumber] = useState('')
  // const [OTP, setOTP] = useState('')
  // const handleNextTab = () => {
  //   setActiveTab(tabs[tabs.indexOf(activeTab) + 1])
  // }
  // const [activeTab, setActiveTab] = useState<string>(tabs[0])
  const router = useRouter()
  const [confirmSuccess, setConfirmSuccess] = useState(false)

  const [value, setValue] = useState<any>({
    email: ''
  })

  const [errors, setErrors] = useState<any>({ email: '' })

  const [message, setMessage] = useState('')
  const [errorVerify, setErrorVerify] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOnChange = (e: any) => {
    const { name, value: valueTarget } = e.target
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
    let errorMessage = ''
    if (name === 'email') {
      errorMessage = validateEmail(valueTarget)
    }
    setErrors({ ...errors, [name]: errorMessage })
  }
  const handleOTP = async () => {
    if (!errors.email) {
      setLoading(true)

      const result = await sendOTPPhoneNew({
        email: value.email,
        local: window.origin
      })

      if (result?.data) {
        setLoading(false)
        setConfirmSuccess(true)
      } else {
        setLoading(false)
        setMessage('Email chưa đăng ký hệ thống')
        setErrorVerify(true)
      }
    }
  }

  return (
    <div
      className="h-[100vh] flex flex-col justify-center items-center overflow-y-auto"
      style={{
        backgroundImage: 'url(/logo/login_bg.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div
        className="fixed flex md:flex-row flex-row items-center top-0 md:px-10 pl-5
      w-full mt-2"
      >
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

      {confirmSuccess ? (
        <Card className="mx-auto mt-24 w-[90%] md:max-w-[500px] px-8 py-10 rounded-[42px] bg-white bg-opacity-25 backdrop-blur-xl">
          <div className="flex flex-col justify-center">
            <Box className="flex justify-center">
              <Image src="/svg/checkout_success.svg" w={272} />
            </Box>
            <Box>
              <Text className="text-3xl text-center font-bold text-white pt-10">
                Gửi thông báo về Email thành công!
              </Text>
            </Box>
            <Text className="text-sm text-center font-normal text-white py-6">
              Link xác nhận đã gửi về email đăng ký của bạn. Hãy vào email để
              đổi mật khẩu!
            </Text>
            <Button
              onClick={() => {
                router.push('login')
              }}
              className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
            >
              Đóng
            </Button>
          </div>
        </Card>
      ) : (
        <section className="h-[100vh] flex justify-center items-center">
          <Card className="mx-auto mt-24 w-[90%] py-10 md:min-w-[800px] px-8 rounded-[42px] bg-white bg-opacity-25 backdrop-blur-xl">
            <Box>
              <Text className="text-3xl text-center font-bold text-white">
                Xác thực tài khoản
              </Text>
              <Text className="text-center text-sm text-white">
                Vui lòng điền email đăng ký tài khoản để hệ thống xác thực tài
                khoản
              </Text>
            </Box>
            <Box className="flex flex-col gap-4">
              <div className="flex-col gap-1">
                <div className="flex-1 gap-2 mt-4 mb-4">
                  <Input
                    value={value.email}
                    onChange={handleOnChange}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    required
                    label="Nhập email"
                    labelColor={true}
                  />
                </div>
                <Button
                  loading={loading}
                  disabled={loading}
                  onClick={handleOTP}
                  className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
                >
                  Xác nhận
                </Button>
                {errorVerify && (
                  <ModalMessage
                    onSubmit={() => setErrorVerify(false)}
                    title="Lỗi"
                    message={message}
                    onCancel={() => {
                      setErrorVerify(false)
                    }}
                    onOpen={errorVerify}
                    onNavigate=""
                    type="error"
                    navigateTitle="Đóng"
                  />
                )}
              </div>
            </Box>
          </Card>
        </section>
      )}
      {/* <Tabs value={activeTab}>
        <Tabs.Panel value="confirm-email">
          <ConfirmEmail
            setPhoneNumber={setPhoneNumber}
            handleNextTab={handleNextTab}
          />
        </Tabs.Panel>
        <Tabs.Panel value="confirm-code">
          <VerifyOTPPage
            setOTP={setOTP}
            phoneNumber={phoneNumber}
            handleNextTab={handleNextTab}
          />
        </Tabs.Panel>
        <Tabs.Panel value="update-password">
          <UpdatePassword OTP={OTP} phoneNumber={phoneNumber} />
        </Tabs.Panel>
      </Tabs> */}
    </div>
  )
}
