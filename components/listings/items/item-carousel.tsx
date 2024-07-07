import { useState, useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import ItemImageModal from "./item-image-modal"

type Props = {
  images: string[]
}

export default function ItemCarousel({ images }: Props) {
  const [signedUrls, setSignedUrls] = useState<string[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState<string>("")

  const supabase = createClient()

  useEffect(() => {
    const fetchSignedUrls = async () => {
      const { data } = await supabase.storage.from("items_images")
        .createSignedUrls(images, 1800)
      if(data) {
        setSignedUrls(data.map((item: any) => item.signedUrl))
      }
    }
    fetchSignedUrls()
  }, [images, supabase])

  return (
    <>
      <Carousel className="w-full max-w-xl max-h-48">
        <CarouselContent>
          { 
            signedUrls.map((url) => (
              url && (
                <CarouselItem key={url}>
                  <div className="relative w-full xs:h-48 h-44">
                    <Image 
                      src={url} 
                      alt="item-image" fill priority 
                      style={{objectFit: 'cover'}} 
                      className="cursor-pointer"
                      onClick={() => {
                        setImgUrl(url)
                        setOpen(true)
                      }}
                    />
                  </div>
                </CarouselItem>
              )
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <ItemImageModal imgUrl={imgUrl} open={open} setOpen={setOpen} />
    </>
  )
}