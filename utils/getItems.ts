'use server'

import { createClient } from "./supabase/server"
import { getUserId } from "@/app/auth/get-user"

type Props = {
  type?: string;
  category?: string;
  userId?: string; 
}

export async function getItemsWithoutSelf (
  {type, category}: Props
){
  const supabase = createClient()
  const userId = await getUserId()

  if (type === "Food") category = "Free"
  if (category === "All") {
    return await selectAllCategoriesWithoutSelf(userId!)
  }
  
  const { data } = await supabase
    .from('items')
    .select("*, item_intro!inner(*), profiles:user_id(username)")
    .eq('type', type)
    .eq('category', category)
    .is('requested_by', null)
    .neq('user_id', userId)
    .neq('available', false)
    .gte('expiry_on', new Date().toISOString())
    .order('created_at', {ascending: false})
  return data
}

export async function selectAllCategoriesWithoutSelf(userId: string){
  const supabase = createClient()
  const { data, error } = await supabase
    .from('items')
    .select("*, item_intro!inner(*), profiles:user_id(username)")
    .eq('type', 'Non-food')
    .neq('user_id', userId)
    .neq('available', false)
    .is('requested_by', null)
    .gte('expiry_on', new Date().toISOString())
    .order('created_at', {ascending: false})
  return data
}

export async function getItemsByUserId(userId: string){
  const supabase = createClient()
  const { data } = await supabase
    .from('items')
    .select("*, item_intro!inner(*), profiles:user_id(username)")
    .eq('user_id', userId)
    .order('created_at', {ascending: false})
  return data
}

export async function getItemById(itemId: string){
  const supabase = createClient()
  const { data } = await supabase
    .from('items')
    .select("*, item_intro!inner(*), profiles:user_id(first_name, username, location)")
    .eq('id', itemId)
    .single()
  return data
}