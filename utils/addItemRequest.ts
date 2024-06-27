'use server'

import { createClient } from "./supabase/server"

export async function addItemRequest(itemId: string, userId: string, ownerId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from("item_requests")
    .insert([{ item_id: itemId, request_user_id: userId, owner_id: ownerId }])
    // .then(async data => {
    //   await supabase
    //     .from("items")
    //     .update({ requested_by: userId })
    //     .match({ id: itemId })
    //   return data
    // })

  if (error) return { error: error.message, status: 400 }
  return { success: "Request sent!", status: 200 }
}