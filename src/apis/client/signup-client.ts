'use server'

import { createClient } from '@/libs/supabase/server'
import { generateRandomNumber } from '@/utils/generate-OTP'
import * as bcrypt from 'bcryptjs'
import { GaraGoogle as _GaraGoogle } from '@/constants/gara-google'

export async function sendOTPSignup(email: string) {
  const supabase = createClient()

  const OTP = generateRandomNumber()

  const body = `<section>
  <p><strong>Xin chào ${email}</strong></p>
  <br />
  <p>Mã OTP của bạn là: <strong>${OTP}</strong></p>
</section>`
  const { data, error } = await supabase.functions.invoke('sendOTP-email', {
    body: { email: email, body }
  })

  const { data: dataotp, error: errorop } = await supabase
    .from('otpValue')
    .upsert({ key: email, value: `${OTP}` })

  if (error) {
    return { error: error.message }
  }

  return { message: 'Successfully!' }
}

export async function verifyOTPEmail(email: string, OTP: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('otpValue')
    .select('*')
    .eq('key', email)
    .eq('value', OTP)

  if (error) {
    return false
  }
  if (data.length === 0) {
    return false
  }
  return true
}

export async function signupClient({
  phoneNumber,
  OTP,
  name,
  password,
  email
}: {
  phoneNumber: string
  OTP: string
  name: string
  password: string
  email: string
}) {
  const supabase = createClient()

  const { data: dataUsers, error: errorUser } = await supabase
    .from('users')
    .select('*')
    .or(`phone.eq.${phoneNumber},email.eq.${email}`)
    .eq('phone', phoneNumber)

  if (dataUsers?.length !== 0) {
    return { error: 'Số điện thoại hoặc email đã được sử dụng' }
  }

  const checkOTP = await verifyOTPEmail(email, OTP)
  console.log({ errorUser, checkOTP }, 'logggg')

  const hashedPassword = await bcrypt.hashSync(password, 10)
  if (!checkOTP) {
    return { error: 'OTP không đúng' }
  }

  const user = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        phone: phoneNumber,
        email,
        password: hashedPassword
      }
    }
  })

  if (user.error) {
    return { error: user.error.message }
  }

  const { data, error } = await supabase
    .from('users')
    .insert({
      name,
      phone: phoneNumber,
      auth_id: user.data.user?.id,
      password: hashedPassword,
      username: phoneNumber,
      email,
      info_booking: [
        {
          name,
          phone: phoneNumber,
          email,
          index: 0,
          default: true
        }
      ]
    })
    .select()
  if (data) {
    const { data, error } = await supabase
      .from('otpValue')
      .delete()
      .eq('key', email)
      .eq('value', OTP)

    console.log({ error }, 'avxxx')

    await supabase.auth.signOut()
    return data
  } else {
    return { error: error }
  }
}
