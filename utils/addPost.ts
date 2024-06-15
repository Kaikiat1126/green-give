'use server'

import { createClient } from "@/utils/supabase/server"
import { getUserId } from "@/app/auth/get-user"

export default async function addPost(formData: FormData) {
  const supabase = createClient()
  const userId = await getUserId()
  try {
    const { error } = await supabase
      .from("posts")
      .insert([{
        user_id: userId, content: formData.get("content"), category: formData.get("category"),
        link: formData.get("link"), image: formData.get("image_url")
      }])
    if (error) return { error: error.message, status: 400 }
    return { success: "Successfully added post!", status: 200 }
  } 
  catch (error) {
    return { error: "An error occurred while adding post. Please try again later.", status: 500}
  }
}