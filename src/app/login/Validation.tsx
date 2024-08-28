export default function Validation(value: {
  phoneNumber: string
  password: string
}) {
  let error = {} as any
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

  return error
}
