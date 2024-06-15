'use server'

import { createClient } from "./supabase/server"

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
    .select("*, profiles:user_id(username, first_name), comments!inner(*)")
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