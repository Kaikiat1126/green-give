'use server'

import { createClient } from "./supabase/server"
import { getUserId } from "@/app/auth/get-user"

type Props = {
  category?: string;
  postId?: string; 
}

export async function getPosts({category}: Props) {
  const supabase = createClient()
  if (category === "All") {
    return await selectAllPosts()
  }
  const { data } = await supabase
    .from('posts')
    .select("*, profiles:user_id(username, first_name), comments(*)")
    .eq('category', category)
    .order('created_at', {ascending: false})
  return data
}

export async function selectAllPosts(){
  const supabase = createClient()
  const { data } = await supabase
    .from('posts')
    .select("*, profiles:user_id(username, first_name), comments(*)")
    .order('created_at', {ascending: false}) 
  return data
}

export async function getUserPosts(){
  const supabase = createClient()
  const userId = await getUserId()
  const { data } = await supabase
    .from('posts')
    .select("*, profiles:user_id(username, first_name), comments(*)")
    .eq('user_id', userId)
    .order('created_at', {ascending: false})
  return data
}

export async function getPostById(postId: string){
  const supabase = createClient()
  const { data } = await supabase
    .from('posts')
    .select(
      "*, profiles:user_id(username, first_name), comments(*, profiles:user_id(first_name))"
    )
    .eq('id', postId)
    .single()
  await supabase.rpc("update_post_views", { post_id: postId })
  return data
}
