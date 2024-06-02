'use server'
import { createClient } from "@/utils/supabase/server"

export async function updateAccountData(formData: FormData) {
  const supabase = createClient()
  
  try {
    const userData = {
      username: formData.get('username') as string,
      first_name: formData.get('firstname') as string,
      last_name: formData.get('lastname') as string,
    }
    
    const { error } = await supabase.auth.updateUser({ data: userData })
    if (error) return { error: "An error occurred while updating the account data!", status: 400 }

    return { success: 'Successfully updated account data!', status: 200 }
  } catch (error) {
    return { error: "An error occurred while processing the request!", status: 500 }
  }
}