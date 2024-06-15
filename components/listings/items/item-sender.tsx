import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateAgo } from "@/utils/date";
import { Clock4 } from "lucide-react";
import Link from "next/link";

type Props = {
  userId: string
  first_name: string
  type?: string
  title: string
  created_at: string
}
export default function ItemSender({ userId, first_name, type, title, created_at }: Props){
  return (
    <div className="inline-flex flex-row items-center gap-x-4">
      <Link href={`/public-profile/${userId}`}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://api.multiavatar.com/` + userId + `.svg`} alt="avatar" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </Link>
      <div className="inline-flex flex-col gap-y-0.5">
        <div className="text-sm">{first_name} is giving away</div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <div className="inline-flex flex-row items-start gap-x-1 text-grey-3 text-xs">
          <Clock4 size={14} />
          <p>Added { calculateAgo(created_at) } ago</p>
        </div>
      </div>
    </div>
  )
}