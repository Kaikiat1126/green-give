'use server'

import { createClient } from "@/utils/supabase/server"
import { getUserId } from "@/app/auth/get-user"

export async function getChats() {
  const supabase = createClient()
  const userId = await getUserId()

  const { data, error } = await supabase
    .from("chats")
    .select("*, owner_id_1(id,first_name), owner_id_2(id,first_name), messages(*)")
    .or(`owner_id_1.eq.${userId}, owner_id_2.eq.${userId}`)
  
  if(error) throw new Error(error.message)
  const chats = data.map((chat) => {
    if(chat.owner_id_1.id === userId) {
      chat.owner_id_1 = null
    } else chat.owner_id_2 = null
    return chat
  })
  return chats
}

export async function getChatsWithId(chatId: string) {
  const supabase = createClient()
  const userId = await getUserId()

  const { data, error } = await supabase
    .from("chats")
    .select("*, owner_id_1(id,first_name), owner_id_2(id,first_name)")
    .eq("id", chatId)
    .single()
  if (error) throw new Error(error.message)
  data.owner_id_1.id === userId ? data.owner_id_1 = null : data.owner_id_2 = null
  return data
}

export async function getMessages(chatId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true })
  
  if(error) throw new Error(error.message)
  return data
}

export async function upsertChat(ownerId1: string, ownerId2: string) {
  const supabase = createClient()
  const { data: existData, error } = await supabase
    .from("chats")
    .select("*")
    .or(`owner_id_1.eq.${ownerId1}, owner_id_1.eq.${ownerId2}`)
    .or(`owner_id_2.eq.${ownerId1}, owner_id_2.eq.${ownerId2}`)
    .limit(1);

  if(error) throw new Error(error.message)
  if (existData[0]) return existData[0]

  const { data, error: newError } = await supabase
    .from("chats")
    .insert([{ owner_id_1: ownerId1, owner_id_2: ownerId2 }])
    .select()
    .single()
  
  if(newError) throw new Error(newError.message)
  return data
}