'use client'

import { Button, Checkbox, Text } from '@mantine/core'
import Validation, { ValidationPhone } from './Validation'
import { sendOTPPhoneNew, signupPhone } from '@/apis/client/auth'
import {
  validateConfirmPassword,
  validateEmail,
  validateOTP,
  validatePassword,
  validatePhoneNumber,
  validateText
} from '@/utils/validation'

import { Input } from '@/components/custom/input/input'
import { InputCustom } from '@/components/custom/input/input-custom'
import { InputCustomVerify } from '@/components/custom/input/input-custom-verify'
import { useState } from 'react'
import { sendOTPSignup, signupClient } from '@/apis/client/signup-client'
import { notifications } from '@mantine/notifications'

export default function Signup({
  setOpenService,
  setOpenPolicy,
  setSignupSucceed
}: any) {
  const [value, setValue] = useState({
    name: '',
    phoneNumber: '',
    OTP: '',
    password: '',
    confirm_password: '',
    email: '',
    checked: false
  })
  const [errors, setErrors] = useState<any>({})
  const [errorPhone, setErrorsPhone] = useState<any>({})
  // const [signupSuccess, setSignupSuccess] = useState(false)
  const [onVerify, setOnVerify] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [message, setMessage] = useState('')
  // const [signError, setSignError] = useState(false)

  const handleSignup = async (e: any) => {
    setErrors(
      Validation({
        ...value,
        name: value.name.trim(),
        phoneNumber: value.phoneNumber.trim(),
        OTP: value.OTP.trim(),
        // password: value.password.trim(),
        checked: value.checked
      })
    )
    const checkValidation = Validation({
      ...value,
      name: value.name.trim(),
      phoneNumber: value.phoneNumber.trim(),
      OTP: value.OTP.trim(),
      // password: value.password.trim(),
      checked: value.checked
    })

    if (Object.keys(checkValidation).length === 0) {
      setLoading(true)
      const result = await signupClient({ ...value, name: value.name.trim() })
      console.log({ ...value, name: value.name.trim() }, 'xxxxx')
      console.log({ result })

      //@ts-ignore
      if (!result?.error) {
        setSignupSucceed(true)
        setLoading(false)
      } else {
        console.log(result?.error)
        notifications.show({
          // @ts-ignore
          message: result?.error ?? ''
        })
        setLoading(false)
      }
    }
  }

  const handleCheckbox = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.checked })
    setErrors({ ...errors, checked: '' })
  }

  const handleOnChange = (e: any) => {
    const { name, value: valueTarget } = e.target
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
    let errorMessage = ''
    let errorMessagePw = ''
    if (name === 'name') {
      errorMessage = validateText(valueTarget)
      setErrors({ ...errors, [name]: errorMessage })
    }
    if (name === 'phoneNumber') {
      errorMessage = validatePhoneNumber(valueTarget)
      setErrors({ ...errors, [name]: errorMessage })
    }

    if (name === 'email') {
      errorMessage = validateEmail(valueTarget)
      setErrors({ ...errors, [name]: errorMessage })
    }

    if (name === 'OTP') {
      errorMessage = validateOTP(valueTarget)
      setErrors({ ...errors, [name]: errorMessage })
    }
    if (name === 'password') {
      errorMessage = validatePassword(valueTarget)
      setErrors({
        ...errors,
        password: errorMessage
      })
    }
    if (name === 'confirm_password') {
      errorMessage = validatePassword(valueTarget)
      errorMessagePw = validateConfirmPassword(value.password, valueTarget)
      setErrors({
        ...errors,
        confirm_password: errorMessagePw
      })
    }
    setErrorsPhone({})
  }

  const onHandleOTP = async () => {
    const checkValidation = ValidationPhone(value)
    setErrorsPhone(checkValidation)
    setOnVerify(true)
    if (Object.keys(checkValidation).length === 0) {
      const OTP = await sendOTPSignup(value.email)
      console.log(OTP, 'otp')
    }
  }
  const handleTermsOfService = () => {
    // setOpenToS(true);

    setOpenService(true)
  }
  const handlePrivacyPolicy = () => {
    // setOpenPrivacy(true);
    setOpenPolicy(true)
  }
  return (
    <div className="">
      <Text className="flex justify-center text-white text-sm md:text-base mb-3">
        Vui lòng điền thông tin đăng ký để tạo tài khoản mới
      </Text>

      <div className="gap-2">
        <Input
          value={value?.name}
          onChange={handleOnChange}
          id="name"
          name="name"
          type="name"
          placeholder="Nhập họ và tên"
          required
          label="Họ và tên"
          labelColor={true}
        />
        {errors.name && (
          <p className="p text-[#F8664F] text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div className="mt-2 md:mt-0">
        <div className="flex-1 gap-2 ">
          <Input
            value={value?.phoneNumber}
            onChange={handleOnChange}
            id="phoneNumber"
            name="phoneNumber"
            type="phoneNumber"
            placeholder="Nhập số điện thoại"
            required
            label="Số điện thoại"
            labelColor={true}
          />
          {errors.phoneNumber && (
            <p className="p text-[#F8664F] text-xs mt-1">
              {errors.phoneNumber}
            </p>
          )}
          {!errors.phoneNumber && errorPhone.phoneNumber && (
            <p className="p text-[#F8664F] text-xs mt-1">
              {errorPhone.phoneNumber}
            </p>
          )}
        </div>
        <div className="flex-1 gap-2 ">
          <InputCustomVerify
            value={value?.email}
            onChange={handleOnChange}
            id="email"
            name="email"
            type="email"
            placeholder="Nhập email"
            required
            label="Email"
            handleOTP={() => {
              onHandleOTP()
            }}
            onVerify={onVerify}
            onRefreshVerify={() => setOnVerify(false)}
            labelColor={true}
          />
          {errors.email && (
            <p className="p text-[#F8664F] text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="flex-1 gap-2 mt-2 md:mt-0">
          <Input
            onChange={handleOnChange}
            value={value?.OTP}
            id="OTP"
            name="OTP"
            type="OTP"
            placeholder="Nhập mã xác thực"
            required
            label="Mã xác thực"
            labelColor={true}
          />
          {errors.OTP && (
            <p className="p text-[#F8664F] text-xs mt-1">{errors.OTP}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-x-2 mt:0 md:mt-2">
        <div className="gap-2 mt-2 md:mt-0 flex-1">
          <div className="flex items-center"></div>
          <InputCustom
            onChange={handleOnChange}
            value={value?.password}
            minLength={6}
            name="password"
            id="password"
            type="password"
            placeholder="Nhập mật khẩu"
            required
            autoComplete="off"
            label="Mật khẩu"
            labelColor={true}
          />
          {errors.password && (
            <p className="p text-[#F8664F] text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <div className="gap-2 mt-2 md:mt-0 flex-1">
          <div className="flex items-center"></div>
          <InputCustom
            onChange={handleOnChange}
            value={value?.confirm_password}
            minLength={6}
            name="confirm_password"
            id="confirm_password"
            type="password"
            placeholder="Nhập mật khẩu"
            required
            label="Nhập lại mật khẩu"
            autoComplete="off"
            labelColor={true}
          />
          {errors.confirm_password && (
            <p className="p text-[#F8664F] text-xs mt-1">
              {errors.confirm_password}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center md:py-3 py-1 text-sm text-white white mt-2 md:mt-0">
        <Checkbox
          onChange={handleCheckbox}
          name="checked"
          className="pr-2"
          color="#26D3E0"
        />
        <div className="">
          Bằng việc đăng ký, bạn đã đồng ý với Trợ lý ô tô về&nbsp;
          <span
            className="gradientText cursor-pointer"
            onClick={handleTermsOfService}
          >
            Điều khoản dịch vụ
          </span>
          &nbsp;và&nbsp;
          <span
            className="gradientText cursor-pointer"
            onClick={handlePrivacyPolicy}
          >
            Chính sách bảo mật
          </span>
        </div>
      </div>
      {errors?.checked && (
        <div className="flex  items-center">
          <Text className="flex text-xs justify-center mb-2 text-center text-[#F8664F]">
            {errors.checked}
          </Text>
        </div>
      )}

      <Button
        onClick={handleSignup}
        loading={loading}
        disabled={loading}
        className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none mt-2 md:mt-0"
      >
        Đăng ký
      </Button>

      {/* {signupSuccess && (
        <ModalMessage
          onSubmit={() => setSignupSuccess(false)}
          title="Đăng ký thành công"
          message="Cảm ơn bạn đăng ký tài khoản tại Trợ lý ô tô"
          onCancel={() => {
            setSignupSuccess(false);
          }}
          onOpen={signupSuccess}
          onNavigate="/login"
          type="success"
          navigateTitle="Trở lại đăng nhập"
        />
      )}
      {signError && (
        <ModalMessage
          onSubmit={() => setSignError(false)}
          title="Đăng ký thất bại"
          message={message}
          onCancel={() => {
            setSignError(false);
          }}
          onOpen={signError}
          onNavigate=""
          type="error"
          navigateTitle="Trở lại đăng nhập"
        />
      )} */}
    </div>
  )
}
