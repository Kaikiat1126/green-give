'use server'
import { createClient } from "./supabase/server"

export async function deletePost(postId: string, image: string | null){
  const supabase = createClient()
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
  if (image) await supabase.storage.from("posts_images").remove([image])
  if (error) return error
  return true
}