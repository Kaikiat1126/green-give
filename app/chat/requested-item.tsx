'use client'
import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AlarmClock } from "@/components/emoji/emoji"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"

type Props = {
  itemRequests: any
}

export default function RequestedItem({ itemRequests }: Props) {
  const [loading, setLoading] = useState<boolean>(true)
  const [images, setImages] = useState<any>([])
  const supabase = createClient()

  useEffect(() => {
    const handleImages = async () => {
      const images = itemRequests.map((itemRequest: any) => itemRequest.items.item_intro.images[0])
      const { data } = await supabase.storage
        .from("items_images")
        .createSignedUrls(images, 1800)
      if (data) setImages(data)
      setLoading(false)
    }
    handleImages()
  }, [itemRequests])

  return (
    <Accordion type="single" collapsible>
      {
        itemRequests.map((itemRequest: any, index: any) => {
          return (
            <AccordionItem key={itemRequest.id} value={itemRequest.id} className="w-full">
              <AccordionTrigger className="w-full py-2 hover:no-underline">
                <div className="flex flex-row items-center gap-x-2 w-full">
                  {
                    (!loading && images) && (
                      <Image
                        priority
                        src={images[index].signedUrl}
                        alt="placeholder"
                        width={28}
                        height={28}
                      />
                    )
                  }
                  <div className="flex flex-col gap-y-0.5">
                    <div className="font-semibold text-grey-1 text-[0.835rem]">
                      {itemRequest.items.item_intro.title} {itemRequest.items.item_intro.price && `- RM${itemRequest.items.item_intro.price}`}
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                      <AlarmClock className="w-3 h-3" />
                      <div className="text-grey-3 text-xs">
                        {itemRequest.items.item_intro.pickup_instructions}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="w-full pb-2">
                <div className="flex flex-row gap-x-2.5 items-center">
                  <Button className="h-auto text-xs py-1.5">Completed</Button>
                  <Button variant="destructive" className="h-auto text-xs py-1.5">Cancel request</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })
      }
    </Accordion>
  )
}