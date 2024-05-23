'use server'

import { createClient } from "@/utils/supabase/server"
import { useUserStore } from "@/utils/zustand/zustand"

export async function signIn(formData: FormData) {
  const client = createClient()
  
  try {
    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
    const { data: {user}, error } = await client.auth.signInWithPassword(userData)
    if (error) return { error: "Invalid login credentials!", status: 400 }
    
    useUserStore.setState({ user })
    return { success: 'Successfully authenticated user!', status: 200 }
  }
  catch (error) {
    return { error: 'An error occurred while processing the request!', status: 500 }
  }
}