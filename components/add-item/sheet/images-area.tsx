import Image from "next/image"
import UploadImageArea from "./upload-image-area"
import { X } from 'lucide-react';

type Props = {
  images: string[]
  removeImage: (index: number) => void
  children?: React.ReactNode
}

export default function ImagesArea({ images, removeImage, children }: Props) {
  return images.length > 0 ? (
    <div className="grid sm:grid-cols-4 grid-cols-3 gap-2.5">
      {
        images.map((image, index) => (
          <div key={index} className="relative w-full h-0 pb-[100%]">
            <Image src={image} fill style={{objectFit:"cover"}} alt="item-image" className="rounded-lg" />
            <div className="absolute top-0 right-0 m-1.5">
              <div 
                className="inline-flex flex-row items-center justify-center rounded-full bg-white p-0.5 cursor-pointer border hover:bg-grey-7"
                onClick={() => removeImage(index)}
              >
                <X size={16} color="#1d2129" />
              </div>
            </div>
          </div>
        ))
      }
      { 
        images.length < 3 && children
      }
    </div>
  ) : (
    <UploadImageArea>
      { children }
    </UploadImageArea>
  )
}