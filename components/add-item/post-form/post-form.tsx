import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import UserRow from "./user-row"
import { useToast } from "@/components/ui/use-toast"
import PostCategory from "@/components/posts/post-category"
import addPost from "@/utils/addPost"
import { Camera, Link } from "lucide-react"

type Props = {
  closeSheet: () => void
}

export default function PostForm({ closeSheet }: Props){

  const { toast } = useToast()
  const [category, setCategory] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  async function handleAddPost(formData: FormData){
    if (!category) {
      showToaster("You must select a category", false)
      return
    }
    if (imageFile) {
      formData.append("image_file", imageFile)
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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0]
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setImageFile(file)
  }

  return (
    <form className="inline-flex flex-col gap-y-4 mb-4 w-full p-2" >
      <div className="flex flex-row justify-between items-center mb-1.5">
        <UserRow />
        <div>
          <Label htmlFor="image" className="cursor-pointer">
            <Camera size={22} className="text-grey-2" />
          </Label>
          <Input 
            id="image" 
            type="file" 
            name="image" 
            className="hidden" 
            onChange={handleImageChange} 
            accept="image/*"
          />
        </div>
      </div>
      <Textarea 
        name="content"
        placeholder="Share relevant topics with the community"
        className="h-32"
        required
      />
      {
        imageUrl && (
          <div className="my-1.5 relative h-24 xs:h-28 md:h-32 xl:h-48 w-full ">
            <Image src={imageUrl} priority fill style={{objectFit: 'cover'}} alt="image" />
          </div>
        )
      }
      <div className="flex flex-col gap-y-2.5 mb-1">
        <Label htmlFor="link" className="inline-flex items-center">
          <Link className="mr-2" size={14} />
          <span>Add Link</span>
        </Label>
        <Input id="link" type="url" name="link" />
      </div>
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