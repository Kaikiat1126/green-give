'use client'
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import GreenGiveLogo from "@/public/android-chrome-192x192.png"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { calculateAgo, formatDate, parseTime } from "@/utils/date"
import { createClient } from "@/utils/supabase/client"
import { Eye } from "lucide-react"

type Props = {
  campaign: any
}

export default function CampaignPost({ campaign }: Props) {
  const [signedUrl, setSignedUrl] = useState<string>("")
  const supabase = createClient()

  useEffect(() => {
    const fetchImage = async () => {
      const { data } = await supabase.storage.from("campaigns_images")
        .createSignedUrl(campaign?.images[0], 3600)
      if(data) {
        setSignedUrl(data.signedUrl)
      }
    }
    fetchImage()
  }, [campaign])

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row items-center">
        <Avatar className="w-14 h-14">
          <Image src={GreenGiveLogo} className="aspect-square h-full w-full -translate-x-2" alt="@greengive" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <div className="inline-flex flex-col">
          <div className="text-grey-1 tracking-tight font-medium">GreenGive Community</div>
          <div className="text-grey-2 text-sm">posted {calculateAgo(campaign?.created_at)} ago</div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <h3 className="font-semibold text-grey-1 text-lg mt-2">{campaign?.title}</h3>
        <p className="leading-7 [&:not(:first-child)]:mt-3">{campaign?.description}</p>
        <h5 className="font-semibold text-grey-1 mt-3">Date & Time: <span className="font-normal">
          {formatDate(campaign?.date)} at {parseTime(campaign?.start_time)} to {parseTime(campaign?.end_time)}</span>
        </h5>
        <h5 className="font-semibold text-grey-1 mt-3">Avenue: <span className="font-normal">{campaign?.venue}</span></h5>
        <div className="font-semibold text-grey-1 mt-4 flex flex-row flex-wrap gap-x-2 gap-y-1 items-center">
          {
            campaign?.tags.map((tag: string) => (
              <Badge key={tag}>#{tag}</Badge>
            ))
          }
        </div>
      </div>
      <div className="relative w-full my-1">
        {
          signedUrl && (
            <Image src={signedUrl} layout="responsive" width={500} height={500} priority style={{objectFit: "cover"}} alt={campaign?.title} />
          )
        }
      </div>
      <div className="flex flex-row items-center my-2 justify-end text-grey-2 gap-x-1.5">
        <Eye size={18} />
        <span className="text-sm mr-2">{campaign?.views} views</span>
      </div>
    </div>
  )
}