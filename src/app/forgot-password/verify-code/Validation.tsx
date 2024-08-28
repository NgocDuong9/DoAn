export default function Validation(value: {
  phoneNumber: string
  OTP: string
}) {
  let error = {} as any
  if (!value.OTP) {
    error.OTP = 'Không được để trống OTP'
  } else if (!/^\d{6}$/.test(value.OTP)) {
    error.OTP = 'Sai định dạng OTP'
  }

  return error
}
export function ValidationPhone(value: any) {
  let error = {} as any
  if (!value.phoneNumber) {
    error.phoneNumber = 'Không được để trống số điện thoại'
  } else if (
    !/^(?:\+84|84|0)(?:3|5|7|8|9|1[2689])\d{8,9}$/.test(value.phoneNumber)
  ) {
    error.phoneNumber = 'Sai định dạng số điện thoại'
  }
  return error
}
