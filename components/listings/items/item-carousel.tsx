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

type Props = {
  images: string[]
}

export default function ItemCarousel({ images }: Props) {
  const [signedUrls, setSignedUrls] = useState<string[]>([])

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
    <Carousel className="w-full max-w-xl max-h-48">
      <CarouselContent>
        { 
          signedUrls.map((url) => (
            url && (
              <CarouselItem key={url}>
                <div className="relative w-full h-44">
                  <Image src={url} alt="item-image" fill priority style={{objectFit: 'cover'}} />
                </div>
              </CarouselItem>
            )
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}