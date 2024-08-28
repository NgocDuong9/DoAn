'use server'

//@ts-ignore
import { getURL } from '@/libs/supabase/helpers'
import { createClient } from '@/libs/supabase/server'
//@ts-ignore
import { generateRandomNumber } from '@/utils/generate-OTP'
// const bcrypt = require('bcrypt');
import * as bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
//@ts-ignore
import { createTransport } from 'nodemailer'

import { Twilio } from 'twilio'

import { QueryProductInterface, TypeSearch } from './interface'
import { GaraGoogle as _GaraGoogle } from '@/constants/gara-google'

export async function verifyOTPPhone({
  phoneNumber,
  OTP
}: {
  phoneNumber: string
  OTP: string
}) {
  const twilioClient: Twilio = new Twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    {
      accountSid: process.env.TWILIO_ACCOUNT_SID
    }
  )

  const check = await twilioClient.verify.v2
    .services(process.env.SERVICE_SID || 'VAdf0a3c6865e03baf6f2908bc36b2b21d')
    .verificationChecks.create({ to: '+84394582543', code: OTP })
    .then(verification_check => {
      return verification_check.status === 'approved'
    })
    .catch(err => {
      console.error(err)
      return false
    })

  return check
}

export async function signupGoogle() {
  const supabase = createClient()

  const redirectUrl = getURL('/auth/callback')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: redirectUrl }
  })
  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  return redirect(data.url)
}

export async function sendOTPPhone(phoneNumber: string) {
  try {
    const supabase = createClient()

    const twilioClient: Twilio = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
      {
        accountSid: process.env.TWILIO_ACCOUNT_SID
      }
    )

    await twilioClient.verify.v2
      .services(process.env.SERVICE_SID || 'VAdf0a3c6865e03baf6f2908bc36b2b21d')
      .verifications.create({
        to: '+84394582543',
        channel: 'sms'
      })
      .then(verification => console.log(verification))

    return true
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function signupPhone({
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

  console.log({
    phoneNumber,
    OTP,
    name,
    password,
    email
  })

  // const { data: dataUsers, error: errorUser } = await supabase
  //   .from('users')
  //   .select('*')
  //   .eq('phone', phoneNumber)
  // if (dataUsers?.length !== 0) {
  //   return { error: 'Số điện thoại đã được sử dụng' }
  // }
  // const checkOTP = await verifyOTPNew({ OTP, phoneNumber })

  // const hashedPassword = await bcrypt.hashSync(password, 10)
  // if (!checkOTP?.data?.isSuccess) {
  //   return { error: 'OTP không đúng' }
  // }
  // const user = await supabase.auth.signUp({
  //   email: `${phoneNumber}@ficar.com`,
  //   password,
  //   options: {
  //     data: {
  //       phone: phoneNumber,
  //       password: hashedPassword
  //     }
  //   }
  // })

  // if (user.error) {
  //   console.error({ error: user.error })
  // }

  // const { data, error } = await supabase
  //   .from('users')
  //   .insert({
  //     name,
  //     phone: phoneNumber,
  //     auth_id: user.data.user?.id,
  //     password: hashedPassword,
  //     username: phoneNumber,
  //     email: user.data.user?.email,
  //     info_booking: [
  //       {
  //         name,
  //         phone: phoneNumber,
  //         index: 0,
  //         default: true
  //       }
  //     ]
  //   })
  //   .select()
  // if (data) {
  //   await supabase.auth.signOut()
  //   return data
  // } else {
  //   return { error: error }
  // }
}

export async function signInPhone({
  phoneNumber,
  OTP,
  name,
  password
}: {
  phoneNumber: string
  OTP?: string
  name?: string
  password: string
}) {
  const supabase = createClient()

  // const { data, error } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("phone", phoneNumber);

  const { data: dataUsers, error: errorUser } = await supabase
    .from('users')
    .select('*')
    .eq('phone', phoneNumber)

  console.log('dataUsers::', dataUsers)

  if (errorUser) {
    return { error: errorUser.message }
  }

  if (dataUsers?.length === 0 || !dataUsers) {
    return {
      user: null,
      error: 'Thông tin đăng nhập không chính xác',
      status: 400
    }
  }
  const compare = await bcrypt.compare(password, dataUsers[0]?.password ?? '')

  if (!compare) {
    return { error: 'Mật khẩu không đúng', status: 400 }
  }

  const user = await supabase.auth.signInWithPassword({
    email: dataUsers[0]?.email ?? `${phoneNumber}@ficar.com`,
    password: password
  })

  return user
}

export async function signInEmail({
  email,
  password
}: {
  email: string
  password: string
}) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return {
      error: error.message
    }
  }
  return data
}

