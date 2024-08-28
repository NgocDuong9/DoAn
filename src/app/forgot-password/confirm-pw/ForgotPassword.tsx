'use client'

import { Button } from '@mantine/core'
import { Input } from '@/components/custom/input/input'
import ModalMessage from '@/components/custom/modal/modal-message'
import { ValidationPhone } from './Validation'
import { sendOTPPhoneNew } from '@/apis/client/auth'
import { useState } from 'react'
import { validateEmail, validatePhoneNumber } from '@/utils/validation'

export default function ForgotPasswordForm({
  handleNextTab,
  setPhoneNumber
}: any) {
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
    // if (!errors.email) {
    //   setLoading(true)
    //   const result = await sendOTPPhoneNew(value.email)
    //   if (result?.data?.isSuccess) {
    //     setLoading(false)
    //     setPhoneNumber(value.email)
    //     handleNextTab()
    //   } else {
    //     setLoading(false)
    //     setMessage('Số điện thoại chưa đăng ký hệ thống')
    //     setErrorVerify(true)
    //   }
    // }
  }
  return (
    <div>
      <div className="flex-col gap-4">
        <div className="flex-1 gap-2 mt-4 mb-8">
          <Input
            value={value?.phoneNumber}
            onChange={handleOnChange}
            id="email"
            name="email"
            type="email"
            placeholder="Nhập email"
            required
            label="Nhập email"
            labelColor={true}
          />
          {errors.email && (
            <p className="p text-[#F8664F] text-xs">{errors.email}</p>
          )}
        </div>

        <Button
          loading={loading}
          disabled={loading}
          onClick={handleOTP}
          className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
        >
          Xác nhận
        </Button>
        {/* {errorVerify && (
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
        )} */}
      </div>
    </div>
  )
}
