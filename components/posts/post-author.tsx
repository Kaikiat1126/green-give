import { calculateAgo } from "@/utils/date";
import { Clock4 } from "lucide-react";
import ProfileAvatar from "./profile-avatar";

type Props = {
  userId: string
  category: string
  created_at: string
  first_name: string
}

export default function PostAuthor({ userId, category, created_at, first_name }: Props){
  return (
    <div className="inline-flex flex-row items-center gap-x-3">
      <ProfileAvatar userId={userId} />
      <div className="inline-flex flex-col gap-y-1">
        <div className="text-sm">{first_name} posted in {category}</div>
        <div className="inline-flex flex-row items-start gap-x-1 text-grey-3 text-xs">
          <Clock4 size={14} />
          <p>{ calculateAgo(created_at) } ago</p>
        </div>
      </div>
    </div>
  )
}