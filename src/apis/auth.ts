'use server'

import { Provider } from '@supabase/supabase-js'
import { createClient } from '@/libs/supabase/server'
import { getURL } from '@/libs/supabase/helpers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export interface LoginForm {
  email: string
  password: string
}
export async function getUserr() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user
}

export async function signin(data: LoginForm) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const loginData = await supabase.auth.signInWithPassword(data)

  if (loginData.error) {
    return {
      error: loginData.error.message
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      error: error.message
    }
  }
  redirect('/login')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const dataUser = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { data, error } = await supabase.auth.signUp(dataUser)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getUser() {
  const supabase = createClient()

  const result = await supabase.auth.getUser()
  const session = await supabase.auth.getSession()
  if (result.error || !result?.data?.user) {
    return {
      error: result?.error?.message ?? '',
      session
    }
  }

  return result
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect('/login?message=No provider selected')
  }
  const supabase = createClient()
  const redirectUrl = getURL('/auth/callback')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl
    }
  })
  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  return redirect(data.url)
}
export async function navigate(data: any) {
  redirect(`${data}`)
}
