import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import UserRow from "./user-row"
import { useToast } from "@/components/ui/use-toast"
import PostCategory from "@/components/posts/post-category"
import addPost from "@/utils/addPost"

type Props = {
  closeSheet: () => void
}

export default function PostForm({ closeSheet }: Props){

  const { toast } = useToast()
  const [category, setCategory] = useState<string>("")

  async function handleAddPost(formData: FormData){
    if (!category) {
      showToaster("You must select a category", false)
      return
    }
    await addPost(formData).then((response) => {
      if (response.error) {
        showToaster(response.error, false)
        return
      }
      showToaster(response.success!, true)
      closeSheet()
    })
  }

  function showToaster(message: string, success: boolean) {
    toast({ title: message, variant: success ? 'default' : 'destructive', })
  }

  return (
    <form className="inline-flex flex-col gap-y-4 mb-4 w-full p-2" >
      <div className="flex flex-row justify-between mb-1.5">
        <UserRow />
      </div>
      <Textarea 
        name="content"
        placeholder="Share relevant topics with the community"
        className="h-32 mb-2"
        required
      />
      <div className="flex flex-col gap-y-3">
        <Label htmlFor="category" className="text-grey-1">Category</Label>
        <PostCategory category={category} setCategory={setCategory} />
      </div>
      <Input id="category" type="hidden" value={category} name="category" />
      <Button type="submit" className="rounded-3xl h-auto py-2.5 mt-6" formAction={handleAddPost}>
        Submit
      </Button>
    </form>
  )
}