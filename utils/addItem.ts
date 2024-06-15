'use server'

import { createClient } from "@/utils/supabase/server"
import { getUserId } from "@/app/auth/get-user"

export default async function addItem(formData: FormData) {

  const supabase = createClient()
  const userId = await getUserId()

  const imagesArray: string[] = (formData.get("images_base64") as string).split(",")
  const imagesArrayGrouped: string[] = []
  for (let i = 0; i < imagesArray.length; i += 2) {
    imagesArrayGrouped.push(imagesArray.slice(i, i + 2).join(","))
  }
  const itemPrice = formData.get("price") ? parseInt(formData.get("price") as string) : 0
  const untilMidnight = formData.get("list_for") === "0"

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
              images: imagesArrayGrouped, until_midnight: untilMidnight, list_for: parseInt(formData.get("list_for") as string),
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