export async function signUpGara({
  email,
  OTP,
  address,
  deputy,
  nameCompany,
  phone,
  taxCode,
  type
}: {
  email: string
  phone: string
  OTP: string
  nameCompany: string
  deputy: string
  type: string
  taxCode: string
  address: string
}) {
  const supabase = createClient()

  const checkOTP = verifyOTPPhone({ OTP, phoneNumber: phone })

  const username = nameCompany
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const password = generateRandomNumber()

  if (!checkOTP) {
    return {
      error: 'OTP không chính xác'
    }
  }

  const findUser = await supabase
    .from('merchant')
    .select('*')
    .eq('email', email)

  if (findUser.data?.length !== 0) {
    return { error: 'Email đã được sử dụng' }
  }

  const dataUser = await supabase.auth.signUp({
    email,
    password: `${password}`,
    options: { data: { email, phone, nameCompany, taxCode } }
  })

  if (dataUser.error) {
    return { error: dataUser.error.message }
  }
  const data = await supabase
    .from('merchant')
    .insert({
      email,
      password: `${password}`,
      phone,
      name: nameCompany,
      username,
      taxCode,
      address,
      deputy,
      type,
      auth_id: dataUser.data.user?.id
    })
    .select()

  if (data.error) {
    return { error: data.error.message }
  }

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Account Verification',
    // text: `Your verification code is: ${verificationCode}`,
    html: `<b>Welcome to FICAR, username: ${username}, password: ${password} </b> `
  })

  return data
}

export async function signInGara({
  username,
  password
}: {
  username: string
  password: string
}) {
  const supabase = createClient()

  const merchant = await supabase
    .from('merchant')
    .select('*')
    .eq('username', username)
  if (merchant.error) {
    return {
      error: merchant.error.message
    }
  }

  if (merchant.data.length === 0) {
    return {
      error: 'Không tìm thấy thông tin gara'
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: merchant.data[0].email,
    password
  })

  if (error) {
    return {
      error: error.message
    }
  }
  return data
}

export async function getUser() {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user
}

export async function validateOldPassword(
  oldPassword: string
): Promise<boolean> {
  const user = await getUser()
  if (!user || !user.id) {
    return false
  }

  if (!user || !user.user_metadata.password) {
    return false
  }
  return bcrypt.compare(oldPassword, user.user_metadata.password)
}

export async function changePasswordUser(password: string) {
  const supabase = createClient()
  const hashPassword = bcrypt.hashSync(password, 10)
  const { data: user, error } = await supabase.auth.updateUser({
    password,
    data: { password: hashPassword }
  })
  if (user.user?.id) {
    await supabase
      .from('users')
      .update({ password: hashPassword })
      .eq('auth_id', user.user?.id)
  }
  if (error) {
    return {
      error: error.message,
      data: null
    }
  }
  return {
    error: null,
    data: user.user
  }
}

