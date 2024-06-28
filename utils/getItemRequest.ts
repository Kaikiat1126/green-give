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