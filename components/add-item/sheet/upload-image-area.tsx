'use client'
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { checkImageSize } from "@/utils/imageToBase64";

type Props = {
  children?: React.ReactNode
}

type UploadImageProps = {
  images: string[]
  addImage: (image: string) => void
  imageFiles: File[]
  setImageFiles?: (files: File[]) => void
}

export default function UploadImageArea({children}: Props){
  return (
    <div className="flex sm:flex-row flex-col items-center gap-x-6 gap-y-2">
      { children }
      <div className="flex-1 text-[#f53f3f] text-sm">
        *You must add an image, maximum allowed is 3 images
      </div>
    </div>
  )
}

export function UploadImage({ images, addImage, imageFiles, setImageFiles }: UploadImageProps){

  const imageInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return
    
    if (files && files.length + images.length > 3) {
      toast({title: "You can only upload a maximum of 3 images", variant: "destructive"})
      return
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!checkImageSize(file)) {
        toast({title: "The image size should not exceed 5MB", variant: "destructive"})
        return
      }
      setImageFiles && setImageFiles([...imageFiles, file])
      addImage(URL.createObjectURL(file))
    }
    e.target.value = ""
  }

  return (
    <div className={`inline-flex flex-col gap-y-2 ${images.length === 0 ? "flex-1": ""}`}>
      <Label 
        htmlFor="input-image" 
        className="
          flex flex-col items-center justify-center p-6 cursor-pointer border-2 border-dashed bg-[#f2f3f5]
          rounded-sm hover:bg-grey-7 hover:border-grey-5 transition-colors h-full
        "
      > 
        <Plus color="#4e5969" className="h-6 w-6 m-4" />
        {
          images.length === 0 && (
            <>
              <div className="text-[1.05rem] font-semibold text-grey-1 my-2 text-center whitespace-nowrap">Click to upload</div>
              <p className=" leading-6 text-grey-2 text-center mt-1 mb-4">Only png, jpg can be uploaded, and the size does not exceed 8MB</p>
            </>
          )
        }
      </Label>
      <Input 
        id="input-image" 
        ref={imageInputRef}
        name="items_images" 
        type="file" 
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={onImageChange}
      />
    </div>
  )
}