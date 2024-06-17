import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"
import { calculateAgo } from "@/utils/date";
import { Clock4 } from "lucide-react";
import Link from "next/link";

type Props = {
  userId: string
  first_name: string
  category?: string
  title: string
  created_at: string
  price?: number
}
enum ItemCategory {
  FREE = "Free",
  SELL = "Sell",
  WANTED = "Wanted"
}

export default function ItemSender({ userId, first_name, category, title, created_at, price }: Props){
  return (
    <div className="inline-flex flex-row items-center gap-x-4">
      <Link href={`/public-profile/${userId}`}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://api.multiavatar.com/` + userId + `.svg`} alt="avatar" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </Link>
      <div className="inline-flex w-full flex-col gap-y-0.5">
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm">{first_name} is {category === ItemCategory.FREE ? "giving away" : category === ItemCategory.SELL ? "selling" : "looking for"}</div>
          {
            category === ItemCategory.SELL && (<Badge>RM {price}</Badge>)
          }
        </div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <div className="inline-flex flex-row items-start gap-x-1 text-grey-3 text-xs">
          <Clock4 size={14} />
          <p>Added { calculateAgo(created_at) } ago</p>
        </div>
      </div>
    </div>
  )
}