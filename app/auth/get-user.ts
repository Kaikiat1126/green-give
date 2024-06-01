'use server'
import { createClient } from '@/utils/supabase/server'
import { calculateDateDifferenceWithToday } from '@/utils/date'

const supabase = createClient()

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserImpacts() {
  const user = await getUser()
  const { data } = await supabase.from('impacts').select('*').eq('id', user?.id).single() 
  return data
}

export async function getUserJoinedDays() {
  const user = await getUser()
  const joinedDate = user?.created_at
  const days = joinedDate ? calculateDateDifferenceWithToday(joinedDate) : 0
  return days
}

export async function getUserProfile(){
  const user = await getUser()
  const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
  return data
}

export async function getUserFullData() {
  const user = await getUser()
  const { data } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      first_name,
      last_name,
      address,
      about,
      impacts (
        items_receives,
        items_offers,
        points,
        meals_saved,
        water_saved
      )
    `)
    .eq('id', user?.id).single()
  return data
}