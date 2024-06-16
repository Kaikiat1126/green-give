import { Clock4 } from "lucide-react"
import ProfileAvatar from "../profile-avatar"
import { calculateAgo } from "@/utils/date"

type Props = {
  comment?: any
}

export default function Comment({ comment }: Props) {
  return (
    <div className="flex flex-row items-start gap-x-4 py-2">
      <ProfileAvatar userId={comment?.user_id} />
      <div className="flex flex-col gap-y-0.5">
        <h5 className="text-sm text-[#3c176c] font-semibold">{comment?.profiles?.first_name}</h5>
        <p className="text-sm text-grey-1 text-[1.05rem] font-medium">
          { comment?.content }
        </p>
        <div className="inline-flex flex-row items-start gap-x-1 text-grey-3 text-xs mt-2">
          <Clock4 size={14} />
          <p>{ calculateAgo(comment?.created_at) } ago</p>
        </div>
      </div>
    </div>
  )
}