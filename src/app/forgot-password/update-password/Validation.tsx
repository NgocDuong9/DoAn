export default function Validation(value: {
  password: string
  confirmPassword: string
}) {
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
