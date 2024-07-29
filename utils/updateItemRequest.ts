'use server'

import { createClient } from "./supabase/server"

export async function updateItemRequest(request_id: string, item_id: string, status: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from("item_requests")
    .update({ status, owner_confirmed: status === "Confirmed" || status === "Completed" })
    .eq("id", request_id)

  if(error) return { error: error.message, message: "Failed to handle request."}

  if (status === "Completed") {
    const { error: error2 } = await supabase
      .from("items")
      .update({available: false})
      .eq("id", item_id)
    if(error2) return { error: error2.message, message: "Failed to handle request."}
    return { error: null, message: "Your item request has been completed. Thanks for sharing and saving the planet!"}
  }
  else if (status === "Cancelled") {
    const { error: error3 } = await supabase
      .from("items")
      .update({requested_by: null})
      .eq("id", item_id)
    if(error3) return { error: error3.message, message: "Failed to handle cancel request."}
    return { error: null, message: "Your item request has been cancelled."}
  }
  return { error: null, message: "Request has been updated."}
}