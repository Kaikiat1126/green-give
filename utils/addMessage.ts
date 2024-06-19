'use server'

import { createClient } from "@/utils/supabase/server"
import { getUserId } from "@/app/auth/get-user"

export async function addMessage(chatId: string, message: string) {
  const supabase = createClient()
  const userId = await getUserId()

  const { data, error } = await supabase
    .from("messages")
    .insert([
      { chat_id: chatId, sender_id: userId, message: message }
    ])

  if(error) throw new Error(error.message)
  return data
}