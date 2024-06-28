'use server'

import { createClient } from "@/utils/supabase/server"
import { getUserId } from "@/app/auth/get-user"

export default async function addItem(formData: FormData) {

  const supabase = createClient()
  const userId = await getUserId()

  const imageFiles = formData.getAll("images_files")
  const itemPrice = formData.get("price") ? parseInt(formData.get("price") as string) : null
  const untilMidnight = formData.get("list_for") === "0"
  let expiryDate = untilMidnight ? new Date().setHours(23, 59, 59, 999) : new Date(Date.now() + parseInt(formData.get("list_for") as string) * 24 * 60 * 60 * 1000)
  let newExpiry = new Date(expiryDate).toISOString().split(".")[0] + "+00"

  const folderPath = `${userId}/${Date.now()}`
  const filePathList: string[] = []

  async function uploadImage(file: File, filename: string) {
    await supabase.storage.from("items_images").upload(filename, file, { cacheControl: "60" })
  }

  for (let i = 0; i < imageFiles.length; i++) {
    const filename = `${folderPath}/${i}`
    filePathList.push(`${filename}`)
    uploadImage(imageFiles[i] as File, filename)
  }

  try {
    const { error } = await supabase
      .from("items")
      .insert([{user_id: userId, type: formData.get("type"), category: formData.get("category")}])
      .select()
      .then(({ data: item }) => {
        const itemId = item![0].id
        return supabase.from("item_intro")
          .insert([
            {
              id: itemId, title: formData.get("title"), description: formData.get("description"), quantity: parseInt(formData.get("quantity") as string),
              pickup_instructions: formData.get("pickup_instructions"), price: itemPrice, 
              images: filePathList, until_midnight: untilMidnight, list_for: parseInt(formData.get("list_for") as string), expiry_on: newExpiry
            }
          ])
          //update the user impact and points
      })
    if (error) return { error: error.message, status: 400 }
    return { success: "Successfully added item!", status: 200 }
  } 
  catch (error) {
    return { error: "An error occurred while adding item. Please try again later.", status: 500}
  }
}