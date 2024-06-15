import { Clock4, MessageCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateAgo } from "@/utils/date";

type Props = {
  post: any
}

export default function PostCard({post}: Props){
  return (
    <Card className="shadow p-4 cursor-pointer hover:bg-gray-50">
      <div className="flex flex-col gap-y-2">
        <div className="inline-flex flex-row items-center gap-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://api.multiavatar.com/` + post?.user_id + `.svg`} alt="avatar" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <div className="inline-flex flex-col gap-y-1">
            <div className="text-sm">{post?.profiles?.first_name} posted in {post?.category}</div>
            <div className="inline-flex flex-row items-start gap-x-1 text-grey-3 text-xs">
              <Clock4 size={14} />
              <p>{ calculateAgo(post?.created_at) } ago</p>
            </div>
          </div>
        </div>
        <div className="text-grey-1 line-clamp-3 tracking-tight leading-5">
          { post?.content }
        </div>
        <div className="flex flex-row items-center justify-end pe-2 gap-x-1 text-grey-2 mt-1">
          <MessageCircle size={18} />
          <span className="text-sm relative top-[1px]">{post?.comments.length} comments</span>
        </div>
      </div>
    </Card>
  )
}