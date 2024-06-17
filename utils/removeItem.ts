'use server'

import { createClient } from "./supabase/server"

export async function removeItem(postId: string, userId: string, imageUrl: string){
  const folder = imageUrl.split('/')[1]
  const count = imageUrl.split('/')[2]
  const supabase = createClient()
  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', postId)
  for (let i = 0; i < parseInt(count); i++) {
    await supabase.storage.from("items_images").remove([`${userId}/${folder}/${i}`])
  }
  if (error) return error
  return true
}