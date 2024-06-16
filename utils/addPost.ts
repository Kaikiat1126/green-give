'use server'

import { createClient } from "@/utils/supabase/server"
import { getUserId } from "@/app/auth/get-user"

export default async function addPost(formData: FormData) {
  const supabase = createClient()
  const userId = await getUserId()
  const file = formData.get("image_file")
  const filename = file ? `${userId}/${Date.now()}` : null
  try {
    const { error } = await supabase
      .from("posts")
      .insert([{
        user_id: userId, content: formData.get("content"), category: formData.get("category"),
        link: formData.get("link"), image: filename
      }])
    
    if (file) {
      await supabase.storage.from("posts_images").upload(filename as string, file as File, { cacheControl: "60" })
    }

    if (error) return { error: error.message, status: 400 }
    return { success: "Successfully added post!", status: 200 }
  } 
  catch (error) {
    return { error: "An error occurred while adding post. Please try again later.", status: 500}
  }
}