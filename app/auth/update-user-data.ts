'use server'
import { createClient } from "@/utils/supabase/server"
import { getUser } from "./get-user"

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

export async function updateProfileAbout(about: string) {
  const supabase = createClient()
  const user = await getUser()
  if (!user) return { error: "User not found!", status: 404 }
  try {
    const { error } = await supabase.from('profiles')
      .update({ about })
      .eq('id', user.id)
    
    if (error) return { error: "An error occurred while updating the profile about!", status: 400 }

    return { success: 'Successfully updated profile about!', status: 200 }
  } catch (error) {
    return { error: "An error occurred while processing the request!", status: 500 }
  }
}

export async function updateUserLocation(location: { lat: number, lng: number } | { error: string }) {
  const supabase = createClient()
  const user = await getUser()
  if (!user) return { error: "User not found!", status: 404 }
  if ('error' in location) return { error: location.error, status: 400 }

  try {
    const { error } = await supabase.from('profiles')
      .update({ location: [location.lat, location.lng]})
      .eq('id', user.id)
    
    if (error) return { error: "An error occurred while updating the location!", status: 400 }

    return { success: 'Successfully updated location!', status: 200 }
  } catch (error) {
    return { error: "An error occurred while processing the request!", status: 500 }
  }
}