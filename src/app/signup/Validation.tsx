export default function Validation(value: {
  name: string
  phoneNumber: string
  OTP: string
  password: string
  checked: boolean
}) {
  let error = {} as any
  if (!value.name) {
    error.name = 'Không được để trống họ và tên'
  } else if (value.name.length < 4 || value.name.length > 80) {
    error.name = 'Họ và tên phải từ 4 đến 80 ký tự'
  }
  if (!value.OTP) {
    error.OTP = 'Không được để trống OTP'
  } else if (!/^\d{6}$/.test(value.OTP)) {
    error.OTP = 'Sai định dạng OTP'
  }
  if (!value.phoneNumber) {
    error.phoneNumber = 'Không được để trống số điện thoại'
  } else if (
    !/^(?:\+84|84|0)(?:3|5|7|8|9|1[2689])\d{8,9}$/.test(value.phoneNumber)
  ) {
    error.phoneNumber = 'Sai định dạng số điện thoại'
  }
  if (!value.password) {
    error.password = 'Không được để trống mật khẩu'
  } else if (value.password.length < 6 || value.password.length > 32) {
    error.password = 'Mật khẩu phải từ 6 đến 32 ký tự'
  } else if (/\s/.test(value.password)) {
    error.password = 'Mật khẩu không được chứa khoảng trắng'
  }
  if (!value.checked) {
    error.checked =
      'Bạn chưa đồng ý với Trợ lý ô tô về Điều khoản dịch vụ và Chính sách bảo mật'
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