export async function sendOTPPhoneNew({
  email,
  local
}: {
  email: string
  local: string
}) {
  const supabase = await createClient()
  const { data: dataUser, error: errorUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)

  if (dataUser?.length === 0) {
    return {
      data: null,
      error: `Email ${email} chưa đăng ký hệ thống`
    }
  }
  const data = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${local}/update-password`
  })

  console.log(data, 'axss')

  return data
}

export async function verifyOTPNew(value: any) {
  const supabase = await createClient()
  const data = await supabase.functions.invoke('verifyOTP-phone', {
    body: { Code: value.OTP, To: value.phoneNumber }
  })

  return data
  // return 'check'
}

export async function updatePassword({ newPassword, token_hash, phone }: any) {
  const supabase = createClient()
  const hashPassword = await bcrypt.hash(newPassword, 8)
  console.log(hashPassword, 'password', token_hash)

  const useeeeee = await supabase.auth.exchangeCodeForSession(token_hash)
  console.log({ useeeeee })
  const uywyiewe = await supabase.auth.getUser()
  console.log({ uywyiewe })

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
    data: { password: hashPassword }
  })
  if (error) {
    await supabase.auth.signOut()
    return {
      error: error.message
    }
  }
  const update = await supabase
    .from('users')
    .update({ password: hashPassword })
    //@ts-ignore
    .eq('auth_id', data.user?.id)

  console.log({ update, data, hashPassword })

  await supabase.auth.signOut()
  return data
}

export const historySearch = async (user_id: any) => {
  const supabase = createClient()

  const history = await supabase
    .from('history')
    .select('key, id')
    .eq('auth_id', user_id)
    .order('created_at', { ascending: false })
    .limit(8)
  return history
}
export const deleteSearchKey = async (key: string, auth_id: string) => {
  const supabase = createClient()
  const history = await supabase
    .from('history')
    .delete()
    .eq('key', key)
    .eq('auth_id', auth_id)
  return history
}
export const setHistorySearch = async (query: any) => {
  const supabase = createClient()
  const result = await supabase.from('history').insert({ key: query })
}
export const getTopSearch = async () => {
  const supabase = createClient()
  const top_search = await supabase.rpc('count_keys') // top key search
  return top_search
}

export const getAllTags = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    // @ts-ignore
    .from('search_tags')
    .select('name, display, type')

  return data?.map((item: any) => ({
    value: item?.name?.toLocaleLowerCase(),
    label: item?.display,
    type: item?.type
  }))
}

export const getCategoryAdmin = async (value?: any) => {
  const supabase = createClient()
  const category = await supabase.from('categoryadmin').select(`*`)
  return category
}

export async function searchProduct(query: QueryProductInterface) {
  const supabase = createClient()
  const get_from = (query?.page - 1) * query?.limit || 0
  const get_to = get_from + (query.limit || 5) - 1

  if (query.type === TypeSearch.GARAGE) {
    return await searchGarage(query)
  }

  let searchProduct = supabase
    .from('productadmin')
    .select(
      '*,productadmin_sold(*), product!inner(*, garage!inner(*, merchant!inner()), product_sold(*)),categoryadmin(*)',
      {
        count: 'estimated'
      }
    )
    .eq('status', true)
    .eq('product.status', true)
    .eq('product.garage.status', true)
    .eq('product.garage.merchant.status', true)

  if (query.category) {
    searchProduct = searchProduct.overlaps('key_search', query.category)
  }
  // if (query.key) {
  //   searchProduct = searchProduct.or(
  //     `name.wfts.'${query.key}',description.wfts.'${query.key}', name.ilike.%${query.key}%, description.ilike.%${query.key}%`,
  //     {
  //       referencedTable: 'product'
  //     }
  //   )
  // }

  if (query.key) {
    if (query.tags && query.tags.length > 0) {
      const _tags = query.tags.map(item => item.value).filter(item => item)

      searchProduct = searchProduct.or(
        `name.wfts.'${query.key}', name.ilike.%${query.key}%, tags.ov.{${_tags}}`
      )
    } else {
      // searchProduct = searchProduct.or(
      //   `name.wfts.'${query.key}', name.ilike.%${query.key}%`
      // )
      searchProduct = searchProduct.or(
        `name.wfts.'${query.key}',description.wfts.'${query.key}', name.ilike.%${query.key}%, description.ilike.%${query.key}%`
      )
    }
  }

  if (query.province) {
    searchProduct = searchProduct.in(
      'product.garage.information->>province',
      query.province
    )
  }

  if (query.type) {
    searchProduct = searchProduct.eq('type', query.type)
  }

  if (query.price_from) {
    searchProduct = searchProduct.gte(
      'product.sell_info->price_from',
      query.price_from
    )
  }

  if (query.price_to) {
    searchProduct = searchProduct.lte(
      'product.sell_info->price_to',
      query.price_to
    )
  }

  if (query.key_brand) {
    searchProduct = searchProduct.in(
      'product.detail_info->>key_brand',
      query.key_brand
    )
  }

  if (query.origin) {
    searchProduct = searchProduct.in(
      'product.detail_info->>origin',
      query.origin
    )
  }

  if (query.key_rim) {
    searchProduct = searchProduct.in('detail_info->>key_rim', query.key_rim)
  }

  if (query.key_treadCode) {
    searchProduct = searchProduct.in(
      'detail_info->>key_treadCode',
      query.key_treadCode
    )
  }

  if (query.key_type) {
    searchProduct = searchProduct.in('detail_info->>key_type', query.key_type)
  }

  if (query.key_voltage) {
    searchProduct = searchProduct.ilikeAnyOf(
      'product.detail_info->>key_voltage',
      query.key_voltage
    )
  }

  if (query.key_capacity) {
    searchProduct = searchProduct.ilikeAnyOf(
      'product.detail_info->>key_capacity',
      query.key_capacity
    )
  }

  if (query.order_price === true || query.order_price === false) {
    searchProduct = searchProduct.order('price', {
      ascending: query.order_price
    })
  }

  if (query.order_price === 'topSales') {
    searchProduct = searchProduct.order('productadmin_sold(sold)', {
      ascending: false
    })
  }

  const {
    data: resultProduct,
    error,
    count
  } = await searchProduct
    .is('verify', true)
    .range(get_from, get_to)
    .limit(1, { referencedTable: 'product' })

  if (error) {
    return { error: error.message }
  }

  return { data: resultProduct ?? [], count: count ?? 0 }
}

export async function searchGarage(query: QueryProductInterface) {
  const supabase = createClient()
  const get_from = (query?.page - 1) * query?.limit || 0
  const get_to = get_from + (query.limit || 5) - 1

  let searchGarage = supabase
    .from('garage')
    .select('*,merchant!inner(), product!inner(), garage_sold(*)', {
      count: 'estimated'
    })
    .eq('status', true)
    .eq('product.status', true)
    .eq('merchant.status', true)

  if (query.province) {
    searchGarage = searchGarage.in('information->>province', query.province)
  }

  if (query.category) {
    searchGarage = searchGarage.textSearch(
      'information->>service',
      `${query.category}`,
      { type: 'websearch' }
    )
  }

  if (query.key) {
    searchGarage = searchGarage.or(
      `name.wfts.'${query.key}',information->>service.wfts.'${query.key}', name.ilike.%${query.key}%`
    )
  }

  const { count: count } = await searchGarage
    .order('garage_sold(product_sold)', {})
    .range(0, 1)

  const {
    data: _data,
    error
    // count: count
  } = await searchGarage
    .order('garage_sold(product_sold)')
    .range(get_from, get_to)

  const data = _data ?? []

  const start = (query?.page - 1) * query?.limit || 0

  const get_from_client = start - (count ?? 0) < 0 ? 0 : start - (count ?? 0)

  const get_to_client =
    get_from_client + (query.limit || 5) - (_data?.length ?? 0)

  const GaraGoogle = _GaraGoogle.filter(
    item =>
      item.name
        .toLocaleLowerCase()
        .includes((query?.key ?? '').toLocaleLowerCase()) &&
      (query.province
        ? query.province.includes(item.information.addressCode)
        : true)
  )

  const resultGarage = [
    ...data,
    ...GaraGoogle.slice(get_from_client, get_to_client)
  ]

  if (error) {
    if (error.code === 'PGRST103') {
      return { data: resultGarage, count: (count ?? 0) + GaraGoogle.length }
    }
    return { error: error.message }
  }

  return { data: resultGarage, count: (count ?? 0) + GaraGoogle.length }
}

export async function newUserSignInGoogle() {
  const supabase = createClient()
  const users = await supabase.auth.getUser()
  if (!users.data.user) {
    return null
  }

  const selectUser = await supabase
    .from('users')
    .select()
    .eq('auth_id', users.data.user.id)
    .eq('email', users.data.user.user_metadata.email)

  if (selectUser.error) {
    return null
  }

  if (selectUser.data.length !== 0) {
    return
  }
  const newUser = await supabase
    .from('users')
    .insert({
      avatar: users.data.user.user_metadata?.avatar_url,
      name: users.data.user.user_metadata?.name,
      email: users.data.user.user_metadata?.email,
      // phone: users.data.user.user_metadata?.phone,
      username: users.data.user.user_metadata?.email,
      info_booking: [
        {
          name: users.data.user.user_metadata?.name,
          index: 0,
          phone: users.data.user.user_metadata?.phone ?? '',
          default: true
        }
      ]
    })
    .select()

  return newUser
}
