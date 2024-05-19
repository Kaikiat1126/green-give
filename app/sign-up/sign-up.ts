'use server'

import { createClient } from "@/lib/supabase/server"

export async function signUp(formData: FormData) {
  const client = createClient()
  
  try {
    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      options: {
        data: {
          username: formData.get('username') as string,
          first_name: formData.get('firstname') as string,
          last_name: formData.get('lastname') as string,
        }
      }
    }
    const { error } = await client.auth.signUp(userData)
    if (error) return { error: "Email already exists, please sign in!", status: 400 }

    return { success: 'Successfully registered user!', status: 200 }
  } 
  catch (error) {
    return { error: "An error occurred while processing the request!", status: 500 }
  }
}