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

export async function updateUserImpact(
  owner_id: string | null, receiver_id: string | null, quantity: number, item_type: string
) {
  const supabase = createClient()
  let meals_saved_count = 0, water_saved_count = 0;
  if (item_type === "Food") {
    meals_saved_count = quantity * 0.325;
    water_saved_count = quantity * 196;
  }
  
  try {
    const { error } = await supabase.rpc('update_users_impact', {
      meals_saved_count,
      owner_id, 
      receiver_id,
      water_saved_count,
    })
    if (error) return { error: "An error occurred while updating the impact!", status: 400 }
    return { success: 'Successfully updated your impact!', status: 200 }
  } catch (error) {
    return { error: "An error occurred while processing the request!", status: 500 }
  }
}