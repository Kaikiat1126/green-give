'use server'

import { createClient } from "@/utils/supabase/server"

export async function fetchAvatar() {
  const client = createClient()
  
  try {
    let { data: avatars, error } = await client
    .from('avatars')
    .select('*');
    
    if (error) return { error: "An error occurred while fetching the avatar!", status: 400 }
    
    return { success: avatars, status: 200 }
  }
  catch (error) {
    return { error: 'An error occurred while processing the request!', status: 500 }
  }
}