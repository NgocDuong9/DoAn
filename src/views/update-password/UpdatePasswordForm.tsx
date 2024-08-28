'use client'

import { Box, Button, Image, Text } from '@mantine/core'
import { validateConfirmPassword, validatePassword } from '@/utils/validation'

import { IconCircleX } from '@tabler/icons-react'
import { InputCustom } from '@/components/custom/input/input-custom'
import { navigate } from '@/apis/auth'
import { updatePassword } from '@/apis/client/auth'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

function UpdatePasswordForm() {
  const [value, setValue] = useState({
    password: '',
    confirmPassword: ''
  })
  const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(false)
  const [updatePasswordFail, setUpdatePasswordFail] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const searchParams = useSearchParams()
  const id = searchParams.get('code')

  const handleUpdatePw = async (e: any) => {
    setErrors(
      Validation({
        ...value
      })
    )
    const checkValidation = Validation({
      ...value
    })

    if (Object.keys(checkValidation).length === 0) {
      setLoading(true)

      try {
        const result = await updatePassword({
          newPassword: value.password,
          token_hash: id
        })
        //@ts-ignore
        if (result?.error) {
          setErrorMessage('Thay đổi mật khẩu không thành công')
          setUpdatePasswordFail(true)
          return
        }

        setUpdatePasswordSuccess(true)
      } catch (error) {
        setErrorMessage('Thay đổi mật khẩu không thành công')
      } finally {
        setLoading(false)
      }
    }
  }
  const handleOnChange = (e: any) => {
    const { value: valueTarget } = e.target
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })

    const passwordError = validatePassword(valueTarget)
    const confirmPasswordError = validateConfirmPassword(
      valueTarget,
      value.confirmPassword
    )

    setErrors({
      ...errors,
      password: passwordError,
      confirmPassword: confirmPasswordError
    })
  }
  const handleOnChangeConfirm = (e: any) => {
    const { value: valueTarget } = e.target
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
    const confirmPasswordError = validateConfirmPassword(
      value.password,
      valueTarget
    )
    setErrors({ ...errors, confirmPassword: confirmPasswordError })
  }
  return (
    <div className="w-full">
      {!updatePasswordSuccess && !updatePasswordFail && (
        <div className="flex flex-col justify-center">
          <Box>
            <Text className="text-3xl text-center font-bold text-white">
              Đặt lại mật khẩu
            </Text>
          </Box>
          <div className="mt-4 gap-2">
            <InputCustom
              minLength={6}
              name="password"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              required
              label="Mật khẩu mới"
              onChange={handleOnChange}
              value={value.password}
              labelColor={true}
            />
            {errors.password && (
              <p className="p text-[#F8664F] text-xs">{errors.password}</p>
            )}
          </div>
          <div className="mt-4 gap-2 mb-8">
            <InputCustom
              minLength={6}
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Nhập mật khẩu"
              required
              label="Nhập lại mật khẩu mới"
              onChange={handleOnChangeConfirm}
              value={value.confirmPassword}
              labelColor={true}
            />
            {errors.confirmPassword && (
              <p className="p text-[#F8664F] text-xs">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <Button
            onClick={handleUpdatePw}
            className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
            loading={loading}
            disabled={loading}
          >
            Xác nhận
          </Button>
        </div>
      )}

      {updatePasswordSuccess && (
        <div className="flex flex-col justify-center ">
          <Box className="flex justify-center">
            <Image src="/svg/checkout_success.svg" w={272} />
          </Box>
          <Box>
            <Text className="text-3xl text-center font-bold text-white py-10">
              Đặt lại mật khẩu thành công
            </Text>
          </Box>
          <Button
            onClick={() => navigate('/login')}
            className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
            loading={loading}
            disabled={loading}
          >
            Trở lại đăng nhập
          </Button>
        </div>
      )}
      {updatePasswordFail && (
        <div className="flex flex-col justify-center">
          <Box className="flex justify-center">
            <IconCircleX color="#F8664F" size={60} />
          </Box>
          <Box>
            <Text className="text-3xl text-center font-bold text-white py-10">
              Đặt lại mật khẩu không thành công
            </Text>
          </Box>
          <Text className="text-xl text-center font-bold text-white py-4">
            {errorMessage}
          </Text>
          <Button
            onClick={() => setUpdatePasswordFail(false)}
            className="w-full h-12 text-[#F8664F] border-[#F8664F] rounded-xl bg-white hover:text-white hover:bg-[#F8664F]"
            loading={loading}
            disabled={loading}
          >
            Đóng
          </Button>
        </div>
      )}
    </div>
  )
}

export default UpdatePasswordForm

const Validation = (value: { password: string; confirmPassword: string }) => {
  let error = {} as any
  if (!value.password) {
    error.password = 'Không được để trống mật khẩu'
  } else if (value.password.length < 6 || value.password.length > 32) {
    error.password = 'Mật khẩu phải từ 6 đến 32 ký tự'
  } else if (/\s/.test(value.password)) {
    error.password = 'Mật khẩu không được chứa khoảng trắng'
  }
  if (!value.confirmPassword) {
    error.confirmPassword = 'Không được để trống mật khẩu'
  } else if (
    value.confirmPassword.length < 6 ||
    value.confirmPassword.length > 32
  ) {
    error.confirmPassword = 'Mật khẩu phải từ 6 đến 32 ký tự'
  } else if (/\s/.test(value.confirmPassword)) {
    error.confirmPassword = 'Mật khẩu không được chứa khoảng trắng'
  }
  if (
    !!value.password &&
    !!value.confirmPassword &&
    value.password !== value.confirmPassword
  ) {
    error.confirmPassword = 'Mật khẩu không trùng khớp'
  }
  return error
}
