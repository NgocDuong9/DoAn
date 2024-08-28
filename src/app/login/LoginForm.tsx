'use client'

import { Box, Button, Checkbox, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { validatePassword, validatePhoneNumber } from '@/utils/validation'

import { Input } from '@/components/custom/input/input'
import { InputCustom } from '@/components/custom/input/input-custom'
import Link from 'next/link'
import Validation from './Validation'
import { navigate } from '@/apis/auth'
import { signInPhone } from '@/apis/client/auth'

const LoginForm = () => {
  const [value, setValue] = useState({
    phoneNumber: '',
    password: ''
  })

  const [saveLogin, setSaveLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [message, setMessage] = useState('')
  const [checkError, setCheckError] = useState<any>({
    phoneNumber: '',
    password: ''
  })

  const getLoginInfo = () => {
    const saveLoginn = localStorage.getItem('saveLogin')
    setSaveLogin(JSON.parse(saveLoginn ?? 'false'))
    const loginInfo = localStorage.getItem('loginInfo')

    if (JSON.parse(saveLoginn ?? 'false') && loginInfo) {
      setValue(JSON.parse(loginInfo))
      return JSON.parse(loginInfo)
    } else {
      setValue({ phoneNumber: '', password: '' })
    }
    return null
  }

  useEffect(() => {
    getLoginInfo()
  }, [])
  const handleLogin = async (e: any) => {
    e.preventDefault()
    setCheckError(
      Validation({
        ...value,
        phoneNumber: value.phoneNumber.trim()
        // password: value.password.trim(),
      })
    )

    const checkValidation = Validation({
      ...value,
      phoneNumber: value.phoneNumber.trim()
      // password: value.password.trim(),
    })

    if (Object.keys(checkValidation).length === 0) {
      setLoading(true)
      const result = await signInPhone(value)

      //@ts-ignore

      if (!result.error) {
        // Save the login information to localStorage
        if (saveLogin) {
          localStorage.setItem('loginInfo', JSON.stringify(value))
        }
        localStorage.setItem('saveLogin', JSON.stringify(saveLogin))

        setSaveLogin(false)
        // navigate("/");
        window.location.replace('/')
        setLoading(false)
      } else {
        //@ts-ignore
        setMessage('Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại')
        setLoginError(true)
        setLoading(false)
      }
    }
  }

  const handleOnChange = (e: any) => {
    const { name, value: valueTarget } = e.target
    setMessage('')
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })

    let errorMessage = ''
    if (name === 'phoneNumber') {
      errorMessage = validatePhoneNumber(valueTarget).trim()
    }
    if (name === 'password') {
      errorMessage = validatePassword(valueTarget)
    }
    setCheckError({ ...checkError, [name]: errorMessage })
  }

  const onChangeCheck = () => {
    setSaveLogin(!saveLogin)
  }

  return (
    <form onSubmit={handleLogin} className="min-w-[340px] ">
      <Text className="flex justify-center text-white text-sm md:text-base mb-3">
        Vui lòng điền thông tin đăng nhập
      </Text>

      {message && (
        <div className="flex justify-center items-center bg-white p-2 rounded-xl h-12 gap-2">
          <Box className="flex justify-center items-center rounded-full border-2 border-[#F8664F] bg-white h-6 w-6 text-[#F8664F]">
            <Text>i</Text>
          </Box>
          <Text className="flex justify-center text-center text-[#F8664F] flex-1 ">
            {message}
          </Text>
        </div>
      )}
      <div>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="phoneNumber"
          placeholder="Nhập số điện thoại"
          required
          label="Số điện thoại"
          onChange={handleOnChange}
          value={value.phoneNumber}
          labelColor={true}
        />
        {checkError.phoneNumber && (
          <span
            className={
              checkError.phoneNumber
                ? 'error text-xs p text-[#ff0000]'
                : 'valid text-xs p'
            }
          >
            {checkError.phoneNumber}
          </span>
        )}
      </div>
      <div className="">
        <div className="flex items-center"></div>
        <InputCustom
          minLength={6}
          name="password"
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
          required
          label="Mật khẩu"
          onChange={handleOnChange}
          value={value.password}
          labelColor={true}
        />
        {checkError.password && (
          <span
            className={
              checkError.password
                ? 'error text-xs p text-[#F8664F]'
                : 'valid text-xs p'
            }
          >
            {checkError.password}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center py-4">
        <div className="flex gap-2 items-center">
          <Checkbox
            checked={saveLogin}
            onChange={onChangeCheck}
            color="#26D3E0"
          />
          <label className="text-sm text-white">Lưu tài khoản</label>
        </div>
        <Link href={'/forgot-password'} className="text-sm text-white">
          Quên mật khẩu
        </Link>
      </div>
      <Button
        type="submit"
        // onClick={handleLogin}
        loading={loading}
        disabled={loading}
        className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
      >
        Đăng nhập
      </Button>
      {/* {loginError && (
        <ModalMessage
          onSubmit={() => setLoginError(false)}
          title="Lỗi đăng nhập"
          message={message ?? "Đăng nhập không thành công"}
          onCancel={() => {
            setLoginError(false);
            setMessage("");
          }}
          onOpen={loginError}
          onNavigate=""
          type="error"
          navigateTitle="Trở lại đăng nhập"
        />
      )} */}
    </form>
  )
}
export default LoginForm
