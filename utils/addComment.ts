'use server'

import { createClient } from "@/utils/supabase/server"
import { getUserId } from "@/app/auth/get-user"

export default async function addComment(formData: FormData) {
  const supabase = createClient()
  const userId = await getUserId()
  try {
    const { error } = await supabase
      .from("comments")
      .insert([{
        post_id: formData.get("post_id"), user_id: userId, content: formData.get("comment")
      }])
    if (error) return { error: error.message, status: 400 }
    return { success: "Successfully added comment!", status: 200 }
  } 
  catch (error) {
    return { error: "An error occurred while adding comment. Please try again later.", status: 500}
  }
}