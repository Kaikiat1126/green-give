'use server'

import { createClient } from './supabase/server'
import { getUserId } from '@/app/auth/get-user'

export async function getItemRequest(personId: string) {
  const supabase = createClient()
  const userId = await getUserId()
  const { data, error } = await supabase
    .from('item_requests')
    .select('*, items(*, item_intro(*))')
    .or('status.eq.In Progress, status.eq.Confirmed')
    .or(`request_user_id.eq.${userId}, request_user_id.eq.${personId}`)
    .or(`owner_id.eq.${personId}, owner_id.eq.${userId})`)
  
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function getUserRequestedItems() {
  const supabase = createClient()
  const userId = await getUserId()
  const { data, error } = await supabase
    .from('item_requests')
    .select('*, items(*, item_intro(*), profiles:user_id(username))')
    .eq('request_user_id', userId)
    .neq('status', 'Cancelled')
    .order('created_at', { ascending: false })
    .order('status', { ascending: false })

  if(error) {
    throw new Error(error.message);
  } 
  return data
}

export async function getUserReceivedItemsCountInLast4Weeks() {
  const supabase = createClient()
  const userId = await getUserId()
  const temp = new Date().getTime() - 2419200000
  const fourWeeksAgo = new Date(temp).toISOString()
  
  const { count, error } = await supabase
    .from('item_requests')
    .select('*', { count: 'exact', })
    .eq('request_user_id', userId)
    .eq('status', 'Completed')
    .gte('created_at', fourWeeksAgo)
  
  if(error) {
    throw new Error(error.message)
  }
  return count
}