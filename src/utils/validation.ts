export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^(?:\+84|84|0)(?:3|5|7|8|9|1[2689])\d{8,9}$/

  if (!phoneNumber) {
    return 'Không được để trống số điện thoại'
  } else if (!phoneRegex.test(phoneNumber)) {
    return 'Sai định dạng số điện thoại'
  }
  return ''
}
export const validatePassword = (password: string) => {
  if (!password) {
    return 'Không được để trống mật khẩu'
  } else if (password.length < 6 || password.length > 32) {
    return 'Mật khẩu phải từ 6 đến 32 ký tự'
  } else if (/\s/.test(password)) {
    return 'Mật khẩu không được chứa khoảng trắng'
  }
  return ''
}
export const validateOTP = (OTP: string) => {
  if (!OTP) {
    return 'Không được để trống trường này'
  } else if (!/^\d{6}$/.test(OTP)) {
    return 'Sai định dạng OTP'
  }
  return ''
}
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (password !== confirmPassword) {
    return 'Nhập lại mật khẩu không khớp'
  }
  return ''
}
export const validateText = (input: string) => {
  if (!input) {
    return 'Không được để trống trường này'
  } else if (input.trim().length < 4 || input.trim().length > 80) {
    return 'Họ và tên phải từ 4 đến 80 ký tự'
  }
  return ''
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!email) {
    return 'Không được để trống email'
  } else if (!emailRegex.test(email)) {
    return 'Sai định dạng email'
  }
  return ''
}
