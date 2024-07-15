'use server'

import { createClient } from "./supabase/server"
import { getUserId } from "@/app/auth/get-user"

type Props = {
  type?: string;
  category?: string;
  userId?: string; 
  search?: string;
}

export async function getItemsWithoutSelf (
  {type, category, search}: Props
){
  const supabase = createClient()
  const userId = await getUserId()

  if (type === "Food") category = "Free"
  if (category === "All" && !search) {
    return await selectAllCategoriesWithoutSelf(userId!)
  }
  if (category === "All" && search) {
    return await getItemsBySearchInAll(search)
  }

  if (search && category !== "All") {
    return await getItemsBySearch(search, type!, category!)
  }
  
  const { data } = await supabase
    .from('items')
    .select("*, item_intro!inner(*), profiles:user_id(username)")
    .eq('type', type)
    .eq('category', category)
    .is('requested_by', null)
    .neq('user_id', userId)
    .neq('available', false)
    .gte('item_intro.expiry_on', new Date().toISOString())
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
    .gte('item_intro.expiry_on', new Date().toISOString())
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
    .select("*, item_intro!inner(*), profiles:user_id(first_name, username, location), requested_by_profiles:requested_by(username, location)")
    .eq('id', itemId)
    .single()
  await supabase.rpc('update_item_views', { item_id: itemId })
  return data
}

export async function getItemsBySearchInAll(search: string){
  const supabase = createClient()
  const { data } = await supabase
    .from('items')
    .select("*, item_intro!inner(*), profiles:user_id(username)")
    .textSearch('item_intro.title', search, { type: 'plain', config: 'english' })
    .neq('available', false)
    .gte('item_intro.expiry_on', new Date().toISOString())
    .order('created_at', {ascending: false})
  return data
}

export async function getItemsBySearch(search: string, type: string, category: string){
  const supabase = createClient()
  const { data } = await supabase
    .from('items')
    .select("*, item_intro!inner(*), profiles:user_id(username)")
    .textSearch('item_intro.title', search, { type: 'plain', config: 'english' })
    .eq('type', type)
    .eq('category', category)
    .neq('available', false)
    .gte('item_intro.expiry_on', new Date().toISOString())
    .order('created_at', {ascending: false})
  return data
}