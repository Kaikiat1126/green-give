'use server'
import { createClient } from '@/utils/supabase/server'
import { calculateDateDifferenceWithToday } from '@/utils/date'

export async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserImpacts() {
  const supabase = createClient()
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
  const supabase = createClient()
  const user = await getUser()
  const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
  return data
}

export async function getUserFullData() {
  const supabase = createClient()
  const user = await getUser()
  const { data } = await supabase
    .from('profiles')
    .select("*, impacts!inner(*)")
    .eq('id', user?.id)
    .single()
  return data
}

export async function getUserEmail(): Promise<string> {
  const user = await getUser()
  return user?.email ?? ''
}

export async function getUserProfileDataById(id: string) {
  const supabase = createClient()
  const { data: profiles } = await supabase
    .from('profiles')
    .select("*, impacts!inner(*)")
    .eq('id', id).single()
  return profiles
}

export async function getUserId() {
  const user = await getUser()
  return user?.id
}

export async function getUserProfileLocation() {
  const user = await getUser()
  const data = await getUserProfileDataById(user?.id!)
  return data.location
}